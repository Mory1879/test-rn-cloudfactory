# Crypto Quotes App

## Overview

This is a simple React Native application that fetches and displays cryptocurrency quotes data from the Poloniex API.

The app uses MobX for state management and RxJS for handling asynchronous operations. In addition, it uses the Expo framework for simplifying the build process.

## Features

- Fetches real-time cryptocurrency quotes from the Poloniex public API
- Displays quotes data in a simple and clean interface
- Updates the data automatically every 5 seconds
- Uses MobX for state management, allowing for reactive UI updates
- Uses RxJS for handling fetch operations, ensuring a smooth user experience

## Getting Started

1. Install dependencies: Run `npm install` or `yarn install` in the project directory.
2. Start the development server: Run `npm start` or `yarn start`.
3. Open the Expo app on your phone and scan the QR code from your terminal or browser. 

## Building

To build the app for production, use the following command:

```bash
expo build:android
```

For iOS, use:

```bash
expo build:ios
```

## These commands will create a standalone app that you can distribute on the App Store and Google Play Store.

NPM Scripts
- `start`: Starts the Expo development server.
- `android`: (Requires an Android device connected or emulator installed) Starts the development server and loads the app on the Android device/emulator.
- `ios`: (Requires an iOS device connected or Xcode installed) Starts the development server and loads the app on the iOS device/simulator.
- `web`: Starts the development server and opens the app in a web browser.
- `eject`: Ejects the app from Expo. Note: Once you eject, you can’t go back!
- `lint`: Runs ESLint to check for any linting errors in the codebase.
- `prettier`: Formats the codebase using Prettier to ensure consistent code style.