// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from "./store/index.js";
import { Provider } from "react-redux";
import './assets/iconfont/iconfont.js';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
  // </StrictMode>,// 关闭严格模式，否则useEffect执行两遍
)
