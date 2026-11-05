/// <reference path="../node_modules/pxt-core/localtypings/pxtblockly.d.ts"/>

const pxtblockly = pxt.blocks.requirePxtBlockly()

/**
 * Feed names of the linked IoT dashboard, offered in the IoT extension's feed
 * field (Amerlander/pxt-calliope-iot, block iot_feed_name).
 *
 * The extension's feed field is pxt's "autocomplete" editor with the key
 * "iotfeed": its list holds the feed names the program already uses. What the
 * program cannot know is which feeds the dashboard has. Whoever does know —
 * the IoT simulator panel (a simx frame inside this editor) or Calliope
 * Campus (the page embedding the editor) — posts them here:
 *
 *   window.postMessage({ type: "calliope-iot-feeds", feeds: ["temp", "licht"] }, "*")
 *
 * Each sender keeps its own list, and a message replaces only that sender's
 * list: Campus knows every feed of the dashboard, the panel only those that
 * carry values, and neither may wipe out the other. The field offers the union.
 * A sender's list goes with its frame (a simulator panel that was closed).
 * The names are suggestions only; typing any other name stays possible, and
 * nothing is written into the project.
 *
 * Done by extending FieldAutoComplete instead of registering an own field
 * editor: an editor without this code (an older target, plain pxt) then shows
 * the plain autocomplete instead of breaking the block, and the key check
 * leaves every other autocomplete field (datalogger columns) untouched.
 */
const FEED_KEY = "iotfeed"
const MESSAGE_TYPE = "calliope-iot-feeds"
const MAX_FEEDS = 200
// The rule Campus applies to feed keys.
const FEED_NAME = /^[a-z0-9_-]{1,40}$/i

const feedsBySender = new Map<MessageEventSource, string[]>()

export function initIotFeedOptions() {
    const FieldAutoComplete = (pxtblockly as any).FieldAutoComplete
    const proto = FieldAutoComplete && FieldAutoComplete.prototype
    if (!proto || proto.__iotFeedOptions) return
    proto.__iotFeedOptions = true

    const getOptions = proto.getOptions
    proto.getOptions = function (): [string, string][] {
        const options: [string, string][] = getOptions.call(this)
        if (this.getKey() !== FEED_KEY) return options
        const merged = options.slice()
        for (const feed of senderFeeds()) {
            if (!merged.some(o => o[0] === feed)) merged.push([feed, feed])
        }
        merged.sort((a, b) => a[0].localeCompare(b[0]))
        return merged
    }

    window.addEventListener("message", onMessage)
}

/** The union of every live sender's list. Senders whose frame is gone drop out. */
function senderFeeds(): string[] {
    const all: string[] = []
    feedsBySender.forEach((feeds, sender) => {
        if (!isTrustedSource(sender)) {
            feedsBySender.delete(sender)
            return
        }
        for (const feed of feeds) if (all.indexOf(feed) < 0) all.push(feed)
    })
    return all
}

function onMessage(ev: MessageEvent) {
    const data = ev.data
    if (!data || data.type !== MESSAGE_TYPE || !Array.isArray(data.feeds)) return
    if (!isTrustedSource(ev.source)) return
    const feeds: string[] = []
    for (const raw of data.feeds) {
        const feed = typeof raw === "string" ? raw.trim() : ""
        if (FEED_NAME.test(feed) && feeds.indexOf(feed) < 0) feeds.push(feed)
        if (feeds.length >= MAX_FEEDS) break
    }
    if (feeds.length) feedsBySender.set(ev.source, feeds)
    else feedsBySender.delete(ev.source)
}

// The page embedding the editor (Campus) or a frame of the editor itself (the
// simulator panel). Not any window that happens to hold a reference to us.
function isTrustedSource(source: MessageEventSource | null): boolean {
    if (!source) return false
    if (window.parent !== window && source === window.parent) return true
    const frames = document.getElementsByTagName("iframe")
    for (let i = 0; i < frames.length; i++) {
        if (frames[i].contentWindow === source) return true
    }
    return false
}
