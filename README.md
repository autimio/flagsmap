# Flasgs Map

## About The Project

It is a proof of concept regarding mobile development. The goal is to manipulate GEOJson data and activities in the background.

## What was done

For the map presentation I used the Mapbox SDK. I used shapes with the positions of some countries and their relative flags. To perform the background activities every 3 minutes I used the React Native Background Timer library, in calls except the current position of the device in a storage location for record simulation.

### Built With:

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Programming language.
- [React Native](https://reactnative.dev/) - React Native is a Javascript library created by Facebook.

##### Libraries

- [Mapbox](https://www.mapbox.com/) - Mapbox is an American provider of personalized online maps for websites and apps like Foursquare, Lonely Planet, Facebook, Financial Times, The Weather Channel and Snapchat.

- [React Native Background Timer](https://github.com/ocetnik/react-native-background-timer) - Emit event periodically (even when app is in the background).

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

In order to run this project locally you will need to:

- Clone and install this repository

```sh
git clone https://github.com/autimio/flagsmap
```

### Installation

1. Install: Yarn install is used to install all dependencies for a project.

```sh
yarn install
```

3. Run the app

- IOS

```sh
yarn ios
```

- Android

```sh
yarn android
```

### Demo

![flagsmap](https://github.com/autimio/flagsmap/blob/master/example/demo.gif)
