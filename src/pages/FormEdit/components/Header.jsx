import styles from '../index.module.scss';
import { Button, Space } from 'antd';

const Header = () => {
    return (
        <div className={`${styles.header} d-flex justify-content-end p-x-30`}>
            <Space>
                <Button>清空</Button>
                <Button type="primary">发布</Button>
            </Space>
        </div>
    );
};

export default Header;
