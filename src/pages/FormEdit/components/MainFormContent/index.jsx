import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, Modal } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';
import useFormTagDrag from './useFormTagDrag';
import FormHeader from './FormHeader.jsx';
import FormItem from './FormItem.jsx';

// 拖拽标签
const TagDrag = ({ data, onDragEnter }) => {
    if (!data) {
        return null;
    }
    return (
        <div
            className={styles.dragTag}
            onDragEnter={onDragEnter}
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

const MainFormContent = ({ $event, $eventFI }) => {
    const {
        onDragEnter, // 拖拽进入
        onDragLeave, // 拖拽离开
        onItemEnter, // 拖动到item
        onDrop, // 放置到区域
        onDelItem, // 删除
        formItems, // 表单项
        isDrag, // 是否拖拽在区域内
    } = useFormTagDrag($event);
    const [modal, contextHolder] = Modal.useModal();
    const [editId, setEditId] = useState(null); // 编辑的表单项id
    return (
        <div className={styles.mainFormContent}>
            {contextHolder}
            <Scrollbars autoHide>
                <div
                    className={styles.bg}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDragOver={e => e.preventDefault()}
                    onDrop={onDrop}
                >
                    <div className={`${styles.box} ${isDrag ? styles.isDrag : ''}`}>
                        <FormHeader />
                        {
                            formItems.map((item, i) =>
                                item.isDrag ?
                                    <TagDrag
                                        data={item}
                                        key={item.id}
                                        onDragEnter={() => onItemEnter(i)}
                                    /> :
                                    <FormItem
                                        $eventFI={$eventFI}
                                        data={item}
                                        editId={editId}
                                        key={item.id}
                                        modal={modal}
                                        onDelte={() => onDelItem(i)}
                                        onDragEnter={() => onItemEnter(i)}
                                        setEditId={setEditId}
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
