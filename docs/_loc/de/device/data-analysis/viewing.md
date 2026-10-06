# Viewing your data

## Recording data

When your code is writing data, and the editor is recording it, the **Show data** button is displayed in the simulator under the board and simulation controls.

![Show data button](https://cdn.makecode.com/blob/e2d72c551537d73b0da421e117aa67400a47f34a/static/mb/device/data-analysis/show-data.jpg)

## Data view window

If you press the **Show data** button, the editor will switch from the **Blocks** or **JavaScript** view to display a charting window and a text console.

![Data chart and console](https://cdn.makecode.com/blob/3c405fec814c12f403252a73db36adca825953c2/static/mb/device/data-analysis/data-view.jpg)

The console window under the graph will show the data in the format it was written. The chart is the visual representation of the values appearing on the console.

## Time scroll

The chart will display new data as it arrives. The chart will scroll with time to continue to display new values.

![Data chart time scroll](https://cdn.makecode.com/blob/8003787b7e00352e02dda784a9b5f95358659874/static/mb/device/data-analysis/time-scroll.gif)

## Data view controls

The chart window shows the data view controls on top of the chart.

![Data view controls](https://cdn.makecode.com/blob/54396f05018f9f616dfeeb665fbaf1d5c5d8db9d/static/mb/device/data-analysis/data-view-controls.jpg)

Here's what the controls do:

**Return**: The return button switches the view back to previous code window (either Blocks or JavaScript).

![Return button](https://cdn.makecode.com/blob/229ea263c2fd6b0fecad743cd481933d4b36bd66/static/mb/device/data-analysis/return-button.jpg)


**Source**: Tells you where the data is coming from. If the code writing the data is running in the simulator, then the source is **Simulator**. If your code is running on the @boardname@ and connected by USB, the source is **@boardname@**.

![Source label](https://cdn.makecode.com/blob/4d6dd872ef61b743281f7237ae119091082f1c3b/static/mb/device/data-analysis/source-label.jpg)

**Pause**: The pause button will stop the display of new values and stop scrolling. When you resume, the chart starts again with the current value written.

![Pause button](https://cdn.makecode.com/blob/ea8ef9f85669f2779c5c7c4f3a03c341c681de95/static/mb/device/data-analysis/pause-button.jpg)

**Resume**: The resume button will start displaying new values after the **Pause** button was pressed.

![Resume button](https://cdn.makecode.com/blob/43ad1c76abdc8522b240e5e5ae133d73ce8a1156/static/mb/device/data-analysis/resume-button.jpg)

**Download**: The download button collects the data your code has written and downloads it to your computer as a file called something like _data-11-2018-23-00-0700.csv_. The numbers in the filename are the date and time when the file is created. The file may automatically open in an editor or spreadsheet if one of those programs is associated with _csv_ files.

![Download-Schaltfläche](https://cdn.makecode.com/blob/557092296ffdd71fcf7053edd2b5bfdbdeb94a25/static/mb/device/data-analysis/download-button.jpg)