import { Route, Routes, HashRouter } from 'react-router-dom';
import NotDefined from '@/pages/NotDefined';
import Login from '@/pages/Login';
import Main from '../Main';
import Page from '@/pages/Page';
import Demo from '@/pages/Demo';
import Child from '@/pages/Child';
import FormEdit from '@/pages/FormEdit'; // 表单设计器
import FormView from '@/pages/FormView'; // 表单查看
import DragDemo from '@/pages/DragDemo'; // 拖拽示例
import Gobang from '@/pages/Gobang'; // 五子棋

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Login/>} path='/Login'/>
                <Route element={<FormEdit/>} path='/FormEdit'/>
                <Route element={<FormView/>} path='/FormView'/>
                <Route element={<DragDemo/>} path='/DragDemo'/>
                <Route element={<Gobang/>} path='/Gobang'/>
                <Route element={<Main/>} path="/">
                    <Route element={<Page/>} path='Page'/>
                    <Route element={<Demo/>} path='Demo'/>
                    <Route element={<Child/>} path='Child'/>
                    <Route element={<NotDefined/>} path="*"/>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default Router;
