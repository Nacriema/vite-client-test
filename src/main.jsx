import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js'
import { Provider } from 'react-redux';
import  AppContextCanvasProvider from './components/hooks/contextCanvas';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppContextCanvasProvider>
      <App />
    </AppContextCanvasProvider>
  </Provider>,
)
