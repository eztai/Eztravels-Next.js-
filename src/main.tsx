
import { AppRegistry } from 'react-native';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register the app
AppRegistry.registerComponent('App', () => App);

// Web-specific setup
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});

// Fallback for React 18
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById("root");
  if (rootTag) {
    createRoot(rootTag).render(<App />);
  }
}
