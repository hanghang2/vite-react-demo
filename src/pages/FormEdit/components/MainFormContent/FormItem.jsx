import { formDataCommonAttrs, formItemComponents } from '@/utils/form-item-data';
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react';
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
const FormItem = ({ data, onDragEnter, modal, onDelte, $eventFI, setEditId, editId, index, viewAttr, onChange, value }, ref) => {
    const FormItem = formItemComponents[data.value]?.component || Fragment;
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
    const [attr, setAttr] = useState(() => {
        const common = JSON.parse(JSON.stringify(formDataCommonAttrs));
        common.labelText.value = data.label; // 设置默认值
        return viewAttr || { ...common, curAttrs: data.attr || [] };
    }); // 表单项属性
    $eventFI?.useSubscription(([type, _data, attr]) => {
        if (type === 'onSaveAttr' && _data.id === data.id) {
            setAttr(JSON.parse(JSON.stringify(attr)));
        }
    });
    const {
        boxStyle, // 表单项盒子样式
        labelAttr, // 表单项label属性
    } = useGetItemAttr(attr);

    /** 表单保存操作
     * 暴露给父组件提供一个save方法(forwardRef)，用于保存表单项属性，会校验表单项属性是否填写完整，如果不完整则提示用户
     * 同时把 attr数据存到 data.attr（表单项属性）中，表单组件回显时会用到
     * 同时 该组件表单预览也可以复用
     */
    const getData = () => new Promise((resolve, reject) => {
        if (!attr.name.value) {
            reject(`请填写${index}-${data.label}字段名`);
        }
        resolve({ data, attr });
    });
    useImperativeHandle(ref, () => ({ getData })); // 暴露给父组件的方法
    return (
        <div
            className={`${styles.formItem} ${editId === data.id ? styles.active : ''} form-item`}
            onDragEnter={onDragEnter}
            style={boxStyle}
        >
            <FormItemBox {...labelAttr}>
                <FormItem attr={attr} onChange={onChange} value={value}/>
            </FormItemBox>
            <div className={`${styles.iconBox} form-item-edit-icon`}>
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

export default forwardRef(FormItem);
