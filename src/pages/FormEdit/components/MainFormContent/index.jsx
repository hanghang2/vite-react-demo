import { useRef, useState, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, Input, Divider, Modal } from 'antd';
import { DragOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';
import useFormTagDrag from './useFormTagDrag';
import { formItemData } from '@/utils/form-item-data.jsx';

// 表单项
const FormItem = ({ data, onDragover, modal, onDelte, $eventFI, setEditId, editId }) => {
    const FormItem = formItemData[data.value]?.component || Fragment;
    const onDel = () => { // 删除
        modal.confirm({
            title: '提示',
            content: '确定要删除该项吗？',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onOk: () => {
                onDelte();
            },
        });
    };
    const [attr, setAttr] = useState({ width: '50%' }); // 表单项属性
    $eventFI.useSubscription(([type, _data, attr]) => {
        if (type === 'onSaveAttr' && _data.id === data.id) {
            setAttr(JSON.parse(JSON.stringify(attr)));
        }
    });
    return (
        <div
            className={`${styles.formItem} ${editId === data.id ? styles.active : ''}`}
            onDragOver={onDragover}
            style={{ width: attr.width }}
        >
            <FormItem />
            <div className={styles.iconBox}>
                <DeleteOutlined className={styles.icon} onClick={onDel}/>
                <FormOutlined
                    className={styles.icon}
                    onClick={() => {
                        $eventFI.emit(['onEditAttr', data, attr]);
                        setEditId(data.id);
                    }}
                />
            </div>
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

const { TextArea } = Input;
const FormHeader = () => {
    return (
        <div className='w-full p-20'>
            <Input
                maxLength={20}
                placeholder="请输入表单名称"
                rootClassName={styles.headTitle}
                showCount
            />
            <TextArea
                allowClear
                maxLength={100}
                placeholder="这里可以输入表单描述。"
                rootClassName={styles.headRemark}
                rows={3}
                showCount
                style={{ resize: 'none' }}
            />
            <Divider>表单内容</Divider>
        </div>
    );
};
const MainFormContent = ({ $event, $eventFI }) => {
    const {
        onDragOver, // 拖拽到区域
        onDrop, // 拖拽结束
        onFormItemDrag, // 拖拽到form item区域
        onDelteItem, // 删除
        formItems, // 表单项
        boxRef, // 拖拽区域
        isDrag, // 是否拖拽
    } = useFormTagDrag($event);
    const [modal, contextHolder] = Modal.useModal();
    const [editId, setEditId] = useState(null);
    // onDrop 拖拽结束
    // onDragOver 拖拽到区域
    return (
        <div className={styles.mainFormContent}>
            {contextHolder}
            <Scrollbars autoHide>
                <div
                    className={styles.bg}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    ref={boxRef}
                >
                    <div className={`${styles.box} ${isDrag ? styles.isDrag : ''}`}>
                        <FormHeader></FormHeader>
                        {
                            formItems.map((item, i) =>
                                item.isDrag ?
                                    <TagDrag
                                        data={item}
                                        key={item.id}
                                        onDragover={() => onFormItemDrag(i)}
                                    /> :
                                    <FormItem
                                        $eventFI={$eventFI}
                                        data={item}
                                        editId={editId}
                                        key={item.id}
                                        modal={modal}
                                        onDelte={() => onDelteItem(i)}
                                        onDragover={() => onFormItemDrag(i)}
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
