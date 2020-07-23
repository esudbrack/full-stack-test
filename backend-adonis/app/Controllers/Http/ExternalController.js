"use strict";
const axios = require("axios");
const api = axios.create({
  baseURL: "https://api.punkapi.com/v2",
});

class ExternalController {
  async getBrewById({ response, params }) {
    let { page, per_page } = params;
    let results = await api(`/beers?page=${page}&per_page=${per_page}`);
    response.send(results.data);
  }
}

module.exports = ExternalController;
