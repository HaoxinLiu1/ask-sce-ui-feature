/**
 * * server.js is the entry point of the application.This app uses express.js framework for the
     backend functions.
 * * for azure authentication we use the package "passport-azure-ad" and for supporting persistent
     login sessions we use "passport"
 * * for Request/Response transport security we use the npm package "helmet"  and "express-session"
     for creating and managing the session middleware
 */

const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const appInsights = require('applicationinsights');
const Bowser = require('bowser');
const RateLimit = require('express-rate-limit');
const fetch = require('node-fetch');
const configRoute = require('./routes/configs');
const config = require('./lib/config');
const logger = require('./utils/logger');
const tokenIdentifier = 'DLRT'
const ULID = require('ulid')
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})
// Azure App Analytics start
appInsights.setup(config.appInsightsConnString).start();

const app = express();

// For reduce Fingerprinting.It can help to provide an extra layer of obsecurity to reduce server fingerprinting.
app.disable('x-powered-by');

// helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet({ contentSecurityPolicy: false }));

// HTTP request logger middleware for node.js
app.use(morgan('tiny'));

app.use(cookieParser());
app.get('/dltoken', auth, async (req, res) => {
  if (!req.isAuthenticated()) {
    res.sendStatus(401)
    return
  }

  res.send(await generateToken())
})



function auth(req, res, next) {
  let key = req.get('dl-key');
  console.log("KEY is: " + key)
  if (!key || key.length === 0 || key === ' ' || !key.startsWith(tokenIdentifier)) {
    req.isAuthenticated = function () { return false }
    next()
  }

  req.isAuthenticated = function () {
    return key.split(" ")[1].trim() === process.env.DL_RT;
  }
  next()

}

async function generateToken() {
  let headers = {
    Authorization: `Bearer ${process.env.DL_SECRET}`,
    'Content-Type': 'application/json'
  }
  let id = ULID.ulid()
  let body = { user: { id: id, name: id } }
  let res = await fetch(process.env.DL_URL, {
    headers: headers,
    body: JSON.stringify(body),
    method: 'POST',
    agent: agent
  })
  let data = await res.json()
  let response = await {
    token: data.token,
    conversationId: data.conversationId,
    expires_in: data.expires_in,
    id
  }

  return await response

}
// set up rate limiter: maximum of ten requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// apply rate limiter to all requests
app.use(limiter);

app.use(
  expressSession({
    secret: config.expressSessionSecret,
    resave: true,
    saveUninitialized: false,
    cookie: {
      //secure: true,
      httpOnly: true,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// To keep track of user page views in Application Insights
app.use((req, res, next) => {
  try {
    const { user, session } = req;
    const userAgent = req.get('User-Agent');

    const sessionId = session.id;
    if (user) {
      const userId = user && user.preferred_username;
      const browser = Bowser.getParser(userAgent);

      const currentRequestContext =
        appInsights.getCorrelationContext().requestContext || {};

      const nextRequestContext = {
        ...currentRequestContext,
        sessionId,
        userId,
        browser: `${browser.getBrowserName()} ${browser.getBrowserVersion()}`,
      };

      appInsights.getCorrelationContext().requestContext = nextRequestContext;
    }
  } catch (ex) {
    logger.error(ex);
  }
  next();
});

// Serve static files in Express
app.use(express.static(path.join(__dirname, 'build')));

app.use('/config', configRoute);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8080, () =>
  logger.log(`App listening on port ${process.env.PORT || 8080}`)
);
