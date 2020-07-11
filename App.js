/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import GalleryScene from './src/gallery.scene'
import DrawPadScene from './src/drawpad.scene'

import { Stack ,Router, Scene } from 'react-native-router-flux';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="GALLERY" component={GalleryScene} title="Gallery" />
      <Scene key="DRAW" hideNavBar component={DrawPadScene} title="Draw on me..." />
    </Stack>
  </Router>
);

export default App;

