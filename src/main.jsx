import ReactDOM from 'react-dom/client';
import Router from './layouts/Router';
import './assets/style/index.scss';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={zhCN}>
        <Router />
    </ConfigProvider>,
);
