import { Route, Routes, HashRouter } from 'react-router-dom';
import Main from '../Main';
import Login from '@/pages/Login';
import Page from '@/pages/Page';
import Demo from '@/pages/Demo';
import NotDefined from '@/pages/NotDefined';

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Login/>} path='/Login'/>
                <Route element={<Main/>} path="/">
                    <Route element={<Page/>} path='Page'/>
                    <Route element={<Demo/>} path='Demo'/>
                    <Route element={<NotDefined/>} path="*"/>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default Router;
