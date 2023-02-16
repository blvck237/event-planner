const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { userAuthMiddleware, guestAuthMiddleware } = require('../middlewares/auth');
const Guests = mongoose.model('Guests');
const Users = mongoose.model('Users');
const Events = mongoose.model('Events');

// Called when you open the guest list page
router.get('/:eventId', userAuthMiddleware, async (req, res) => {
  try {
    const event = await Events.findById(req.params.eventId);
    const guests = await Guests.find({ event: req.params.eventId });
    res.render('guests/list', {
      list: guests,
      eventId: req.params.eventId,
      event,
    });
  } catch (error) {
    console.log('Error in retrieving guest list :' + err);
  }
});

router.get('/:eventId/invite', userAuthMiddleware, async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Events.findById(eventId);

  res.render('guests/addOrEdit', {
    viewTitle: 'Insert Guests',
    eventId: eventId,
    event,
  });
});

router.post('/:eventId', userAuthMiddleware, (req, res) => {
  if (req.body._id == '') insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var guest = new Guests();
  guest.fullName = req.body.fullName;
  guest.email = req.body.email;
  guest.mobile = req.body.mobile;
  guest.city = req.body.city;
  guest.event = req.body.eventId;
  guest.save((err, doc) => {
    if (!err) {
      res.redirect(`../guests/${req.params.eventId}`);
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('guests/addOrEdit', {
          viewTitle: 'Insert Guests',
          guest: req.body,
        });
      } else console.log('Error during record insertion : ' + err);
    }
  });
}

function updateRecord(req, res) {
  Guests.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      // Go back to the guest list page
      res.redirect(`../guests/${req.params.eventId}`);
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('guests/addOrEdit', {
          viewTitle: 'Update Guests',
          guest: req.body,
        });
      } else console.log('Error during record update : ' + err);
    }
  });
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get('/:eventId/details/:id', userAuthMiddleware, (req, res) => {
  Guests.findOne(
    {
      _id: req.params.id,
      event: req.params.eventId,
    },
    (err, doc) => {
      if (!err) {
        res.render('guests/addOrEdit', {
          viewTitle: 'Update Guests',
          guest: doc,
          eventId: req.params.eventId,
        });
      }
    }
  );
});

router.get('/:eventId/delete/:id', userAuthMiddleware, (req, res) => {
  Guests.findOneAndRemove(
    {
      _id: req.params.id,
      event: req.params.eventId,
    },
    (err, doc) => {
      if (!err) {
        res.redirect(req.get('referer'));
      } else {
        console.log('Error in guest delete :' + err);
      }
    }
  );
});

const updateGuestRSVP = () => async (guestId, rsvp) => {
  try {
    // If guest's rsvp is 'yes', change it to 'no' and vice versa
    const result = await Guests.findOneAndUpdate({ _id: guestId }, { rsvp }, { new: true });
    return result;
  } catch (error) {
    console.log('Error in updating guest RSVP', error);
  }
};

// guest home page. This is the page that the guest sees when he logs in
// On this page, he can see the event details and can RSVP
router.get('/home/rsvp', guestAuthMiddleware, async (req, res) => {
  const event = await Events.findById(req.user.event);
  const creator = await Users.findById(event.createdBy);
  res.render('guests/home', {
    event,
    user: req.user,
    creator,
    updateGuestRSVP,
  });
});

router.put('/rsvp', async (req, res) => {
  const { rsvp, userId, eventId } = req.body;
  const guest = await Guests.findOne({ _id: userId, event: eventId });
  guest.rsvp = rsvp;
  guest.save();
});

module.exports = router;
