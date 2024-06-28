import ReactDOM from 'react-dom/client';
import Router from './layouts/Router';
import './assets/style/index.scss';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn'); // 日期类组件设置中文
ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={zhCN}>
        <Router />
    </ConfigProvider>,
);
