import { commonAttrs, formItemData } from '@/utils/form-item-data.jsx';
import { Fragment, useState } from 'react';
import styles from '@/pages/FormEdit/index.module.scss';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import useGetItemAttr from './useGetItemAttr.jsx';

// 表单项盒子
const FormItemBox = ({ label, children, labelStyle, required }) => (
    <div className='d-flex'>
        <div className={`l-h-32 ${required ? styles.labelRequired : ''}`} style={labelStyle}>{label}：</div>
        <div className='flex-1'>
            {children}
        </div>
    </div>
);

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
    commonAttrs.labelText.value = data.label; // 设置默认值
    const [attr, setAttr] = useState({ ...commonAttrs, curAttrs: data.attr || [] }); // 表单项属性
    $eventFI.useSubscription(([type, _data, attr]) => {
        if (type === 'onSaveAttr' && _data.id === data.id) {
            setAttr(JSON.parse(JSON.stringify(attr)));
        }
    });
    const {
        boxStyle, // 表单项盒子样式
        labelAttr, // 表单项label属性
    } = useGetItemAttr(attr);
    return (
        <div
            className={`${styles.formItem} ${editId === data.id ? styles.active : ''}`}
            onDragEnter={onDragEnter}
            style={boxStyle}
        >
            <FormItemBox {...labelAttr}>
                <FormItem attr={attr}/>
            </FormItemBox>
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
