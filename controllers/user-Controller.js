const { User } = require('../models');

const getAllUser = async (req, res) => {
  try {
    const foundUser = await User.findAll();

    return res.status(200).json({
      status: 'success',
      message: 'User found',
      total: foundUser.length,
      data: foundUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = { getAllUser };
