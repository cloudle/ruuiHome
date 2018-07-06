## Hot code reload..
Although we could use [react-universal-ui][github-url], let's use myApp project (created by `ruui init myApp`) for this tutorial.  
After `ruui dev` start successfully, we'll see our **empty project** at [localhost:3000](localhost:3000) (similar to right pane example).

With required software for Mobile development you could run  `react-native run-ios` (**Mac** only)
or `react-native run-android` to see exact same thing on your **Mobile** (device/emulator). 

Under [src/index.js](https://github.com/cloudle/react-universal-ui-boilerplate/blob/master/src/index.js),
is a normal [React Native][react-native-url] source code, try to make some change on the `render() {...}` function..

```jsx:original-version
<Text style={styles.welcome}>
  Welcome to Universal Ui
</Text>
```

```jsx:edited-version
<Text style={styles.welcome}>
  Welcome to my Awesome Project
</Text>
```

We'll see the change instantly on [localhost:3000](localhost:3000) after the change - the same way it should on [React Native][react-native-url]'s hot reload.
