const { User } = require('../models');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    const encryptedPasswod = await hashPassword(password);
    const createdUser = await User.create({
      username: username,
      email: email,
      password: encryptedPasswod,
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email is required',
      });
    }

    if (!password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Password is required',
      });
    }

    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email is not registered',
      });
    }

    const passwordMatch = await comparePassword(password, userExists.password);
    if (passwordMatch) {
      const jwtToken = {
        username: userExists.username,
        email: userExists.email,
        payload: userExists.password,
      };

      const token = jwt.sign(jwtToken, process.env.JWT_SECRET);

      return res.status(200).json({
        status: 'success',
        message: 'User logged in Succesfully',
        token: token,
      });
    }

    return res.status(400).json({
      status: 'failed',
      message: 'Invalid email or password',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = { register, login };
