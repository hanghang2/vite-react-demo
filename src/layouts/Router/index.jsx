import { Route, Routes, HashRouter } from 'react-router-dom';
import NotDefined from '@/pages/NotDefined';
import Login from '@/pages/Login';
import Main from '../Main';
import Page from '@/pages/Page';
import Demo from '@/pages/Demo';
import Child from '@/pages/Child';

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Login/>} path='/Login'/>
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
