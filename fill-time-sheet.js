(function () {
  const hoursPerDay = 8; // how many hours are populated for each day
  const assignmentNum = 1; // Which WBS record to select (1 = first, 2 = second, etc)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const elementIdRegex = {
    assignment: '^__box15-__clone\\d+-inner',
    plusHour: '^__input4-__clone\\d+-incrementBtn',
    hourValue: '^__input4-__clone\\d+-input-inner',
  };

  function simulateEnterKey(element) {
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
      bubbles: true,
    });
    element.dispatchEvent(enterEvent);
  }

  function simulateDownArrow(element) {
    element.focus();
    const downArrowEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: 40,
      bubbles: true,
    });
    element.dispatchEvent(downArrowEvent);
  }

  function findElementWithText(type, text) {
    const elements = document.querySelectorAll(type);
    for (let ele of elements) {
      if (ele.textContent.trim().includes(text)) {
        return ele;
      }
    }
    return null;
  }

  function findChildWithIdPattern(tr, pattern) {
    const regex = new RegExp(pattern);
    const elements = tr.querySelectorAll('*'); // Get all child elements
    for (let element of elements) {
      if (regex.test(element.id)) {
        return element;
      }
    }
    return null;
  }

  function clickEnterRecordsButton() {
    const enterRecordsButton = findElementWithText('button', 'Enter Records');
    if (!enterRecordsButton) {
      return console.warn('Failed to find Enter Records button');
    }
    enterRecordsButton.click();
    console.log('clicked Enter Records button!');
    simulateEnterKey(enterRecordsButton);
  }

  function focusSubmitButton() {
    const submitButton = findElementWithText('button', 'Submit');
    if (submitButton) {
      submitButton.focus();
      console.log('Submit Button Focused');
    } else {
      console.warn('Failed to find Submit button');
    }
  }

  function enterDailyHours({ day, plusButtonElementId, hourValueId }) {
    const buttonElement = document.getElementById(plusButtonElementId);
    const hourValueElement = document.getElementById(hourValueId);
    if (hourValueElement.value !== '0.00') {
      return console.warn(`Not overwriting hours for ${day}`);
    }
    if (!buttonElement) {
      return console.warn(`Failed to find hour increment button for ${day}`);
    }
    Array.from({ length: hoursPerDay }).forEach(() => buttonElement.click());
    console.log(`Set ${day}'s time to ${hoursPerDay} hours`);
  }

  function enterWorkAssignment(day, elementId) {
    const inputElement = document.getElementById(elementId);
    // don't set the value if it already exists
    if (!inputElement) {
      return console.warn(`Failed to find the input for ${day}'s assignment`);
    }
    if (inputElement.value.trim() !== '') {
      return console.warn(`Not overwriting assignment for ${day} `);
    }
    Array.from({ length: assignmentNum }).forEach(() => {
      simulateDownArrow(inputElement);
    });
    simulateEnterKey(inputElement);
    console.log(`Set ${day}'s Assignment`);
  }

  function pollForElement() {
    const mondayRow = findElementWithText('tr', 'Monday');
    if (!mondayRow) {
      console.log("Can't enter records yet, retrying in 250...");
      return setTimeout(pollForElement, 250);
    }
    const mondayAssignmentElement = findChildWithIdPattern(
      mondayRow.nextElementSibling,
      elementIdRegex.assignment
    );
    if (!mondayAssignmentElement) {
      console.warn(
        'Monday row available, but not inputs not ready yet, retrying in 250...'
      );
      return setTimeout(pollForElement, 250);
    }

    console.log('Able to enter records, proceeding with assignment.');
    days.forEach(fillOutDay);
    setTimeout(focusSubmitButton, 250);
  }

  function fillOutDay(day) {
    console.log(`Filling out ${day}`);
    const dayTableRow = findElementWithText('tr', day);
    const nextRow = dayTableRow.nextElementSibling;

    if (!nextRow) {
      return console.warn(`Can't find row to fill out data for ${day}`);
    }
    const assignmentNode = findChildWithIdPattern(
      nextRow,
      elementIdRegex.assignment
    );
    if (assignmentNode) {
      enterWorkAssignment(day, assignmentNode.id);
    } else {
      console.warn(`Can't find Assignment field, skipping.`);
    }

    const hourValueNode = findChildWithIdPattern(
      nextRow,
      elementIdRegex.hourValue
    );
    const hourPlusButtonNode = findChildWithIdPattern(
      nextRow,
      elementIdRegex.plusHour
    );
    if (hourPlusButtonNode) {
      enterDailyHours({
        day,
        plusButtonElementId: hourPlusButtonNode.id,
        hourValueId: hourValueNode.id,
      });
    } else {
      console.warn(`Can't find Hours field, skipping.`);
    }
  }

  clickEnterRecordsButton();
  pollForElement();
})();
