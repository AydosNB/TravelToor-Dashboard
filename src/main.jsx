import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { I18nextProvider } from 'react-i18next'
import i18n from "./config/i18next.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
)
