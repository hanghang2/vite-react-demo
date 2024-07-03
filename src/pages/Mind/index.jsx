import styles from './index.module.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

const boxOptions = {
    w: 100,
    h: 50,
};
const defaultData = [
    {
        id: 1,
        x: 100,
        y: 100,
        t: '根元素',
    },
];
const Mind = () => {
    const mouseDownData = useRef({
        isDown: false, // 鼠标是否按下
        i: -1, // 当前按下的元素索引
    });
    const [data, setData] = useState(defaultData); // 数据
    // 鼠标按下
    const handleMouseDown = (e, i) => {
        e.button === 0 && (mouseDownData.current = {
            isDown: true,
            i,
        });
    };
    // 鼠标移动
    const handleMouseMove = (e) => {
        if (!mouseDownData.current.isDown) { return }
        setData(data.map((item, i) => {
            if (i === mouseDownData.current.i) {
                return {
                    ...item,
                    x: e.clientX - boxOptions.w / 2,
                    y: e.clientY - boxOptions.h / 2,
                };
            }
            return item;
        }));
    };
    // 鼠标抬起
    const handleMouseUp = () => {
        mouseDownData.current = {
            isDown: false,
            i: -1,
        };
    };
    // 右键菜单
    const [menu, setMenu] = useState({});
    const handleContextMenu = (e, i) => {
        e.preventDefault();
        setMenu({
            i,
            show: true,
            style: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    };
    useEffect(() => { // 点击其他地方关闭菜单
        const onClick = () => {
            setMenu({ show: false });
        };
        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('click', onClick);
        };
    }, []);

    // 获取连线路径
    const getPath = (x, y, pid) => {
        const parent = data.find(item => item.id === pid);
        return `M ${x} ${y + boxOptions.h / 2} L ${parent.x + boxOptions.w} ${parent.y + boxOptions.h / 2}`;
    };
    // 编辑文本
    const editText = (i) => {
        const text = prompt('请输入文本', data[i].t);
        if (text) {
            setData(data.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        t: text,
                    };
                }
                return item;
            }));
        }
    };
    // 添加子节点
    const addChild = () => {
        setData([
            ...data,
            {
                pid: data[menu.i].id,
                id: new Date().getTime(),
                x: data[menu.i].x + 200,
                y: data[menu.i].y,
                t: '子节点',
            },
        ]);
    };
    // 添加同级节点
    const addSibling = () => {
        setData([
            ...data,
            {
                pid: data[menu.i].pid,
                id: new Date().getTime(),
                x: data[menu.i].x,
                y: data[menu.i].y + 100,
                t: '同级节点',
            },
        ]);
    };
    return (
        <div className={styles.box} onMouseMove={handleMouseMove}>
            {
                menu.show ? (
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
                ) : null
            }
            <svg className={styles.svg}>
                {
                    data.map(({ x, y, t, pid, id }, i) => (
                        <Fragment key={id}>
                            {/* 连线*/}
                            {
                                pid ? (
                                    <path
                                        className={styles.line}
                                        d={getPath(x, y, pid)}
                                    />
                                ) : null
                            }
                            <foreignObject
                                height={boxOptions.h}
                                onContextMenu={e => handleContextMenu(e, i)}
                                onMouseDown={e => handleMouseDown(e, i)}
                                onMouseMove={e => e.preventDefault()}
                                onMouseUp={handleMouseUp}
                                width={boxOptions.w}
                                x={x}
                                y={y}
                            >
                                <div
                                    className={styles.text}
                                    onDoubleClick={() => editText(i)}
                                >
                                    {t}
                                </div>
                            </foreignObject>
                        </Fragment>
                    ))
                }
            </svg>
        </div>
    );
};
export default Mind;
