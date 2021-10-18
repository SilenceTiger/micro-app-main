import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';

// import { registerMicroApps } from 'qiankun';
// TODO 动态注册 判断环境
// registerMicroApps([
//   {
//     name: 'react-app',
//     entry: process.env.NODE_ENV === 'development' ? '//localhost:4001/apps/app-react/' : '//localhost:8080/apps/app-react/',
//     container: '#third-app-container',
//     activeRule: '/main/app-react'
//   }
// ]);

// setDefaultMountApp('/app-react');
// 启动 qiankun
// start();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
