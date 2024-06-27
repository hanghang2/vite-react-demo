import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Divider } from 'antd';
import styles from '../index.module.scss';
import { useUpdateEffect } from 'ahooks';
import AttrSetting from './AttrSetting';

const NullBox = ({ children, isNull }) => isNull ? children : null;
const Item = ({ children, label }) => (
    <div className='d-flex p-y-8 p-r-10'>
        <div className='w-80 l-h-30'>{label}：</div>
        <div className='flex-1'>{children}</div>
    </div>
);
const RightItemAttrs = ({ $eventFI }) => {
    const [attr, setAttr] = useState({}); // 表单项属性
    const [data, setData] = useState({}); // 表单项数据
    $eventFI.useSubscription(([type, data, attr]) => {
        if (type === 'onEditAttr') {
            setData(JSON.parse(JSON.stringify(data)));
            setAttr(JSON.parse(JSON.stringify(attr)));
        }
    });
    useUpdateEffect(() => {
        $eventFI.emit(['onSaveAttr', data, attr]);
    }, [attr]);
    return (
        <div className={styles.rightItemAttrs}>
            <Scrollbars autoHide>
                <div className='w-full color-999 m-b-20'>编辑表单项</div>
                <NullBox isNull={data.label}>
                    <div className='f-w-b'>{data.label}-{data.id}</div>
                    <Divider><span className='font-bold'>公共属性</span></Divider>
                    {
                        ['boxStyle', 'labelStyle'].map(type => (
                            attr[type]?.map((item, i) => (
                                <Item key={item.attr} label={item.label}>
                                    <AttrSetting
                                        data={item}
                                        onChange={val =>
                                            setAttr({
                                                ...attr,
                                                [type]: attr[type].map((cur, j) => {
                                                    if (j === i) {
                                                        cur.value = val;
                                                    }
                                                    return cur;
                                                }),
                                            })
                                        }
                                        value={item.value}
                                    />
                                </Item>
                            ))
                        ))
                    }
                    <Divider><span className='font-bold'>表单项属性</span></Divider>
                    {
                        ['name', 'labelText', 'required'].map(type => (
                            <Item key={type} label={attr[type]?.label}>
                                <AttrSetting
                                    data={attr[type]}
                                    onChange={val =>
                                        setAttr({
                                            ...attr,
                                            [type]: {
                                                ...attr[type],
                                                value: val,
                                            },
                                        })
                                    }
                                    value={attr[type]?.value}
                                />
                            </Item>
                        ))
                    }
                    <Divider><span className='font-bold'>特有属性</span></Divider>
                    {
                        attr.curAttrs?.map((item, i) => (
                            <Item key={item.attrType} label={item.label}>
                                <AttrSetting
                                    data={item}
                                    onChange={val =>
                                        setAttr({
                                            ...attr,
                                            curAttrs: attr.curAttrs.map((cur, j) => {
                                                if (j === i) {
                                                    cur.value = val;
                                                }
                                                return cur;
                                            }),
                                        })
                                    }
                                    value={item.value}
                                />
                            </Item>
                        ))
                    }
                </NullBox>
            </Scrollbars>
        </div>
    );
};

export default RightItemAttrs;
