# SAP FIORI Fill 40

## What it is

This is intended to be used as a bookmarklet which will fill your SAP FIORI time sheet

## TLDR;

Paste this code into a Chrome bookmark

```javascript
javascript:(function () {var hoursPerDay = 8;var enterRecordsButtonId = 'application-zhcmtime-manage-component---worklist--editButton';var submitButtonId = 'application-zhcmtime-manage-component---worklist--OverviewSubmitButton';var assignmentElementIds = ['__box15-__clone54-inner','__box15-__clone55-inner','__box15-__clone56-inner','__box15-__clone57-inner','__box15-__clone58-inner'];var timePlusButtonIds = ['__input4-__clone54-incrementBtn','__input4-__clone55-incrementBtn','__input4-__clone56-incrementBtn','__input4-__clone57-incrementBtn','__input4-__clone58-incrementBtn'];function getElementIdName(elementId) {switch (true) {case elementId.includes('54'): return 'Monday';case elementId.includes('55'): return 'Tuesday';case elementId.includes('56'): return 'Wednesday';case elementId.includes('57'): return 'Thursday';case elementId.includes('58'): return 'Friday';default: return 'You working weekends or something?%27;}}function simulateEnterKey(element) {var enterEvent = new KeyboardEvent(%27keydown%27, { key: %27Enter%27, code: %27Enter%27, keyCode: 13, charCode: 13, bubbles: true });element.dispatchEvent(enterEvent);}function simulateDownArrow(element) {element.focus();var downArrowEvent = new KeyboardEvent(%27keydown%27, { key: %27ArrowDown%27, code: %27ArrowDown%27, keyCode: 40, bubbles: true });element.dispatchEvent(downArrowEvent);}function simulateButtonClick(elementId, times = hoursPerDay) {var buttonElement = document.getElementById(elementId);var eleName = getElementIdName(elementId);if (buttonElement) {Array.from({ length: times }).forEach(() => {buttonElement.click();});console.log(`Set ${eleName}%27s time to ${times} hours`);} else {console.log(`Failed to find hour increment button for ${eleName}`);}}function focusSubmitButton() {var submitButton = document.getElementById(submitButtonId);if (submitButton) {submitButton.focus();console.log(%27Submit Button Focused%27);} else {console.log(%27Failed to find Submit button %27);}}function clickEnterRecordsButton(elementId) {var enterRecordsButton = document.getElementById(elementId);if (enterRecordsButton) {enterRecordsButton.click();console.log(%27clicked Enter Records button!%27);simulateEnterKey(enterRecordsButton);} else {console.log(%27Failed to find Enter Records button, quitting%27);return;}}function selectInputAndPressDownArrow(elementId) {var eleName = getElementIdName(elementId);var inputElement = document.getElementById(elementId);if (inputElement) {simulateDownArrow(inputElement);simulateEnterKey(inputElement);console.log(`Set ${eleName}%27s Assignment`);} else {console.log(`Failed to find the input element with id ${elementId}, quitting`);}}function enterTimeSheetData() {assignmentElementIds.forEach(selectInputAndPressDownArrow);timePlusButtonIds.forEach(id => simulateButtonClick(id));}function hasBeenRun() {var mondayAssignmentInput = document.getElementById(assignmentElementIds[0]);return !!mondayAssignmentInput;}if (hasBeenRun()) {return console.log(%27Hmm...Seems Hours have already been set. Exiting%27);}clickEnterRecordsButton(enterRecordsButtonId);setTimeout(enterTimeSheetData, 500);setTimeout(focusSubmitButton, 750);})();
```

## Time Saved:

Manual time entry:

- Clicks: 26 (5 for each day, 1 for submission)
- Time: 30 seconds

Script:

- Clicks: 1
- Time: 1 second

Math per 1_000 engineers:

- 29 seconds \* 1_000 engineers = 29_000 seconds
- 29_000 seconds / 3600 (seconds / hr) = **8.06 hours per week.**

## How to Setup

Create a new bookmark

1.  Give it whatever name you like
2.  Paste the contents of `copy-me.js` into the `URL` field of the bookmark form

## How to Use

1. Open the SAP FIORI timesheet page
2. click the bookmarklet
3. hit enter

## How it works

1. Will click "Enter Records"
2. Will take the first dropdown under "Assignment" and click the "+" button under the hours 8 times
3. It will focus the "Submit" button so you just have to hit "enter"

## Configuration

Change the number of hours entered by modifying the variable `hoursPerDay` in the `copy-me.js`
