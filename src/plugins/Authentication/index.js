import fp from 'fastify-plugin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';
import fastjwt from '@fastify/jwt';

const { password, auth } = config;

const Authentication = fp(async function Authentication(fastify) {
  fastify.register(fastjwt, {
    secret: auth.secretKey
  });

  fastify.decorate('validate', async function(req, res) {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.send(err);
    }
  });

  fastify.decorate('auth', {
    getResetCredentials: email => {
      const resetPasswordToken = jwt.sign({ email }, password.resetSecretKey, {
        expiresIn: password.resetExpiresIn
      });
      const resetPasswordTokenExpires = Date.now() + password.resetExpiresIn;
      return { resetPasswordToken, resetPasswordTokenExpires };
    },

    generateToken: user => {
      const { _id, name, email, phoneNumber, userRole } = user;
      const payload = {
        id: _id,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        role: userRole.name,
      };

      const token = jwt.sign(payload, auth.secretKey, {
        expiresIn: auth.expiresIn
      });
      return token;
    },

    onVerifyPassword: async (password, userPassword) =>
      await bcrypt.compare(password, userPassword)
  });
});

export default Authentication;
