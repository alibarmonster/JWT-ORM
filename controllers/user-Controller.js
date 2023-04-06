const { User } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');

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

const getUsersByUsername = async (req, res) => {
  try {
    const id = req.params.id;

    const idFound = await User.findByPk(id);

    if (!idFound) {
      return res.status(404).json({
        status: 'failed',
        message: `User not found`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: `User found`,
      data: idFound,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: 'invalid id',
    });
  }
};

const updateUsersByUsername = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const id = req.params.id;

    const foundUser = await User.findByPk(id);

    if (!foundUser) {
      return res.status(404).json({
        status: 'failed',
        message: `User not found`,
      });
    }

    const foundUsername = await User.findOne({
      where: {
        username: username,
      },
    });

    if (foundUsername) {
      if (foundUsername.username === foundUser.username) {
        await foundUser.update({
          username: username,
          email: email,
          password: hashPassword(password),
        });

        return res.status(201).json({
          status: 'success',
          message: 'User updated',
          data: foundUser,
        });
      } else {
        return res.status(400).json({
          status: 'failed',
          message: 'Username already exist',
        });
      }
    }

    const foundEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (foundEmail) {
      if (foundEmail.email === foundUser.email) {
        await foundUser.update({
          username: username,
          email: email,
          password: hashPassword(password),
        });

        return res.status(201).json({
          status: 'success',
          message: 'User updated',
          data: foundUser,
        });
      } else {
        return res.status(400).json({
          status: 'failed',
          message: 'email already exist',
        });
      }
    }

    const updatedUser = await foundUser.update({
      username: username,
      email: email,
      password: hashPassword(password),
    });

    return res.status(201).json({
      status: 'success',
      message: 'User updated',
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = { getAllUser, getUsersByUsername, updateUsersByUsername };
