# Code Evaluation Tool

## Aperçu

The [Code Evaluation Tool](https://microbit.makecode.com/--eval) is a mechanism for constructing a checklist of requirements for an assignment and running that list automatically against projects in quick succession. This allows teachers to build a checklist, then easily evaluate any number of projects based on that checklist. Projects are evaluated one at a time, but with auto-run enabled, you can update the loaded project by providing a new share link, at which point the rules will automatically be re-run on the new project.

## Code Evaluation Tool Features

### Creating, Editing, and Running a Checklist

#### 1. Creating a new checklist

Create a new checklist using the **New Checklist** card. If there is already an "in progress" checklist, a warning will appear asking if it is okay to overwrite it.

![New Checklist](https://cdn.makecode.com/blob/265b393596287817e814f2580e60b91433c12f08/static/teachertool/new-rubric.png)

![New Checklist from menu](https://cdn.makecode.com/blob/a3369af10e5dbd07e41122caecb3a49b985a351d/static/teachertool/new-rubric-from-menu.png)

#### 2. Naming a checklist

The checklist is given a name.

![Checklist name](https://cdn.makecode.com/blob/7bf07cf32aee544b421fca68586d1c98e31e4275/static/teachertool/checklist-name.png)

#### 3. Add Criteria

One or more **_criteria_** are added from the catalog using the **Add Criteria** button.

![Add Criteria](https://cdn.makecode.com/blob/24f2946b0de7ae36ad3773c6fcf237ffe8c69b25/static/teachertool/add-criteria.png)

Some criteria (like `[block] used [count] times`) can be added multiple times, others (like `Read a GPIO pin` can only be added once).

![Criteria items](https://cdn.makecode.com/blob/adc54cd0f2f21863ef916fed4939321d7d7dd0cb/static/teachertool/criteria-items.png)

#### 4. Fill in Parameters

Parameters for the criteria item are filled in for a criteria item.

### ~ tip

#### Parameter types

From a technical perspective, criteria parameters have these types:

- **Numeric** parameters have a small input and only allow number inputs.
- **String** parameters can have medium and long sized inputs.
- **Block** parameters should open a block-picker modal.
- **Empty** parameters appear in an error state until they have values.

### ~

Here a block is selected and used 3 times:

![Criteria parameters 1](https://cdn.makecode.com/blob/76cbdb4a88824f682c08600a6fd5a8cff8765ff0/static/teachertool/parameters-1.png)

Parameter options are displayed and then selected.

![Criteria parameters 2](https://cdn.makecode.com/blob/58e960355eaa8c9df72fc8689c359c546a574d5e/static/teachertool/parameters-2.png)

![Criteria parameters 3](https://cdn.makecode.com/blob/2741cc0a9473bfc3c86d672604138d720fabb244/static/teachertool/parameters-3.png)

#### 5. Ask AI

You can also have an **Ask AI** question as a criteria item in the checklist. You are limited to up to 5 Ask AI questions per checklist.

![Ask AI criteria](https://cdn.makecode.com/blob/764d6a268df320c5f23a8170d3fcda3572be8918/static/teachertool/ask-ai-criteria.png)

### ~indice

#### AI usage

The use of AI in criteria items is further explained in the [AI FAQ](/teachertool/ai-faq).

### ~

#### 6. Remove Criteria

A criteria item is removed using the **trash** button.

![Remove Criteria](https://cdn.makecode.com/blob/b12c466554bcb4a84019a7d380e116663b2f268f/static/teachertool/remove-criteria.png)

#### 7. Load a project

Load a project into the project view by pasting in a share link or share ID.

![A loaded project](https://cdn.makecode.com/blob/2de8bb49b7f54ef58aad42ad3b4744fc937f1916/static/teachertool/loaded-project.png)

The project will load in read-only mode with the project title appearing at the top of the project view.

![Project validation](https://cdn.makecode.com/blob/cab103100b734a27006e613a62e7ef172347209b/static/teachertool/validate-me.png)

#### 8. Run the checklist

With a project loaded, the checklist can run. The results are shown after clicking the **Run** button.

![Run checklist](https://cdn.makecode.com/blob/f7d766e82cf5a06aac01f16495a29dd2f33cdb80/static/teachertool/run-checklist-button.png)

The results view lists each criteria with its outcome.

![Checklist execution](https://cdn.makecode.com/blob/09b76faa89307d46b93e68843de4005ee0a0635d/static/teachertool/checklist-execution.png)

**Note**: the **Run** Button is disabled without loaded project.

### Editing Results

#### 1. Add feedback and notes

Feedback and notes are added using the **Add Notes** button. The feedback box should resize to fit its content as notes are added. The original feedback remains even if you re-run the rules using the **Run** button.

![Editing results](https://cdn.makecode.com/blob/c365dbd307b3fadfc5c3242da5594681264fa2c3/static/teachertool/editing-results-1.png)

![Editing results](https://cdn.makecode.com/blob/322fd9a1c0678e137f5985db7ecd9ac337ed3887/static/teachertool/editing-results-2.png)

![Editing results](https://cdn.makecode.com/blob/729ebb7c67ef3636f66cb9cb35a90beb997dbfff/static/teachertool/editing-results-3.png)

#### 2. Edit outcomes

An outcome is edited using the provided dropdown.

![Edit outcome](https://cdn.makecode.com/blob/6f29f6399fbc48dc23e9f05aa578004857b2aa51/static/teachertool/edit-outcome-1.png)

The new selected outcome.

![Edit outcome](https://cdn.makecode.com/blob/a4e2ec1b02858f13dfd3918c0044ed8991a1a196/static/teachertool/edit-outcome-2.png)

### Result Clearing and Auto-Run

#### 1. Toggling Auto-run

Auto-run is toggled either **on** or **off** using the button in the menu.

![Auto-run button](https://cdn.makecode.com/blob/d33f35ae461de5acdd1e15b295c06f9aff78267a/static/teachertool/autorun-button.png)

#### 2. Auto-run disabled

If auto-run is **disabled**, a result's outcome (i.e. "Looks good", "Needs work", etc...) is set to "Not started" automatically if any of any of the following conditions are met:

- It is newly added (defaults to the "Not Started" state).
- A parameter in a rule is changed (only the affected rule enters the "Not Started" state).
- The loaded project changes (all rules are be set to "Not started").

#### 3. Auto-run enabled

If auto-run is **enabled**, any rules that enter the "Not started" state due to the conditions listed above are immediately and automatically re-run with their results updated.

### Chargement/importation/exportation de listes de contrôle

#### 1. Pre-built checklists

There are pre-built checklists are available on the welcome page. If a selected checklist is already in-progress, an overwrite confirmation prompt is given.

![Pre-built checklists](https://cdn.makecode.com/blob/dae823d214803c876c1f2256f4f67e15169bbb4a/static/teachertool/prebuilt-rubrics.png)

#### 2. Export a checklist

A checklist is exported using the vertical "..." menu near the "auto-run" button. Only the checklist is exported, not the results. For a copy of the results, use the [print](#other) function in the Results view.

![Export checklist](https://cdn.makecode.com/blob/edb8f07d6ecce676a1cab2780214b2871fa2e358/static/teachertool/export-checklist.png)

This will download a json file for the checklist.

![Checklist download](https://cdn.makecode.com/blob/4f8156ed04f92228ce3efe9d16c14b551c30acee/static/teachertool/checklist-download.png)

#### 3. Import a checklist

User can import a checklist from a file using the same "..." menu, or from the card on the welcome page.

![Import checklist card](https://cdn.makecode.com/blob/ab3d24736aada90164e3078c42c0e1eaf8ce1fa6/static/teachertool/import-checklist-card.png)

![Import checklist menu](https://cdn.makecode.com/blob/13bef36575d1d3b5629172f958f3aeda93ef54c1/static/teachertool/import-checklist-menu.png)

Checklist file is selected using "Browse" or dropped directly into the popup. An overwrite confirmation prompted if there is currently an in-progress checklist.

![Import checklist drag in](https://cdn.makecode.com/blob/38f31c74d617f406d90d6b1f803b3af3b50ee4b1/static/teachertool/import-checklist-dragdrop-1.png)

![Import checklist drop off](https://cdn.makecode.com/blob/ee69ba66806c862964ea3be40404fcb3634ab888/static/teachertool/import-checklist-dragdrop-2.png)

### Other

If the page is refreshed (or if the browser closes/re-opens), the current checklist preserved.

Use the print button to create a version of the results with the outcomes and feedback visible (the other UI elements are hidden).

![Print button](https://cdn.makecode.com/blob/d381eb8fdee4956cb5e3ba01d2fa9e6944df2677/static/teachertool/print-button.png)

The checklist-view/project-view splitter can be resized. It can also be reset to 50/50 split with double-click.

![View splitter button](https://cdn.makecode.com/blob/77c09e5bf37f3f2c04cec952e6a1cbcf3b85408b/static/teachertool/view-splitter.png)

Slide the splitter to widen the view of the criteria and results.

![Split view resize](https://cdn.makecode.com/blob/32b44e4061958f389cce8e4add1b99c76ca8b64a/static/teachertool/split-resize.png)