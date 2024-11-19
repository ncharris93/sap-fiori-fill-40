# SAP FIORI Fill 40

## What it is

This is intended to be used as a bookmarklet which will fill your SAP FIORI time sheet

## TLDR;

### Arc

Download the latest extension from the [releasees](https://github.com/ncharris93/sap-fiori-fill-40/releases)

### Google Chrome
Paste this code into a Google Chrome bookmark.


```javascript
javascript:(function() {(function () { var hoursPerDay = 8; var enterRecordsButtonId = 'application-zhcmtime-manage-component---worklist--editButton'; var submitButtonId = 'application-zhcmtime-manage-component---worklist--OverviewSubmitButton'; function getDailyIds(num) { return { assignment: `__box15-__clone${num}-inner`, plusHour: `__input4-__clone${num}-incrementBtn`, hourValue: `__input4-__clone${num}-input-inner`, }; } var DailyIds = [ getDailyIds(54), getDailyIds(55), getDailyIds(56), getDailyIds(57), getDailyIds(58), ]; function getElementIdName(elementId) { switch (true) { case elementId.includes('54'): return 'Monday'; case elementId.includes('55'): return 'Tuesday'; case elementId.includes('56'): return 'Wednesday'; case elementId.includes('57'): return 'Thursday'; case elementId.includes('58'): return 'Friday'; default: return 'You working weekends or something?'; } } function simulateEnterKey(element) { var enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13, bubbles: true, }); element.dispatchEvent(enterEvent); } function simulateDownArrow(element) { element.focus(); var downArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, bubbles: true, }); element.dispatchEvent(downArrowEvent); } function enterDailyHours(plusButtonElementId, hourValueId) { var buttonElement = document.getElementById(plusButtonElementId); var hourValueElement = document.getElementById(hourValueId); var eleName = getElementIdName(plusButtonElementId); if (hourValueElement.value !== '0.00') { return console.warn(`Not overwriting hours for ${eleName}. Skipping.`); } if (buttonElement) { Array.from({ length: hoursPerDay }).forEach(() => { buttonElement.click(); }); console.log( `Set ${eleName}'s time to ${hoursPerDay} hours. (+${hoursPerDay})` ); } else { console.warn(`Failed to find hour increment button for ${eleName}`); } } function focusSubmitButton() { var submitButton = document.getElementById(submitButtonId); if (submitButton) { submitButton.focus(); console.log('Submit Button Focused'); } else { console.warn('Failed to find Submit button'); } } function clickEnterRecordsButton(elementId) { var enterRecordsButton = document.getElementById(elementId); if (enterRecordsButton) { enterRecordsButton.click(); console.log('clicked Enter Records button!'); simulateEnterKey(enterRecordsButton); } else { console.warn('Failed to find Enter Records button'); } } function enterWorkAssignment(elementId) { var eleName = getElementIdName(elementId); var inputElement = document.getElementById(elementId); if (inputElement && inputElement.value.trim() === '') { simulateDownArrow(inputElement); simulateEnterKey(inputElement); console.log(`Set ${eleName}'s Assignment`); } else { console.warn(`Failed to find the input for ${eleName}'s assignment`); } } function enterTimeSheetData() { DailyIds.forEach((day) => { enterWorkAssignment(day.assignment); enterDailyHours(day.plusHour, day.hourValue); }); } function pollForElement() { var mondayAssignmentInput = document.getElementById(DailyIds[0].assignment); if (mondayAssignmentInput) { console.log('Able to enter records, proceeding with assignment.'); enterTimeSheetData(); setTimeout(() => focusSubmitButton(), 250); } else { console.log("Can't enter records yet, retrying in 250..."); setTimeout(pollForElement, 250); } } pollForElement(); clickEnterRecordsButton(enterRecordsButtonId);})();})();
```

## Time Saved:

Manual time entry:

- Clicks: 26 (5 for each day, 1 for submission)
- Time: 30 seconds (optimistic)

Script:

- Clicks: 1
- Time: 5 second (pessimistic)

Math per 1,000 engineers:

- 25 seconds saved \* 1,000 engineers = 25,000 seconds
- 25,000 seconds / 3,600 (seconds / hr) = **6.94 hours per week.**

## Setup

### Arc

Upload the extension

1.  Get your hands on the `arc-extension` folder
2.  From the file menu: `Extensions` » `Manage Extensions`
3.  Toggle on `Developer mode` (top right)
4.  Click `Load Unpacked` (top left)
5.  Select the `arc-extension` folder

Now the extension with a time sheet icon will appear in your Arc Extensions

### Google Chrome

1. Create a new bookmark
2. Give it whatever name you like
3. Paste the contents of the JS block above into the `URL` field of the bookmark form

## How to Use

1. Open the SAP FIORI timesheet page
2. let the page finish loading
3. click the bookmarklet
4. hit enter

## How it works

1. Will click "Enter Records"
2. Will take the first dropdown under "Assignment" and click the "+" button under the hours 8 times
3. It will focus the "Submit" button so you just have to hit "enter" at when finished

## Configuration

### Chrome

Default Number of Hours:

1. Change the number of hours entered by modifying the variable `hoursPerDay` in javascript block above
2. Paste the updated code into the Chrome Bookmarklet

_Note: you will find `hoursPerDay` at the top of the file so that it's easy to modify_

### Arc

Default Number of Hours:

- Change the number of hours entered by modifying the variable `hoursPerDay` ./arc-extension/bookmarklet.js
- [Re]upload the extension

_Note: you will find `hoursPerDay` at the top of the file so that it's easy to modify_
