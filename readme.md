# SAP FIORI Fill 40

<div>
   <img src="./arc-extension/icon-128.png" alt="Icon" />
</div>

## What it is

This is intended to be used as a bookmarklet which will fill your SAP FIORI time sheet

## TLDR;

### Arc

Download the latest extension from the [releases](https://github.com/ncharris93/sap-fiori-fill-40/releases)

### Google Chrome

Paste this JavaScript code into a Google Chrome bookmark URL.

<!-- Markdown so that it doesn't get formatted to be multiline -->

```markdown
javascript:(function() {(function () { const hoursPerDay = 8; const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; const elementIdRegex = { assignment: '^__box15-__clone\\d+-inner', plusHour: '^__input4-__clone\\d+-incrementBtn', hourValue: '^__input4-__clone\\d+-input-inner', }; function findElementWithText(type, text) { const elements = document.querySelectorAll(type); for (let ele of elements) { if (ele.textContent.trim().includes(text)) { return ele; } } return null; } function findChildWithIdPattern(tr, pattern) { const regex = new RegExp(pattern); const elements = tr.querySelectorAll('*'); for (let element of elements) { if (regex.test(element.id)) { return element; } } return null; } function simulateEnterKey(element) { const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13, bubbles: true, }); element.dispatchEvent(enterEvent); } function simulateDownArrow(element) { element.focus(); const downArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, bubbles: true, }); element.dispatchEvent(downArrowEvent); } function enterDailyHours({ day, plusButtonElementId, hourValueId }) { const buttonElement = document.getElementById(plusButtonElementId); const hourValueElement = document.getElementById(hourValueId); if (hourValueElement.value !== '0.00') { return console.warn(`Not overwriting hours for ${day}`); } if (!buttonElement) { return console.warn(`Failed to find hour increment button for ${day}`); } Array.from({ length: hoursPerDay }).forEach(() => buttonElement.click()); console.log(`Set ${day}'s time to ${hoursPerDay} hours`); } function focusSubmitButton() { const submitButton = findElementWithText('button', 'Submit'); if (submitButton) { submitButton.focus(); console.log('Submit Button Focused'); } else { console.warn('Failed to find Submit button'); } } function clickEnterRecordsButton() { const enterRecordsButton = findElementWithText('button', 'Enter Records'); if (!enterRecordsButton) { return console.warn('Failed to find Enter Records button'); } enterRecordsButton.click(); console.log('clicked Enter Records button!'); simulateEnterKey(enterRecordsButton); } function enterWorkAssignment(day, elementId) { const inputElement = document.getElementById(elementId); if (!inputElement) { return console.warn(`Failed to find the input for ${day}'s assignment`); } if (inputElement.value.trim() !== '') { return console.warn(`Not overwriting assignment for ${day} `); } simulateDownArrow(inputElement); simulateEnterKey(inputElement); console.log(`Set ${day}'s Assignment`); } function pollForElement() { const mondayRow = findElementWithText('tr', 'Monday'); if (!mondayRow) { console.log("Can't enter records yet, retrying in 250..."); return setTimeout(pollForElement, 250); } const mondayAssignmentElement = findChildWithIdPattern( mondayRow.nextElementSibling, elementIdRegex.assignment ); if (!mondayAssignmentElement) { console.warn( 'Monday row available, but not inputs not ready yet, retrying in 250...' ); return setTimeout(pollForElement, 250); } console.log('Able to enter records, proceeding with assignment.'); days.forEach(fillOutDay); setTimeout(focusSubmitButton, 250); } function fillOutDay(day) { console.log(`Filling out ${day}`); const dayTableRow = findElementWithText('tr', day); const nextRow = dayTableRow.nextElementSibling; if (!nextRow) { return console.warn(`Can't find row to fill out data for ${day}`); } const assignmentNode = findChildWithIdPattern( nextRow, elementIdRegex.assignment ); if (assignmentNode) { enterWorkAssignment(day, assignmentNode.id); } else { console.warn(`Can't find Assignment field, skipping.`); } const hourValueNode = findChildWithIdPattern( nextRow, elementIdRegex.hourValue ); const hourPlusButtonNode = findChildWithIdPattern( nextRow, elementIdRegex.plusHour ); if (hourPlusButtonNode) { enterDailyHours({ day, plusButtonElementId: hourPlusButtonNode.id, hourValueId: hourValueNode.id, }); } else { console.warn(`Can't find Hours field, skipping.`); } } clickEnterRecordsButton(); pollForElement();})();})();
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
3. It will focus the "Submit" button so you just have to hit "enter" when finished

## Configuration

### Default Number of Hours:

_Note: you will find `hoursPerDay` at the top of the file so that it's easy to modify_

#### Chrome

1. Change the number of hours entered by modifying the variable `hoursPerDay` in javascript block above
2. Paste the updated code into the Chrome Bookmarklet

#### Arc

- Change the number of hours entered by modifying the variable `hoursPerDay` ./arc-extension/bookmarklet.js
- [Re]upload the extension
