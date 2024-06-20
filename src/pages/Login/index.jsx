import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            login
            <button onClick={() => navigate('/Page')}>page</button>
            <div className={`${styles.title} flexCC m-20`}>
                login
            </div>
            <div className={styles.span}>span</div>
        </div>
    );
};

export default Login;
