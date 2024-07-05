import styles from '../index.module.scss';
import Line from './Line.jsx';
import useSize from '@/hooks/useSize.jsx';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'ahooks';
import { EditOutlined } from '@ant-design/icons';

const Cell = ({
    x, // x坐标
    y, // y坐标
    t, // 文本
    pid, // 父节点id
    i, // 索引
    list, // 脑图数据
    setList, // 设置脑图数据
    handleMouseDown, // 鼠标按下
    handleMouseUp, // 鼠标抬起
    handleContextMenu, // 右键菜单
}) => {
    const textRef = useRef(null);
    const { width, height } = useSize(textRef);
    const [isEdit, setIsEdit] = useState(false);
    // 编辑文本
    const editText = (e) => {
        e.stopPropagation();
        setIsEdit(true);
        textRef.current.focus();
        textRef.current.selectionEnd = t.length;
    };
    // 文本改变
    const handleChange = (e) => {
        setList(list.map((item, index) => {
            if (index === i) {
                return {
                    ...item,
                    t: e.target.innerText,
                };
            }
            return item;
        }));
    };
    useClickAway(() => { // 点击外部
        setIsEdit(false);
    }, textRef);
    useEffect(() => { // 更新宽高
        setList(list.map((item, index) => {
            if (index === i) {
                return {
                    ...item,
                    w: width,
                    h: height,
                };
            }
            return item;
        }));
    }, [width, height]);
    return (
        <>
            {/* 连线*/}
            {
                pid ? (
                    <Line
                        h={height}
                        list={list}
                        pid={pid}
                        w={width}
                        x={x}
                        y={y}
                    />
                ) : null
            }
            {/* onDoubleClick={() => editText(i)}*/}
            <foreignObject
                height={height}
                onContextMenu={e => handleContextMenu(e, i)}
                onMouseDown={e => !isEdit && handleMouseDown(e, i)}
                onMouseMove={e => e.preventDefault()}
                onMouseUp={handleMouseUp}
                width={width}
                x={x}
                y={y}
            >
                <div className={styles.cellBox}>
                    <div
                        className={`${styles.text} ${!pid ? styles.isTop : ''} ${isEdit ? styles.edit : ''}`}
                        contentEditable='plaintext-only'
                        dangerouslySetInnerHTML={{ __html: t }}
                        onBlur={handleChange}
                        ref={textRef}
                        style={{ pointerEvents: isEdit ? 'auto' : 'none' }}
                    >
                    </div>
                    {
                        isEdit ? null : <EditOutlined className={styles.editIcon} onMouseDown={e => editText(e, i)}/>
                    }
                </div>
            </foreignObject>
        </>
    );
};

export default Cell;
