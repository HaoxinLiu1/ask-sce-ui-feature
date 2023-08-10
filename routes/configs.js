const express = require('express');
const appInsights = require('applicationinsights');
const config = require('../lib/config');

const router = express.Router();

/** * This route will fetch the App Insights Connection String from env file */

router.get('/appInsightsConnStr', (req, res) => {
  appInsights.defaultClient.trackNodeHttpRequest({
    request: req,
    response: res,
  });
  const conf = {
    appInsightsConnStr: config.appInsightsConnString,
  };
  res.send(conf);
});

module.exports = router;
