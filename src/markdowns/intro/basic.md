## Why Universal UI?
At the core, [React Universal UI][ruui-url] is a set of cross-platform **UI Components** - 
which could be run on **Native Mobile** as well as **Web Browser**,
the idea is to **write once and really run it "everywhere" with great performance**.

While [React Native][react-native-url] is a great choice for developing cross-platform Mobile application 
on (**iOs** and **Android**), we can't reuse it in **Web Browser**. [React Universal UI][ruui-url] make that possible, thanks to the awesome [React Native for Web][react-native-web-url] library.

Inspired by [Ionic Framework][ionic-url], we decided to develop [React Universal UI][ruui-url] as a set of
cross-platform **core UI Components** using [Native Native][react-native] building block.
And focus on building **documentation**, **extensions** around this core.

Because of [React Native][react-native-url]'s native rendering system, [React Universal UI][ruui-url] 
performance on Mobile is amazing - that is something [Ionic][ionic-url] (browser-emulation) can't do yet.
  
[React Native][react-native-url]'s **native modules** (e.g `camera`, `maps`, `notification`...)
also more powerful (with very active community recent years) compare to [Cordova][cordova-url] (used by [Ionic][ionic-url] and other `hybrid-mobile-framework`).   

We believe [React Native][react-native-url] is the future of Mobile development _(and should be for **Web** too ;)_. 

On **Browser** side, [React Native for Web][react-native-web-url] building block offer great advantages compare to traditional [React][react-url] (or [Angular][angular-url], [Vue.js][vue-url]):

>**High-quality user interfaces**: React Native for Web makes it easy to create [fast](https://github.com/necolas/react-native-web/blob/master/packages/benchmarks/README.md),
adaptive web UIs in JavaScript. It provides native-like interactions, support for multiple input modes (touch, mouse, keyboard), optimized vendor-prefixed styles, built-in support for RTL layout, built-in accessibility, and integrates with React Dev Tools.

---

>**Write once, render anywhere**: React Native for Web interoperates with existing React DOM components and is compatible with the majority of the React Native API. You can develop new components for native and web without rewriting existing code. React Native for Web can also render to HTML and critical CSS on the server using Node.js.

**In summary, [React Universal UI][ruui-url] offer us an easy and performance way to share our application code cross platforms.**

## How it work?
- **React Native**: On this side [React Universal UI][ruui-ui] is a normal [React Native][react-native-url] library,
we just install and use it as what we normally did on other [React Native][ruui-ui] libraries (`yarn add react-universal-ui`).

- **Browser**: [React Native for Web][react-native-web-url] let us run our [React Native][react-native-url] component on **Browser**,
[React Universal UI][ruui-url] provide universal components (native and web-friendly) and make sure these component behave correctly on **Browser**.

- **Universal**: To make our application run on **Mobile** and **Web** using one single source-code, 
there are certain differences between [React Native][react-native-url] 
and **Web** building block - such as **Routing**, **Touch/Mouse** handling... [React Universal UI][ruui-url] also cares 
and provide support for those differences (there're helpers under [utils](/docs/utils/context-provider) module), 
which save your time and let you focus on write your **Universal App**.

## Platforms
- **Native**: **Android**, **iOs**, **Windows Universal** _(beta support)_ and more (**Mac**, **Linux**) in the future.
- **Browser**: **Chrome**, **Firefox**, **Safari** >= 7, **IE** >= 10, **Edge**.

## Influences
- [React Material UI][material-ui-url] - [React Universal UI][ruui-url] heavily inspired by their great component design for Web.  
- [Ionic][ionic-url] - they have really great documentation and ecosystem to study from when we make [React Universal UI][ruui-url].