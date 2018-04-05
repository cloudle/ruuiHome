## Required softwares
You'll need to install required software by [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
to run **Mobile Native Environment**. At minimum level, you'll need:

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com/en/) (optional but highly recommended, use `npm install` instead `yarn install` without this)
- [Git](https://git-scm.com/) (optional but highly recommended, to pull boilerplate source code - without this you could download and extract instead)

---

## New Project (Universal Native and Web)
[React Universal UI][ruui-url] ship with [Universal UI Boilerplate][boilerplate-url] which have complete structure
 and starter sample code, with it you could jump instantly to your code and get thing done.

```bash:basic-installation
# clone your boilerplate repo (an empty project to getting started quickly)
git clone https://github.com/cloudle/react-universal-ui-boilerplate.git
# cd to the new cloned directory
cd react-universal-ui-boilerplate
# install dependencies
yarn install
# [optional] build common chunks cache - this make our build speed much faster 
yarn vendor
# run development server
yarn web # or | react-native run-ios | react-native run-android 
```

---

## New Project (Fullstack Node.js SSR, Universal Router)
More advanced boilerplate branch, which support [Node.js](https://nodejs.org) - [server-side-rendering](https://medium.freecodecamp.org/what-exactly-is-client-side-rendering-and-hows-it-different-from-server-side-rendering-bd5c786b340d). Which mean your application run on `iOs`, `Android`, `Browser` and `Node.js` (SSR).  

This actually is the above `Universal Native and Web` setup with additional steps..

```bash:advanced-installation
git clone https://github.com/cloudle/react-universal-ui-boilerplate.git
cd react-universal-ui-boilerplate
# switch to advanced [browser-ssr] branch
git checkout browser-ssr
yarn install 
yarn vendor
yarn web # run development server, but we won't primarily use this 
babel-node --inspect server.js # this run our "real" server with SSR
# in your terminal cli, it will suggest you open your browser at localhost:3005
```

---
## Existing React Native Project
This pretty simple and strait forward, `install` and use it like what you did with any other [React Native][react-native-url] library.

```bash:exsting-native-installation
yarn add react-universal-ui
```

---

## Existing Web Project (using webpack)
This way require you have certain understanding with `webpack`. Follow this [instruction](https://github.com/necolas/react-native-web/blob/master/website/guides/getting-started.md#adding-to-an-existing-web-app)
to make your exsiting `webpack` understand (alias) [React Native Web][react-native-web-url]
(see [Universal UI Boilerplate][boilerplate-url] code for example).

After make sure [React Native Web][react-native-web-url] work correctly, install [React Universal UI][ruui-url]

```bash:exsting-native-installation
yarn add react-universal-ui
# or with [npm]
npm install --save react-universal-ui
```