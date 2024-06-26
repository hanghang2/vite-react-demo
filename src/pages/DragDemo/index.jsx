import { useRef, useState } from 'react';

const DragDemo = () => {
    const [list, setList] = useState([1, 2, 3, 4, 5, 6]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const enterRef = useRef(null);
    const onDragStart = () => {
        console.log('拖动开始');
    };
    const onDragEnter = e => {
        if (!enterRef.current) { // 拖动进入区域
            setList([...list, 'add']);
        }
        enterRef.current = e.target;
    };
    const onDragLeave = e => {
        if (enterRef.current === e.target) { // 拖动离开区域
            enterRef.current = null;
            setList(list.filter(item => item !== 'add'));
        }
    };
    const onDrop = e => { // 放置到区域
        setList(list.map(item => item === 'add' ? `add${list.length}` : item));
        enterRef.current = null;
    };
    const onItemEnter = (i) => {
        const curIndex = list.indexOf('add');
        if (curIndex === i || curIndex === -1) {
            return;
        }
        // 拖动到item
        const newList = [...list];
        newList.splice(i, 0, newList.splice(curIndex, 1)[0]);
        setList(newList);
    };
    return (
        <>
            <div
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
                style={{ border: '1px solid #ccc', width: 300 }}
            >
                放置区域
                {
                    list.map((item, i) => (
                        <div key={item} onDragEnter={() => onItemEnter(i)} style={{ border: '1px solid #ccc', margin: 10, height: 50 }}>
                            {item}
                        </div>
                    ))
                }
            </div>
            <div draggable="true" onDragStart={onDragStart}>拖动我</div>
        </>
    );
};

export default DragDemo;
