import { notification } from 'antd';
import axios from 'axios';
import Qs from 'qs';
import globalStore from '../store/global';

axios.defaults.withCredentials = false; // 允许发送缓存等信息到接口

// 实例化axios
const axiosInstance = axios.create({
    timeout: 600000,
    responseType: 'json',
    headers: {
        'Client-Id': 'admin-portal',
    },
    // 请求前数据拦截处理
    transformRequest: [(data, config) => config?.dataType === 'json' ? data : Qs.stringify(data)],
});

const loading = {
    // 请求、响应计数
    num: 0,
    // 显示加载
    show() {
        setTimeout(() => { // 请求loading小于500ms不显示
            // show loading
            this.num && globalStore.setLoading(true);
        }, 500);
        this.num++;
    },
    // 隐藏加载
    hide() {
        this.num--;
        this.num = this.num < 0 ? 0 : this.num;
        setTimeout(() => { // 避免两个连续请求闪烁
            // hide loading
            this.num === 0 && globalStore.setLoading(false);
        });
    },
};

/** 异常处理程序 */
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
// 请求拦截
const BASE_URL = import.meta.env.MODE === 'development' ? window.BASE_URL.dev : window.BASE_URL.prod;
axiosInstance.interceptors.request.use(config => {
    if (globalStore.accessToken) {
        config.headers.Authorization = `Bearer ${globalStore.accessToken}`; // 请求头加token
    }
    if (config.url.indexOf('http') !== 0) {
        config.url = BASE_URL.http + config.url;
    }
    return config;
}, error => Promise.reject(error));

// 响应拦截
axiosInstance.interceptors.response.use(function(response) {
    if (response.data.code === 'chipnet_gateway_auth_006' || // accessToken无效
        response.data.code === 'chipnet_gateway_auth_009' // 校验token失败
    ) {
        notification.error({
            key: 'system',
            placement: 'top',
            message: `登陆过期`,
        });
        globalStore.setToken('');
        return Promise.reject(response);
    } else if (response.data?.code !== '0') {
        notification.error({
            key: 'system',
            placement: 'top',
            message: `请求错误`,
            description: response.data?.msg,
        });
        return Promise.reject(response);
    }
    return response.data.data;
}, error => {
    const errorText = codeMessage[error?.response?.status] || error?.response?.statusText;
    notification.error({
        key: 'system',
        placement: 'top',
        message: `请求错误 ${error?.response?.status || ''}: ${error?.response?.url || ''}`,
        description: errorText,
    });
    return Promise.reject(error);
});

const handleHttp = (axiosReq, show = true) => {
    return new Promise((resolve, reject) => {
        show && loading.show();
        axiosReq.then((response) => {
            show && loading.hide();
            resolve(response);
        }).catch(() => {
            show && loading.hide();
            reject();
        });
    });
};

export default {
    getHttp: (url, params, showLoading) => handleHttp(
        axiosInstance.get(url, {
            params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Chipnet-Version': '20240510',
            },
        }),
        showLoading,
    ),
    postHttp: (url, params, showLoading) => handleHttp(
        axiosInstance.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Chipnet-Version': '20240510',
            },
        }),
        showLoading,
    ),
    postJsonHttp: (url, params, showLoading) => handleHttp(
        axiosInstance.post(url, JSON.stringify(params), {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'dataType': 'json',
                'Chipnet-Version': '20240510',
            },
        }),
        showLoading,
    ),
    postFormHttp: (url, params, showLoading) => handleHttp(
        axiosInstance.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Chipnet-Version': '20240510',
            },
            transformRequest: [function(data) {
                return data;
            }],
        }),
        showLoading,
    ),
    formSubmit: (url, data = {}, method = 'GET') => {
        data.token = globalStore.accessToken;
        const body = document.getElementsByTagName('body')[0];
        const form = document.createElement('form');
        form.method = method;
        form.action = url;
        if (url.indexOf('http') !== 0) {
            form.action = BASE_URL.http + url;
        }
        form.target = '_self'; // 打开新窗口
        for (const key in data) {
            if (data[key] !== undefined) {
                const param = document.createElement('input');
                param.type = 'hidden';
                param.name = key;
                param.value = data[key];
                form.appendChild(param);
            }
        }
        body.appendChild(form);
        form.submit();
        body.removeChild(form);
    },
};

