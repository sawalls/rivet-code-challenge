# Schala Walls's RIVET coding challenge solution

This is a partially completed solution to the coding challenge given to me by Alan et al. It's a CRA app so all the regular CRA things apply.

It's always very important to me that browser history and URLs function correctly even in a single page app, so I've made use of [React Router](https://reactrouter.com/en/main). That led to some pretty specific implementation details so feel free to ask any questions.

An easy room for improvement while I'm in the office is adding much more styling. I focused on getting the basic functional elements down, and having only 3 days of programming meant MUI ended up being the main thing left out. However, I'm very open to expanding any part of the app! Another point of expansion might be using the [RTK Query API](https://redux-toolkit.js.org/rtk-query/overview) instead of AsyncThunks, or other more idiomatic React Toolkit usage.

## Installation / Setup

Tested on node `v22.13.0` and npm `11.0.0`. Install with:

### `npm install`

This will give you `react-router-dom` in particular, which is a new dependency.

## How to run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
