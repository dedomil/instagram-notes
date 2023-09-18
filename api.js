const axios = require("axios");
const { baseURL, headers } = require("./config");

module.exports = axios.create({ baseURL, headers })
