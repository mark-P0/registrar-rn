# Registrar (React Native)

<!--
  Description
    A React Native application wrapper for my university registrar website.
-->

An _Android_ application wrapper for my university registrar website, rebuilt in React Native.

## Libraries / Frameworks Used

> **NOTE**: You might want to install packages of **exact** versions by omitting the caret (`^`) prefixes to minimize possible issues, e.g. `npm install @react-navigation/native@5.9.3`

- **React Native** `v0.63.4`

  - Due to using an old codebase

  ```bash
  npx react-native init ‹PROJECT_NAME› --template react-native-template-typescript@6.5.*

  ## Breakdown
    npx react-native init  # React Native CLI
    ‹PROJECT_NAME›         # Project / App name
  # --version 0.63.4       # Would specify RN version, but does not work because template is used
    --template react-native-template-typescript@6.5.*  # Template v6.5.* corresponds with RN v6.43.*
  ```

  - React Native version dependent on TypeScript template (if used), [as per the template's page](https://www.npmjs.com/package/react-native-template-typescript).

- **Android SDK**

  - The full Android Studio was **NOT** used; instead, relevant SDK packages and environment variables were setup with the help of [this Medium article](https://medium.com/@rodrigoklosowski/an-updated-guide-to-installing-react-native-without-android-studio-e3a87b4e1112) and [the relevant React Native documentation](https://reactnative.dev/docs/0.63/environment-setup).

  ```bash
  %ANDROID_HOME%\cmdline-tools\latest\bin\sdkmanager.bat "platforms;android-29" "add-ons;addon-google_apis-google-24" "build-tools;29.0.2" "platform-tools"

  ## Breakdown
  # https://developer.android.com/studio#command-tools
  %ANDROID_HOME%\cmdline-tools\latest\bin\sdkmanager.bat
  "platforms;android-29" # Android SDK Platform 29
  "add-ons;addon-google_apis-google-24"  # Google APIs Intel x86 Atom System Image
  "build-tools;29.0.2"   # Needed to be selected
  "platform-tools"       # To be added to PATH
  ```

- **React Navigation (Native)** `v5.9.3`
  - UI navigation
  - Dependencies manually installed as per [relevant documentation](https://reactnavigation.org/docs/5.x/getting-started)
- **React Native Paper** `v4.7.2`
  - Material Design components
  - Material Design tab navigation, in conjunction with _React Navigation_
  - Icons from **`react-native-vector-icons`** were manually linked using `react-native link`
    - In hindsight, it might be better to use the recommended [Gradle approach](https://github.com/oblador/react-native-vector-icons#option-with-gradle-recommended=)

## Project Structure

A similar project directory structure was implemented from [this article](https://reactnativeexample.com/react-native-project-structure/).

The following is an overview of the structure, generated with [this web app](https://tree.nathanfriend.io):

```
.
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/
│   ├── constants/
│   ├── routes/
│   ├── redux/
│   ├── views/
│   ├── helper/
│   └── utils/
├── index.js
└── App.tsx
```

## Performance Monitor

An overlay of performance details, e.g. frames-per-second (FPS), can be shown using the Developer Menu on a debugging version of a React Native app. This can be accessed by **shaking** the device, and selecting **Show Perf Monitor**.

More information is available on the following links, e.g. shake gesture shortcuts for emulators:

- https://reactnative.dev/docs/debugging
- https://reactnative.dev/docs/performance

## Disclaimer

> This repository was built from an already-existing codebase (_also developed by me_), which did not have a Git history. As such, some commits to this repository may appear to be artificial, unnatural, or unusual.

&nbsp;

> The original, now-defunct version of this project was built in Python & Kivy/MD.

<!--
## Extensions
- React Native Tools
- ES7 + React/Redux/React-Native snippets

## TODO
- Separate styles from component definitions
- Release an APK
-->
