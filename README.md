<p align='center'>
  <h1 align='center'>Tarteel</h1>
  <p align='center'><img width='150' src='https://raw.githubusercontent.com/bahaa96/Tarteel-frontend/master/public/logo-3x.png' /></p>
  <p align='center'>
    Tarteel is an open-source project designed to help build digital tools to analyze the recitation of the Quran. Given the important place of reciting the Quran in the lives of Muslims, it is important to build software tools that can help ordinary Muslims recite the Quran with greater accuracy and appreciation. The name tarteel comes from the Quran itself, where God commands us to "recite the Quran with tarteel (slow, measured rhythmic tones)" (73:4).
  </p>
</p>

## 👋 Intro
This repo is the frontend for <a href="tarteel.io" target="_blank">Tarteel.io</a>, a server-side rendered Progressive Web App built using [React](https://github.com/facebook/react), [Redux](https://github.com/reduxjs/redux), [Express](https://github.com/expressjs/express), [Webpack](https://github.com/webpack), and [styled-components](https://github.com/styled-components/styled-components). The architecture is inspired by Quran.com's <a href="https://github.com/quran/quran.com-frontend" target="_blank">frontend repo</a>

## ✨ Features
<ul>
  <li> Recitation Collection </li>
  <li> Ayah Evaluation</li>
  <li> Dataset Download </li>
  <li> Ayah Recognition </li>
  <li> Recitation Correction (soon!)</li>
</ul>

## 🎯 Target
We set targets for Ayahs recitation numbers, Our last target was collecting <b>50,000</b> recitations. Now we're trying to get those evaluated (<a href="https://tarteel.io/about" target="_blank">view progress</a>).

## 🔧 Getting started
To start developing, you'll first need to get the Tarteel [api server](https://github.com/Tarteel-io/tarteel.io) running locally. We require this to avoid submitting testing ayahs to production (and for us to experiment with backend changes).

#### Installation
```bash
git clone https://github.com/Tarteel-io/tarteel-frontend.git tarteel-frontend
cd tarteel-frontend
yarn
yarn dev
```

#### Build
```bash
yarn build
yarn build:dev
```

#### Linters & Formatting
```bash
yarn lint
yarn format:src
yarn format:config
yarn format:internal
```
Format only staged files
```bash
yarn precommit
```

## 🔨 Contributing
If you want to start contributing to any of the Tarteel projects, please [contact us](https://tarteel.io/contact). In the meantime, feel free to pick up any of the open issues and assign it to yourself or create a PR for any bugs you encounter.

To create a PR, branch off `master` and include your name and the feature name following this pattern: `yourname/feature_name`

## 💸 Donate:
You can contribute to our server costs, marketing and other expenses. If you're interested in donating, please [contact us](https://tarteel.io/contact)!

## 😇 Sharing Tarteel:
You'll be contributing to our mission in many ways by sharing tarteel: getting more recordings, PR, and potentially getting donations + volunteers. Feel free to share it on your personal timeline or in different groups / email lists.

## 🛣 License
<a href="https://github.com/Tarteel-io/tarteel-frontend/blob/master/LICENSE">MIT</a>

## Notes
<ul>
 <li>
  We have a problem with Now.sh in the assets that are contains capital letters so for now please rename any asset file to be in lowercase
 </li>
</ul>
