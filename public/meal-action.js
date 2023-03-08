/* global Handlebars, prompt */
'use strict';

(function () {
  // On checkbox click, get value of checkbox and send to server
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener(
      'click',
      function (e) {
        const [eventId, meal] = e.target.value.split('-');
        console.log(eventId, meal);

        fetch(`/events/${eventId}/meals`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ meal }),
        });
      },
      false
    );
  });
})();
