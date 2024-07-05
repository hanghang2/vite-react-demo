import styles from '../index.module.scss';
import { useEffect } from 'react';
import { Button } from 'antd';
import { getNotePosition } from '@/utils/calc-position.js';

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
        const childNote = getNotePosition(list[menu.i], list, list[menu.i].x + list[menu.i].w + 80, list[menu.i].y);
        setList([
            ...list,
            {
                pid: list[menu.i].id,
                id: new Date().getTime(),
                ...childNote,
                t: `子节点${list.filter(item => item.pid === list[menu.i].id).length + 1}`,
            },
        ]);
    };
    // 添加同级节点
    const addSibling = () => {
        const siblingNote = getNotePosition(list[menu.i], list, list[menu.i].x, list[menu.i].y + list[menu.i].h + 20);
        setList([
            ...list,
            {
                pid: list[menu.i].pid,
                id: new Date().getTime(),
                ...siblingNote,
                t: `同级节点${list.filter(item => item.pid === list[menu.i].pid).length}`,
            },
        ]);
    };
    // 删除节点
    const onDelete = () => {
        const id = list[menu.i].id;
        setList(list.filter(item => item.id !== id && item.pid !== id)); // 删除当前节点和子节点
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
            {
                list.length === 1 ? null : (
                    <div className={styles.menu}>
                        <Button onClick={onDelete} type="link">
                            删除节点
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default ContextMenu;
