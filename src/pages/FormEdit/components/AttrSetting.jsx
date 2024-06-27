import { Input, InputNumber, Slider, Switch, Radio, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const AttrSetting = ({ data, value, onChange }) => {
    switch (data.attrType) {
        case 'slider':
            return (
                <Slider onChange={onChange} value={value}/>
            );
        case 'input':
            return (
                <Input onChange={e => onChange(e.target.value)} value={value}/>
            );
        case 'input-number':
            return (
                <InputNumber
                    max={10000}
                    min={0}
                    onChange={onChange}
                    value={value}
                />
            );
        case 'switch':
            return (
                <Switch onChange={onChange} value={value} />
            );
        case 'radio':
            return (
                <Radio.Group onChange={e => onChange(e.target.value)} value={value}>
                    {
                        data.radioOptions.map(item => (
                            <Radio key={item.value} value={item.value}>{item.label}</Radio>
                        ))
                    }
                </Radio.Group>
            );
        case 'list-label-value':
            return (
                <div>
                    {
                        value.map((item, i) => (
                            <div className='d-flex m-b-8 align-items-center' key={i}>
                                <div className='m-r-5'>
                                    <Input
                                        addonBefore="名称"
                                        onChange={e => {
                                            value[i].label = e.target.value;
                                            onChange(value);
                                        }}
                                        placeholder="选项标签"
                                        value={item.label}
                                    />
                                    <Input
                                        addonBefore="值"
                                        onChange={e => {
                                            value[i].value = e.target.value;
                                            onChange(value);
                                        }}
                                        placeholder="选项值"
                                        rootClassName='m-t-5'
                                        value={item.value}
                                    />
                                </div>
                                <a className='l-h-32 color-error'
                                    onClick={() => {
                                        value.splice(i, 1);
                                        onChange(value);
                                    }}
                                >
                                    <DeleteOutlined />
                                </a>
                            </div>
                        ))
                    }
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => {
                            value.push({ label: value.length, value: value.length });
                            onChange(value);
                        }}
                        shape="circle"
                        type="primary"
                    />
                </div>
            );
        default :
            return null;
    }
};

export default AttrSetting;
