import { formItemData } from '@/utils/form-item-data.jsx';
import { Fragment, useState } from 'react';
import styles from '@/pages/FormEdit/index.module.scss';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

/**
 * 表单项
 * @param data 表单项数据
 * @param $eventFI 表单项属性设置 事件通信
 */
const FormItem = ({ data, onDragEnter, modal, onDelte, $eventFI, setEditId, editId }) => {
    const FormItem = formItemData[data.value]?.component || Fragment;
    const onDel = () => { // 删除
        modal.confirm({
            title: '提示',
            content: '确定要删除该项吗？',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',
            onOk: onDelte,
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
            onDragEnter={onDragEnter}
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

export default FormItem;
