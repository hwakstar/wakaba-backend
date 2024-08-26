const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const TimeCard=require('../models/timecard');
const { sendEmail } = require('../config/mailer');

//===register user======
exports.register = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const userData = {
      email: email,
      PasswordHash: hashedPassword
    };
    User.signup(userData, (err, results) => {
      if (err) return res.status(500).send(err);
      sendEmail(email, 'Welcome!', 'Thank you for registering!');
      res.status(201).json({ message: 'User registered.' });

    });
  });
};
//===login user======
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).send(err);
    if (user.length === 0 || !bcrypt.compareSync(password, user[0].PasswordHash)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user[0].UserID }, process.env.JWT_SECRET, {
      expiresIn: 86400
    });

    res.status(200).json({ token, message: 'Login successful' });


  })
};
//forget password
exports.forgetpassword = (req, res) => {
  const { email } = req.body;
  if (!users[email]) return res.status(404).send('User not found.');

  const token = crypto.randomBytes(20).toString('hex');
  resetTokens[token] = { email, expires: Date.now() + 3600000 }; // 1 hour expiration
  const resetLink = `${process.env.APP_URL}reset-password/${token}`;
  sendEmail(email, 'Password Reset!', `Click this link to reset your password: ${resetLink}`);

  res.send('Reset link sent to your email.');
}
//reset password

exports.resetpassword = (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const tokenData = resetTokens[token];
  if (!tokenData || Date.now() > tokenData.expires) {
      return res.status(400).send('Invalid or expired token.');
  }

  users[tokenData.email].password = newPassword; // Update password
  delete resetTokens[token]; // Invalidate the token
  res.send('Password has been reset.');

}

exports.logintimecard = (req, res) => {
  const { email } = req.body;
  const loginTime = new Date();
  const timecardData = {
    email,
    loginTime
};
Timecard.create(timecardData, (err, result) => {
  if (err) return res.status(500).send(err);
  res.status(201).json({ message: 'Login time recorded successfully', data: result });
});

}

exports.logouttimecard = (req, res) => {
  const { email } = req.body;
  const logoutTime = new Date();

  Timecard.findOneAndUpdate(
      { email, logoutTime: null }, // Find the latest open timecard for the user
      { logoutTime },
      { new: true },
      (err, result) => {
          if (err) return res.status(500).send(err);
          if (!result) return res.status(404).json({ message: 'No active login found' });
          res.status(200).json({ message: 'Logout time recorded successfully', data: result });
      }
  );
}