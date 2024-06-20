import { Outlet, useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Main</h1>
            <div>
                <button onClick={() => navigate('/Login')}>login</button>
                <button onClick={() => navigate('/Demo')}>demo</button>
                <button onClick={() => navigate('/Page')}>page</button>
                <button onClick={() => navigate('/Child')}>child</button>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};
export default Main;
