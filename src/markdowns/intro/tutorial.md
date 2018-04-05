# Hot code reload..

Assuming that you're using [React Universal Boilerplate][boilerplate-url] from [Installation](/docs/intro/installation) section.
After `yarn web` start successfully, we'll see our **empty project** at [localhost:3000](localhost:3000) (similar to right pane example).

>**Note**: With required software for Mobile development you could run
`react-native run-ios` (**Mac** only) 
or 
`react-native run-android` 
to see exact same thing on your **Mobile** (device/emulator). 

Under [src/index.js](https://github.com/cloudle/react-universal-ui-boilerplate/blob/master/src/index.js),
is a normal [React Native][react-native-url] code, try to make some change on the `render() {...}` function..

```jsx:src/index.js
<Text style={styles.welcome}>
  Welcome to my Awesome Project
</Text>
```

You'll see the change instantly on [localhost:3000](localhost:3000) (**Browser**) or **Mobile** (device/emulator).
