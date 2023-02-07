const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = mongoose.model('Users');

router.get('/', (req, res) => {
  // Check if user is logged in
  console.log("Auth Mid", req.session);
  
  if (req.session.userId) {
    res.redirect('/events/list');
    return;
  }
  res.render('auth/login', {
    viewTitle: 'Welcome to Event Planner',
    user: {
      email: 'john@doe.com',
      password: 'john@doe.com',
    },
  });
});

router.get('/login', (req, res) => {
  res.render('auth/login', {
    viewTitle: 'Welcome to Event Planner',
    user: {
      email: 'john@doe.com',
      password: 'john@doe.com',
    },
  });
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', {
    viewTitle: 'Welcome to Event Planner',
    user: {
      fullName: '',
      email: '',
      password: '',
    },
  });
});

router.post('/login', (req, res) => {
  login(req, res);
});

router.post('/signup', (req, res) => {
  signUp(req, res);
});

function signUp(req, res) {
  const user = new User();
  user.fullName = req.body.fullName;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save((err, doc) => {
    if (!err) {
      req.session.userId = doc._id;
      res.redirect('/');
      return;
      res.redirect('events/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('auth/signup', {
          viewTitle: 'Insert users',
          user: req.body,
        });
      } else console.log('Error during account creation : ' + err);
    }
  });
}

async function login(req, res) {
  try {
    // We are searching for our user based on the email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('User not found');
    }
    // 2. Compare password
    const isPasswordMatch = await user.comparePassword(req.body.password, user.password);
    // 3. Check if password matches
    if (!isPasswordMatch) {
      throw new Error('Password incorrect');
    }
    // 4. Generate token
    await user.generateAuthToken();
    user = user.toObject();
    req.session.userId = user._id;
    req.app.set('user', user)
    res.redirect('/events/list');
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function logout(req, res) {
  req.session.destroy();
  req.user = null;
  res.redirect('/');
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

// function updateRecord(req, res) {
//   users.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
//     if (!err) {
//       res.redirect('user/list');
//     } else {
//       if (err.name == 'ValidationError') {
//         handleValidationError(err, req.body);
//         res.render('user/addOrEdit', {
//           viewTitle: 'Update users',
//           user: req.body,
//         });
//       } else console.log('Error during record update : ' + err);
//     }
//   });
// }

// router.get('/list', (req, res) => {
//   users.find((err, docs) => {
//     if (!err) {
//       res.render('user/list', {
//         list: docs,
//       });
//     } else {
//       console.log('Error in retrieving user list :' + err);
//     }
//   });
// });

// function handleValidationError(err, body) {
//   for (field in err.errors) {
//     switch (err.errors[field].path) {
//       case 'fullName':
//         body['fullNameError'] = err.errors[field].message;
//         break;
//       case 'email':
//         body['emailError'] = err.errors[field].message;
//         break;
//       default:
//         break;
//     }
//   }
// }

// router.get('/:id', (req, res) => {
//   users.findById(req.params.id, (err, doc) => {
//     if (!err) {
//       res.render('user/addOrEdit', {
//         viewTitle: 'Update users',
//         user: doc,
//       });
//     }
//   });
// });

module.exports = router;
