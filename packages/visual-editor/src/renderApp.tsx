import React from 'react';
import ReactDOM from 'react-dom/client';
import { VisualEditorRoot } from './components/VisualEditorRoot';
import './global.css';

ReactDOM.createRoot(document.getElementById('cf-visual-editor')!).render(
  <React.StrictMode>
    <VisualEditorRoot />
  </React.StrictMode>
);
