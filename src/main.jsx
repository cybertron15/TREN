import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@radix-ui/themes/styles.css';
import './resorces/loading-bar/dist/loading-bar.js'
import './resorces/loading-bar/dist/loading-bar.css'

import { Theme, ThemePanel } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme>
    <App />
    </Theme>
  </React.StrictMode>,
)
