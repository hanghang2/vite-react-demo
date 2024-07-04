import { useRef } from 'react';

const useMove = ({ list, setList, boxRef }) => {
    const mouseDownData = useRef({
        isDown: false, // 鼠标是否按下
        i: -1, // 当前按下的元素索引
    });
    // 鼠标按下
    const handleMouseDown = (e, i) => {
        e.button === 0 && (mouseDownData.current = { isDown: true, i });
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
    const handleMouseUp = () => {
        mouseDownData.current = { isDown: false, i: -1 };
    };
    return {
        handleMouseDown, // 鼠标按下
        handleMouseMove, // 鼠标移动
        handleMouseUp, // 鼠标抬起
    };
};

export default useMove;
