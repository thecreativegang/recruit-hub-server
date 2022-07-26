const User = require('../Schemas/userSchema');
const { sendError } = require('../utilities/errorHelper');

exports.create = async (req, res) => {
  const { email, userName, isAdmin, accountType } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, 'The email is already in use!');

  const newUser = new User({ email, userName, isAdmin, accountType });
  await newUser.save();

  res.status(201).json({
    user: {
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
  });
};
