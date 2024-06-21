import { useRef, useState, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, Input } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';
import useFormTagDrag from './useFormTagDrag';
import { formItemData } from '@/utils/form-item-data.jsx';

// 表单项
const FormItem = ({ data, onDragover }) => {
    const FormItem = formItemData[data.value]?.component || Fragment;
    return (
        <div
            className={styles.formItem}
            onDragOver={onDragover}
            style={{ width: '50%' }}
        >
            <FormItem />
        </div>
    );
};
// 拖拽标签
const TagDrag = ({ data, onDragover }) => {
    if (!data) {
        return null;
    }
    return (
        <div
            className={styles.dragTag}
            onDragOver={onDragover}
            style={{ width: '50%' }}
        >
            <Button
                className={styles.tag}
                draggable="true"
                ghost
                type="primary"
            >
                <DragOutlined />
                {data.label}
            </Button>
        </div>
    );
};
const MainFormContent = ({ $event }) => {
    const {
        onDragOver, // 拖拽到区域
        onDrop, // 拖拽结束
        onFormItemDrag, // 拖拽到form item区域
        formItems, // 表单项
        boxRef, // 拖拽区域
        isDrag, // 是否拖拽
    } = useFormTagDrag($event);
    // onDrop 拖拽结束
    // onDragOver 拖拽到区域
    return (
        <div className={styles.mainFormContent}>
            <Scrollbars autoHide>
                <div
                    className={styles.bg}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    ref={boxRef}
                >
                    <div className={`${styles.box} ${isDrag ? styles.isDrag : ''}`}>
                        {
                            formItems.map((item, i) =>
                                item.isDrag ?
                                    <TagDrag
                                        data={item}
                                        key={item.id}
                                        onDragover={() => onFormItemDrag(i)}
                                    /> :
                                    <FormItem
                                        data={item}
                                        key={item.id}
                                        onDragover={() => onFormItemDrag(i)}
                                    />,
                            )
                        }
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
};

export default MainFormContent;
