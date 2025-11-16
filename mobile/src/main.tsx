import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// If running under Cordova, wait for deviceready for safety
function boot() {
  const container = document.getElementById('root');
  if (!container) return;
  const root = createRoot(container);
  root.render(<App />);
}

if ((window as any).cordova) {
  document.addEventListener('deviceready', boot, false);
} else {
  boot();
}