import styles from './index.module.scss';
import { useMemo, useRef, useState } from 'react';
import Cell from './components/Cell.jsx';
import useMove from './hooks/useMove.jsx';
import ContextMenu from '@/pages/Mind/components/ContextMenu.jsx';

const defaultData = [
    {
        id: 1,
        x: 100,
        y: 100,
        t: '根元素',
    },
];
const Mind = () => {
    const [list, setList] = useState(defaultData); // 数据
    const boxRef = useRef(null);
    const {
        handleMouseDown, // 鼠标按下
        handleMouseMove, // 鼠标移动
        handleMouseUp, // 鼠标抬起
    } = useMove({ list, setList, boxRef });

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
    // 计算svg宽高
    const svgWH = useMemo(() => {
        return {
            width: (Math.max(...list.map(item => item.x + item.w)) || 0) + 20,
            height: (Math.max(...list.map(item => item.y + item.h)) || 0) + 20,
        };
    }, [list]);
    return (
        <div className={styles.box} onMouseMove={handleMouseMove} ref={boxRef}>
            {
                menu.show ? (
                    <ContextMenu
                        list={list}
                        menu={menu}
                        setList={setList}
                        setMenu={setMenu}
                    />
                ) : null
            }
            <svg className={styles.svg} style={svgWH}>
                {
                    list.map((item, i) => (
                        <Cell
                            {...item}
                            handleContextMenu={handleContextMenu}
                            handleMouseDown={handleMouseDown}
                            handleMouseUp={handleMouseUp}
                            i={i}
                            key={item.id}
                            list={list}
                            setList={setList}
                        />
                    ))
                }
            </svg>
        </div>
    );
};
export default Mind;
