import { Router } from 'express';
import config from '../config';

const nodemailer = require('nodemailer');
const val = function (dato:string) {
  if (dato !== 'yes') {
    return false;
  }
  return true;
};

const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: parseInt(config.emailPort, 10),
    secure: val(config.secureEmail),
    auth: {
      user: config.emailApp,
      pass: config.passwordEmail,
    },
});
export default transporter;