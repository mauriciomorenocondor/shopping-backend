const file = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'production';

const vals = require(`./${file}`);

module.exports = vals;
