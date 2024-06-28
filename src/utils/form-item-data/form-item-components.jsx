import { Checkbox, ColorPicker, DatePicker, Input, Radio, Rate, Select, Slider, Switch, TimePicker } from 'antd';
import dayjs from 'dayjs';

// 表单项组件
export default {
    input: {
        component: ({ attr, onChange, value }) => {
            const maxLength = attr?.curAttrs[0]?.value;
            return (
                <Input
                    maxLength={maxLength || null}
                    onChange={e => onChange && onChange(e.target.value)}
                    placeholder="请输入"
                    showCount={!!maxLength}
                    {...(onChange ? { value } : {})}
                />
            );
        },
    },
    textarea: {
        component: ({ attr, onChange, value }) => {
            const maxLength = attr?.curAttrs[0]?.value;
            const rows = attr?.curAttrs[1]?.value;
            return (
                <Input.TextArea
                    maxLength={maxLength || null}
                    onChange={e => onChange && onChange(e.target.value)}
                    placeholder="请输入"
                    rows={rows}
                    showCount={!!maxLength}
                    {...(onChange ? { value } : {})}
                />
            );
        },
    },
    radio: {
        component: ({ attr, onChange, value }) => {
            const options = attr?.curAttrs[0]?.value?.filter(item => item.label && item.value);
            return (
                <Radio.Group
                    className='m-t-5'
                    onChange={e => onChange && onChange(e.target.value)}
                    {...(onChange ? { value } : {})}
                >
                    {
                        options?.map(item => (
                            <Radio key={item.value} value={item.value}>{item.label}</Radio>
                        ))
                    }
                </Radio.Group>
            );
        },
    },
    checkbox: {
        component: ({ attr, onChange, value }) => {
            const options = attr?.curAttrs[0]?.value?.filter(item => item.label && item.value);
            return (
                <Checkbox.Group
                    className='m-t-5'
                    onChange={onChange || null}
                    {...(onChange ? { value } : {})}
                >
                    {
                        options?.map(item => (
                            <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
                        ))
                    }
                </Checkbox.Group>
            );
        },
    },
    rate: {
        component: ({ attr, onChange, value }) => {
            return (
                <Rate
                    allowHalf
                    onChange={onChange || null}
                    rootClassName='m-t-6'
                    {...(onChange ? { value } : {})}
                />
            );
        },
    },
    select: {
        component: ({ attr, onChange, value }) => {
            const options = attr?.curAttrs[0]?.value?.filter(item => item.label && item.value);
            return (
                <Select
                    onChange={onChange || null}
                    style={{ width: '100%' }}
                    {...(onChange ? { value } : {})}
                >
                    {
                        options?.map(item => (
                            <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                        ))
                    }
                </Select>
            );
        },
    },
    slider: {
        component: ({ attr, onChange, value }) => {
            return (
                <Slider range {...(onChange ? { value } : {})} onChange={onChange || null}/>
            );
        },
    },
    switch: {
        component: ({ attr, onChange, value }) => {
            return (
                <Switch {...(onChange ? { value } : {})} onChange={onChange || null} />
            );
        },
    },
    time: {
        component: ({ attr, onChange, value }) => {
            value = value ? dayjs(value, 'HH:mm:ss') : value;
            return (
                <TimePicker {...(onChange ? { value } : {})} changeOnScroll needConfirm={false}
                    onChange={(val, str) => onChange && onChange(str)}
                />
            );
        },
    },
    date: {
        component: ({ attr, onChange, value }) => {
            value = value ? dayjs(value) : value;
            return (
                <DatePicker {...(onChange ? { value } : {})} onChange={(val, str) => onChange && onChange(str)} />
            );
        },
    },
    color: {
        component: ({ attr, onChange, value }) => {
            return (
                <ColorPicker {...(onChange ? { value } : {})} format='rgb' onChange={color => onChange && onChange(color.toRgbString())}/>
            );
        },
    },
};
