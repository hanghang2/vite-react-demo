import { useRef } from 'react';
import { isCollision } from '@/utils/calc-position.js';

const useMove = ({ list, setList, boxRef }) => {
    const mouseDownData = useRef({
        isDown: false, // 鼠标是否按下
        i: -1, // 当前按下的元素索引
    });
    // 鼠标按下
    const handleMouseDown = (e, i) => {
        e.button === 0 && (mouseDownData.current = { isDown: true, i, x: list[i].x, y: list[i].y });
    };
    // 鼠标移动
    const handleMouseMove = (e) => {
        if (!mouseDownData.current.isDown) { return }
        setList(list.map((item, i) => {
            if (i === mouseDownData.current.i) {
                return {
                    ...item,
                    x: e.clientX - item.w / 2 + boxRef.current?.scrollLeft,
                    y: e.clientY - item.h / 2 + boxRef.current?.scrollTop,
                };
            }
            return item;
        }));
    };
    // 鼠标抬起
    const handleMouseUp = (e) => {
        if (e.button !== 0 || !list[mouseDownData.current.i]) {
            return;
        }
        // 碰撞检测
        if (isCollision(list[mouseDownData.current.i], list)) { // 有碰撞恢复原位
            setList(list.map((item, i) => {
                if (i === mouseDownData.current.i) {
                    return {
                        ...item,
                        x: mouseDownData.current.x,
                        y: mouseDownData.current.y,
                    };
                }
                return item;
            }));
        }
        mouseDownData.current = { isDown: false, i: -1 };
    };
    return {
        handleMouseDown, // 鼠标按下
        handleMouseMove, // 鼠标移动
        handleMouseUp, // 鼠标抬起
    };
};

export default useMove;
