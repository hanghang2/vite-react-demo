import { useRef, useState } from 'react';

// 表单元素拖拽 hook
const useFormTagDrag = ($event) => {
    const [formItems, setFormItems] = useState([]); // 表单项
    const [isDrag, setIsDrag] = useState(false); // 是否拖拽在区域内

    const dragData = useRef(null); // 拖拽数据
    const enterRef = useRef(null); // 拖拽进入区域的元素
    const onDragEnter = e => {
        if (!dragData.current) { return }
        if (!enterRef.current) { // 拖动进入区域
            setFormItems([...formItems, dragData.current]);
            setIsDrag(true);
        }
        enterRef.current = e.target;
    };
    const onDragLeave = e => {
        if (enterRef.current === e.target) { // 拖动离开区域
            enterRef.current = null;
            setFormItems(formItems.filter(item => !item.isDrag));
            setIsDrag(false);
        }
    };

    const onItemEnter = (i) => { // 拖动到item
        const curIndex = formItems.indexOf(dragData.current);
        if (curIndex === i || curIndex === -1) {
            return;
        }
        // 拖动到item
        const newList = [...formItems];
        newList.splice(i, 0, newList.splice(curIndex, 1)[0]);
        setFormItems(newList);
    };
    const onDrop = () => { // 放置到区域
        enterRef.current = null;
        setFormItems(formItems.map(item => ({ ...item, isDrag: false })));
        dragData.current = null;
        setIsDrag(false);
    };

    // 事件订阅
    $event.useSubscription(([type, data]) => {
        data = data ? JSON.parse(JSON.stringify(data)) : {};
        if (type === 'onDragStart') { // 拖拽开始 记录
            dragData.current = {
                ...data,
                isDrag: true,
                id: new Date().getTime(),
            };
        } else if (type === 'onTagClick') { // 点击tag 新增
            setFormItems([...formItems, { ...data, id: new Date().getTime() }]);
        }
    });
    // 删除
    const onDelItem = (i) => {
        setFormItems(formItems.filter((_, index) => index !== i));
    };

    return {
        onDragEnter, // 拖拽进入
        onDragLeave, // 拖拽离开
        onItemEnter, // 拖动到item
        onDrop, // 放置到区域
        onDelItem, // 删除
        formItems, // 表单项
        setFormItems, // 设置表单项
        isDrag, // 是否拖拽在区域内
    };
};

export default useFormTagDrag;
