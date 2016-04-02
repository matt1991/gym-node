var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var trainerSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,


  name: { type: String, default: '' },
  gender: { type: String, default: '' },
  wechat: { type: String, default: '' },
  gym: { type: Number, ref: 'Gym' },
  usertrainer: [{ type: Number, ref: 'UserTrainer'}],
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'modifiedDate' } });

/**
 * Password hash middleware.
 */
trainerSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
trainerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
trainerSchema.methods.gravatar = function(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

var Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
