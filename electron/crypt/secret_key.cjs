require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'default';

module.exports = {
  SECRET_KEY
}