import { Input, InputNumber, Slider, Switch, Radio } from 'antd';

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
        default :
            return null;
    }
};

export default AttrSetting;
