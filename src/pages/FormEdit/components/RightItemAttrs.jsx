import { useState } from 'react';
import { Divider, Segmented } from 'antd';
import styles from '../index.module.scss';
import { useUpdateEffect } from 'ahooks';

const Box = ({ children, data }) => data.label ? children : null;
const Item = ({ children, label }) => (
    <div className='d-flex align-items-center'>
        <div className='u-3of10'>{label}：</div>
        <div className='u-7of10'>{children}</div>
    </div>
);
const widths = ['100%', '50%', '33.3%'];
const RightItemAttrs = ({ $eventFI }) => {
    const [attr, setAttr] = useState({}); // 表单项属性
    const [data, setData] = useState({}); // 表单项数据
    $eventFI.useSubscription(([type, data, attr]) => {
        if (type === 'onEditAttr') {
            data = JSON.parse(JSON.stringify(data));
            setData(data);
            setAttr(JSON.parse(JSON.stringify(attr)));
        }
    });
    useUpdateEffect(() => {
        $eventFI.emit(['onSaveAttr', data, attr]);
    }, [attr]);
    return (
        <div className={styles.rightItemAttrs}>
            <div className='w-full color-999 m-b-20'>编辑表单项</div>
            <Box data={data}>
                <div className='f-w-b'>{data.label}-{data.id}</div>
                <Divider>公共属性</Divider>
                <div>
                    <Item label='宽度'>
                        <Segmented
                            onChange={(value) => setAttr({ ...attr, width: value })}
                            options={widths}
                            value={attr.width}
                        />
                    </Item>
                </div>
            </Box>
        </div>
    );
};

export default RightItemAttrs;
