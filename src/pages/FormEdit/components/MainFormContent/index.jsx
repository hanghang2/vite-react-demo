import { useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, message, Modal, Space } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';
import useFormTagDrag from './useFormTagDrag';
import FormHeader from './FormHeader.jsx';
import FormItem from './FormItem.jsx';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom'; // react传送门

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
        setFormItems, // 设置表单项
        isDrag, // 是否拖拽在区域内
    } = useFormTagDrag($event);
    const [modal, contextModal] = Modal.useModal();
    const [editId, setEditId] = useState(null); // 编辑的表单项id

    const itemRefs = useRef([]); // 表单项ref
    const onSave = () => { // 保存表单
        // 获取所有表单项数据
        Promise.all(itemRefs.current.map(({ getData }) => getData())).then(res => {
            localStorage.setItem('formItems', JSON.stringify(res));
            messageApi.open({
                type: 'success',
                content: '保存成功',
            });
        }).catch(err => {
            messageApi.open({
                type: 'error',
                content: err,
            });
        });
    };
    const [messageApi, contextmsg] = message.useMessage();
    const navigate = useNavigate();
    return (
        <div className={styles.mainFormContent}>
            {contextModal}
            {contextmsg}
            {
                document.querySelector('.header-btns') ? createPortal(
                    <Space>
                        <Button onClick={() => setFormItems([])}>清空</Button>
                        <Button onClick={onSave} type="primary">保存</Button>
                        <Button onClick={() => navigate('/FormView')} type="dashed">去预览</Button>
                    </Space>,
                    document.querySelector('.header-btns'),
                ) : null
            }
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
                                        index={i}
                                        key={item.id}
                                        modal={modal}
                                        onDelte={() => onDelItem(i)}
                                        onDragEnter={() => onItemEnter(i)}
                                        ref={ref => itemRefs.current[i] = ref}
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
