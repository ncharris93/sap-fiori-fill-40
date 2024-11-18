;(function () {
  function clickEnterRecordsButton() {
    var enterRecordsButton = document.getElementById(
      'application-zhcmtime-manage-component---worklist--editButton'
    )
    if (enterRecordsButton) {
      enterRecordsButton.click()
      console.log('clicked Enter Records button!')
      simulateEnterKey(enterRecordsButton)
      // Wait for half a second before clicking the input
      setTimeout(clickInputFirstChild, 500)
    } else {
      console.log('Failed to find Enter Records button, quitting')
      return
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

  function clickInputFirstChild() {
    var parentDiv = document.getElementById('__box15-__clone57-inner')
    if (parentDiv && parentDiv.firstElementChild) {
      var inputElement = parentDiv.firstElementChild
      // Simulating a click on the input element
      var event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
      inputElement.dispatchEvent(event)
      console.log('clicked the input element!')
    } else {
      console.log('Failed to find the input element, quitting')
      return
    }
  }

  // Call the function to execute
  clickEnterRecordsButton()
})()
