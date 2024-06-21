import { useRef, useState } from 'react';

let eleId = 0;
// 表单元素拖拽 hook
const useFormTagDrag = ($event) => {
    const boxRef = useRef(null); // 拖拽区域
    const [formItems, setFormItems] = useState([]); // 表单项
    const [dragData, setDragData] = useState(null); // 拖拽数据
    // 拖拽到区域
    const onDragOver = (e) => {
        e.preventDefault();
        if (boxRef.current === e.target) { // 在区域上
            const newList = [...formItems];
            const curIndex = newList.indexOf(dragData);
            if (curIndex === -1) {
                setFormItems([...newList, dragData]); // 插入
            } else {
                const curItem = newList.splice(curIndex, 1); // 删除
                setFormItems([...newList, curItem[0]]); // 插入到最后
            }
        }
    };
    // 拖拽到form item区域
    const onFormItemDrag = (i) => {
        const newList = [...formItems];
        formItems.indexOf(dragData) === -1 && newList.push(dragData); // 没有的话，插入
        const curIndex = formItems.indexOf(dragData);
        if (i === curIndex) { return } // 位置不变
        const curItem = newList.splice(curIndex, 1); // 删除
        newList.splice(i, 0, curItem[0]); // 插入
        setFormItems(newList);
    };
    // 拖拽结束
    const onDrop = () => {
        setFormItems(formItems.map(item => ({ ...item, isDrag: false })));
        setDragData(null);
    };
    // 事件订阅
    $event.useSubscription(([type, data]) => {
        data = data ? JSON.parse(JSON.stringify(data)) : {};
        if (type === 'onDragStart') { // 拖拽开始 记录
            data.id = eleId++;
            data.isDrag = true;
            setDragData(data);
        } else if (type === 'onDragEnd') { // 拖拽结束 清除
            setDragData(null);
            setFormItems(formItems.filter(item => !item.isDrag));
        } else if (type === 'onTagClick') { // 点击tag 新增
            data.id = eleId++;
            setFormItems([...formItems, data]);
        }
    });
    return {
        onDragOver, // 拖拽到区域
        onFormItemDrag, // 拖拽到form item区域
        onDrop, // 拖拽结束
        boxRef,
        formItems,
        isDrag: dragData ? true : false,
    };
};

export default useFormTagDrag;
