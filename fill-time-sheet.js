(function () {
  var hoursPerDay = 8;

  var enterRecordsButtonId =
    'application-zhcmtime-manage-component---worklist--editButton';
  var submitButtonId =
    'application-zhcmtime-manage-component---worklist--OverviewSubmitButton';

  function getDailyIds(num) {
    return {
      assignment: `__box15-__clone${num}-inner`,
      plusHour: `__input4-__clone${num}-incrementBtn`,
      hourValue: `__input4-__clone${num}-input-inner`,
    };
  }

  var DailyIds = [
    getDailyIds(54), // Monday
    getDailyIds(55), // Tuesday
    getDailyIds(56), // Wednesday
    getDailyIds(57), // Thursday
    getDailyIds(58), // Friday
  ];

  function getElementIdName(elementId) {
    switch (true) {
      case elementId.includes('54'):
        return 'Monday';
      case elementId.includes('55'):
        return 'Tuesday';
      case elementId.includes('56'):
        return 'Wednesday';
      case elementId.includes('57'):
        return 'Thursday';
      case elementId.includes('58'):
        return 'Friday';
      default:
        return 'You working weekends or something?';
    }
  }

  function simulateEnterKey(element) {
    var enterEvent = new KeyboardEvent('keydown', {
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
    var downArrowEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: 40,
      bubbles: true,
    });
    element.dispatchEvent(downArrowEvent);
  }

  function enterDailyHours(plusButtonElementId, hourValueId) {
    var buttonElement = document.getElementById(plusButtonElementId);
    var hourValueElement = document.getElementById(hourValueId);
    var eleName = getElementIdName(plusButtonElementId);
    if (hourValueElement.value !== '0.00') {
      return console.warn(`Not overwriting hours for ${eleName}. Skipping.`);
    }
    if (buttonElement) {
      Array.from({ length: hoursPerDay }).forEach(() => {
        buttonElement.click();
      });
      console.log(
        `Set ${eleName}'s time to ${hoursPerDay} hours. (+${hoursPerDay})`
      );
    } else {
      console.warn(`Failed to find hour increment button for ${eleName}`);
    }
  }

  function focusSubmitButton() {
    var submitButton = document.getElementById(submitButtonId);
    if (submitButton) {
      submitButton.focus();
      console.log('Submit Button Focused');
    } else {
      console.warn('Failed to find Submit button');
    }
  }

  function clickEnterRecordsButton(elementId) {
    var enterRecordsButton = document.getElementById(elementId);
    if (enterRecordsButton) {
      enterRecordsButton.click();
      console.log('clicked Enter Records button!');
      simulateEnterKey(enterRecordsButton);
    } else {
      console.warn('Failed to find Enter Records button');
    }
  }

  function enterWorkAssignment(elementId) {
    var eleName = getElementIdName(elementId);
    var inputElement = document.getElementById(elementId);
    // don't set the value if it already exists
    if (inputElement && inputElement.value.trim() === '') {
      simulateDownArrow(inputElement);
      simulateEnterKey(inputElement);
      console.log(`Set ${eleName}'s Assignment`);
    } else {
      console.warn(`Failed to find the input for ${eleName}'s assignment`);
    }
  }

  function enterTimeSheetData() {
    DailyIds.forEach((day) => {
      enterWorkAssignment(day.assignment);
      enterDailyHours(day.plusHour, day.hourValue);
    });
  }

  function pollForElement() {
    var mondayAssignmentInput = document.getElementById(DailyIds[0].assignment);
    if (mondayAssignmentInput) {
      console.log('Able to enter records, proceeding with assignment.');
      enterTimeSheetData();
      setTimeout(() => focusSubmitButton(), 250);
    } else {
      console.log("Can't enter records yet, retrying in 250...");
      setTimeout(pollForElement, 250);
    }
  }

  pollForElement();
  clickEnterRecordsButton(enterRecordsButtonId);
})();
