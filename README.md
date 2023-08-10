# cra-template-sce_react_nodejs_template

CRA template with: ExpressJS, passport-azure-ad, axios, mssql integration, azure-keyvault, azure app analytics and multi lingual support much more configured.

## ⚗️ Technologies list

- [ExpressJS](https://expressjs.com/)

  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [passport](https://www.npmjs.com/package/passport)

  To support persistent login sessions, Passport needs to be able to serialize users into and deserialize users out of the session.

- [Passport-Azure-ad](https://www.npmjs.com/package/passport-azure-ad)

  This package is a collection of Passport Strategies to help you integrate with Azure Active Directory. It includes OpenID Connect, WS-Federation, and SAML-P authentication and authorization. These providers let you integrate your Node app with Microsoft Azure AD so you can use its many features, including web single sign-on (WebSSO), Endpoint Protection with OAuth, and JWT token issuance and validation.

- [helmet](https://helmetjs.github.io/)

  Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

- [lokijs](https://www.npmjs.com/package/lokijs)

  The super-fast in-memory JavaScript document oriented database

- [express-session](https://www.npmjs.com/package/express-session)

  an HTTP server-side framework used to create and manage a session middleware.

- [applicationinsights](https://www.npmjs.com/package/applicationinsights)

  Azure Application Insights monitors your backend services and components after you deploy them to help you discover and rapidly diagnose performance and other issues. Add this SDK to your Node.js services to include deep info about Node.js processes and their external dependencies such as database and cache services. You can use this SDK for your Node.js services hosted anywhere: your datacenter, Azure VMs and Web Apps, and even other public clouds.

- [mssql](https://www.npmjs.com/package/mssql)

  We use the npm package mssql for Microsoft SQL Server client for Node.js. Make sure that firewall is opened to the machine where you are running the app.

- [@microsoft/applicationinsights-react-js](https://www.npmjs.com/package/@microsoft/applicationinsights-react-js)

  React Plugin for the Application Insights Javascript SDK, enables the following:

  - Tracking of router changes
  - React components usage statistics

- [bootstap](https://www.npmjs.com/package/bootstrap)

  Sleek, intuitive, and powerful front-end framework for faster and easier web development.

- [i18next](https://www.npmjs.com/package/i18next)

  i18next is a very popular internationalization framework for browser or any other javascript environment

- [ESlint](https://eslint.org/)

- [Prettier](https://prettier.io/)

<br />

# 🚀 Start using it

To use this template for your app you can run:

```sh
npx create-react-app my-app --template sce_node_webapp_template
```

or

```sh
yarn create react-app my-app --template sce_node_webapp_template
```

The `--template` parameter points to this template, note that `cra-template-` prefix is omitted.

<br />

Add the key proxy in package.json

```sh
"proxy": "http://localhost:8080"
```

To Build the application

- Windows

```sh
 npm run build
```

- Mac

```sh
 npm run build-ios
```

# ⚠️ Warning

Cloning this repo pulls down the template only, not a bundled and configured Create React App.

<br />

# 🧬 Template structure

This is the structure of the files in the template:

```sh
    │
    ├── mocks
    ├── __tests__            # sample tests file for the application
    ├── lib                  # configuration files for backend,database,keyvault
    ├── public
    ├── routes               # backend api roues
    ├── src                  # source files
    │   ├── assets           # images, constants and other static resources
    │   ├── componenents     # reusable components for the application
    │   ├── context          # Context store
    │   ├── lib
    │   ├── pages
    │   ├── styles
    │   ├── App.jsx
    │   ├── index.jsx
    │   └── react-app-env.d.ts
    |   ├── Routes.jsx
    ├── utils                #utility functions such as logger,token and user store
    ├── .eslintrc.js
    ├── .bablerc
    ├── .gitignore
    ├── .prettierrc
    ├── package.json
    ├── README.md
    ├── jest.config.js
    ├── setupTests.js
    ├── tsconfig.json
    └── server.js
```

<br />

# 📖 Learn More

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).\
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

<br />

# env ⚙️ file structure

CLIENT_ID= "client id in azure app registration"
<br />
CLIENT_SECRET= "client id in azure app registartion"
<br />
ENABLE_LOG=1 "enable log for application"
<br />
IV_1= "for encrypting auth cookie.this must be a string of length 12"
<br />
IV_2= "for decrpyting auth cookie.this must be a string of length 12"
<br />
KEY_1= "for encrypting auth cookie.this must be a string of length 32"
<br />
KEY_2="For decrpyting auth cookie.this must be a string of length 32"
<br />
REDIRECT_URL= "url to be redirected after login"
<br />
TENANT_ID="tenant id in azure"
<br />
EXPRESS_SESSION_SECRET="This is the secret used to sign the session ID cookie"
<br />
APPLICATIONINSIGHTS_CONNECTION_STRING="app insights connection string from azure"
<br />
DBUSERNAMEKEY="database username key stored in key vault"
<br />
DBPASSWORDKEY="database password key stored in key vault"
<br />
SQLDATABASE= "name of database"
<br />
SQLHOST="hostname of database"
<br />
VAULTURI="azure keyvault uri"
<br />

# Dev dependencies

The below npm packages can be moved to dev dependencies inside package.json file after the project has been created using the template.

"@types/node"
<br />
"@types/node-sass"
<br />
"@types/react"
<br />
"@types/react-dom"
<br />
"@babel/core"
<br />
"@babel/eslint-parser"
<br />
"@babel/preset-env"
<br />
"@babel/preset-react"
<br />
"@babel/preset-typescript"
<br />
"@testing-library/react"
<br />
"@testing-library/user-event"
<br />
"@types/jest"
<br />
"@typescript-eslint/eslint-plugin"
<br />
"@typescript-eslint/parser"
<br />
"babel-jest"
<br />
"babel-loader"
<br />
"eslint"
<br />
"eslint-config-airbnb-base"
<br />
"eslint-config-prettier"
<br />
"eslint-plugin-import"
<br />
"eslint-plugin-jsx"
<br />
"eslint-plugin-react"
<br />
"jest"
<br />
"jest-environment-jsdom"
<br />
"nodemon"
<br />
"prettier"
<br />
"react-scripts"
<br />
"ts-jest"
<br />
"typescript"
<br />
},
