;(function () {
  var enterRecordsButtonId =
    'application-zhcmtime-manage-component---worklist--editButton'
  var submitButtonId =
    'application-zhcmtime-manage-component---worklist--OverviewSubmitButton'

  var assignmentElementIds = [
    '__box15-__clone54-inner', // Monday
    '__box15-__clone55-inner', // Tuesday
    '__box15-__clone56-inner', // Wednesday
    '__box15-__clone57-inner', // Thursday
    '__box15-__clone58-inner', // Friday
  ]

  var timePlusButtonIds = [
    '__input4-__clone54-incrementBtn', // Monday
    '__input4-__clone55-incrementBtn', // Tuesday
    '__input4-__clone56-incrementBtn', // Wednesday
    '__input4-__clone57-incrementBtn', // Thursday
    '__input4-__clone58-incrementBtn', // Friday
  ]

  function getElementIdName(elementId) {
    switch (elementId) {
      case elementId.includes('54'):
        return 'Monday'
      case elementId.includes('55'):
        return 'Tuesday'
      case elementId.includes('56'):
        return 'Wednesday'
      case elementId.includes('57'):
        return 'Thursday'
      case elementId.includes('58'):
        return 'Friday'
      default:
        return 'You working weekends or something?'
    }
  }

  function simulateEnterKey(element) {
    var enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
      bubbles: true,
    })
    element.dispatchEvent(enterEvent)
  }

  function simulateDownArrow(element) {
    element.focus()
    // Simulating a down arrow key press
    var downArrowEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: 40,
      bubbles: true,
    })
    element.dispatchEvent(downArrowEvent)
  }

  function simulateButtonClick(elementId, times = 8) {
    var buttonElement = document.getElementById(elementId)
    var eleName = getElementIdName(elementId)
    if (buttonElement) {
      Array.from({ length: times }).forEach(() => {
        buttonElement.click()
      })
      console.log(`Set ${eleName}'s time to ${times} hours`)
    } else {
      console.log(`Failed to find hour increment button for ${eleName}`)
    }
  }

  function focusSubmitButton() {
    var submitButton = document.getElementById(submitButtonId)
    if (submitButton) {
      submitButton.focus()
      console.log('Submit Button Focused')
    } else {
      console.log('Failed to find Submit button ')
    }
  }

  function clickEnterRecordsButton(elementId) {
    var enterRecordsButton = document.getElementById(elementId)
    if (enterRecordsButton) {
      enterRecordsButton.click()
      console.log('clicked Enter Records button!')
      simulateEnterKey(enterRecordsButton)
    } else {
      console.log('Failed to find Enter Records button, quitting')
      return
    }
  }

  function selectInputAndPressDownArrow(elementId) {
    var eleName = getElementIdName(elementId)
    var inputElement = document.getElementById(elementId)
    if (inputElement) {
      simulateDownArrow(inputElement)
      simulateEnterKey(inputElement)
      console.log(`Set ${eleName}'s Assignment`)
    } else {
      console.log(
        `Failed to find the input element with id ${elementId}, quitting`
      )
    }
  }

  function enterTimeSheetData() {
    assignmentElementIds.forEach(selectInputAndPressDownArrow)
    timePlusButtonIds.forEach(id => simulateButtonClick(id))
  }

  // Call the function to execute
  clickEnterRecordsButton(enterRecordsButtonId)
  // Wait for half a second before entering time sheet data
  setTimeout(enterTimeSheetData, 500)
  // Wait for 3/4 a second before focusing the submit button
  setTimeout(focusSubmitButton, 750)
})()
