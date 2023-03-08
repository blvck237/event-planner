/* global Handlebars, prompt */
'use strict';

// The client-side "app" which leverages the shared Handlebars "echo" template.
// This will prompt the user for a message, then echo it out by rendering the
// message using the shared template which was exposed by the server.
(function () {
  var radioYes = document.getElementById('accept-rsvp');
  var radioNo = document.getElementById('reject-rsvp');

  radioNo.addEventListener(
    'click',
    function (e) {
      const [rsvp, userId, eventId] = e.target.value.split(' ');
      fetch('/guests/rsvp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rsvp, userId, eventId }),
      });
    },
    false
  );
  radioYes.addEventListener(
    'click',
    function (e) {
      const [rsvp, userId, eventId] = e.target.value.split(' ');
      fetch('/guests/rsvp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rsvp, userId, eventId }),
      });
    },
    false
  );

  // On checkbox click, get value of checkbox and send to server
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener(
      'click',
      function (e) {
        const [eventId, meal] = e.target.value.split('-');
        console.log(eventId, meal);

        fetch(`/guests/${eventId}/meals`, {
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
