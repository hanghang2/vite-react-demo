import styles from '../index.module.scss';
import { useEffect } from 'react';
import { Button } from 'antd';

const ContextMenu = ({ list, setList, menu, setMenu }) => {
    useEffect(() => { // 点击其他地方关闭菜单
        const onClick = () => {
            setMenu({ show: false });
        };
        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('click', onClick);
        };
    }, []);
    // 添加子节点
    const addChild = () => {
        setList([
            ...list,
            {
                pid: list[menu.i].id,
                id: new Date().getTime(),
                x: list[menu.i].x + 200,
                y: list[menu.i].y,
                t: '子节点',
            },
        ]);
    };
    // 添加同级节点
    const addSibling = () => {
        setList([
            ...list,
            {
                pid: list[menu.i].pid,
                id: new Date().getTime(),
                x: list[menu.i].x,
                y: list[menu.i].y + 100,
                t: '同级节点',
            },
        ]);
    };
    return (
        <div className={styles.menus} style={menu.style}>
            <div className={styles.menu}>
                <Button onClick={addChild} type="link">
                    添加子节点
                </Button>
            </div>
            <div className={styles.menu}>
                <Button onClick={addSibling} type="link">
                    添加同级节点
                </Button>
            </div>
            <div className={styles.menu}>
                <Button type="link">
                    删除节点
                </Button>
            </div>
        </div>
    );
};

export default ContextMenu;
