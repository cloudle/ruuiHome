## Why Universal UI?
[React Universal UI][ruui-url] is a cross-platform **UI Kit** - 
which could be run on **Native Mobile environment** as well as **Web Browser**,
the idea is to **write once and really run it "everywhere"**.

While [React Native][react-native-url] is a great choice for developing application on **Mobile**
(**iOs** and **Android**), it won't run on **Web Browser**.
[React Universal UI][ruui-url] make that possible, 
thanks to the great [React Native for Web][react-native-web-url] library. 

>React Native for Web makes it easy to create fast, adaptive web UIs in JavaScript. It provides native-like interactions, support for multiple input modes (touch, mouse, keyboard), optimized vendor-prefixed styles, built-in support for RTL layout, built-in accessibility, and integrates with React Dev Tools.

----

## How it work?
- **React Native**: On this side [React Universal UI][ruui-ui] is a normal [React Native][react-native-url] library,
we just install it (`yarn add react-universal-ui`) and use it as what we normally did on other [React Native][ruui-ui] libraries.
- **Browser**: [React Native for Web][react-native-web-url] let us run our [React Native][react-native-url] component on **Browser**,
[React Universal UI][ruui-url] take care and make sure these component behave correctly on **Web**.
- **Universal**: There are certain differences between [React Native][react-native-url] 
and **Web** building block - such as **Routing**, **Touch/Mouse** handling... [React Universal UI][ruui-url] also cares 
and provide support for those differences (there're helpers under [utils](/docs/utils/context-provider) module), 
which save your time and let you focus on write your **Universal App**.

---

## Platforms
- **Native**: **Android**, **iOs**, **Windows Universal** _(beta support)_ and more (**Mac**, **Linux**) in the future.
- **Browser**: **Chrome**, **Firefox**, **Safari** >= 7, **IE** >= 10, **Edge**.

---

## Influences
- [React Material UI][material-ui-url] - [React Universal UI][ruui-url] heavily inspired by their great component design for Web.  
- [Ionic][ionic-url] - they have really great documentation and ecosystem to study from when we make [React Universal UI][ruui-url].