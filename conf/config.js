const file = process.env.NODE_ENV;

const vals = require(`./${file}`);

module.exports = vals;
