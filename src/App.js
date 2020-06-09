import React from 'react';
import logo from './logo.svg';
import './App.css';

import GoogleMaps from './components/customMap'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GoogleMaps />
    </div>
  );
}

export default App;
