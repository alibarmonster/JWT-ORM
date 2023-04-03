const { User } = require('../models');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return res.status(404).json({
        message: 'Failed',
        status: 'email has been registered',
      });
    }

    const createdUser = await User.create({
      username: username,
      email: email,
      password: password,
    });

    return res.status(201).json({
      status: 'success',
      message: 'User created Succesfully',
      data: createdUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = { register };
