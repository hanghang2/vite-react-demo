import { Input, Radio, Checkbox } from 'antd';

// 表单元素
export const formTagData = [
    {
        label: '单行文本',
        value: 'input',
    },
    {
        label: '单选',
        value: 'radio',
    },
    {
        label: '多选',
        value: 'checkbox',
    },
];

// 公共属性
export const commonAttrs = {
    boxStyle: [ // 盒子样式
        {
            attr: 'width',
            label: '宽度(%)',
            value: 50,
            attrType: 'slider',
            unit: '%',
        },
        {
            attr: 'paddingLeft,paddingRight',
            label: '左右间距',
            value: 20,
            attrType: 'input-number',
        },
        {
            attr: 'paddingTop,paddingBottom',
            label: '上下间距',
            value: 10,
            attrType: 'input-number',
        },
    ],
    labelStyle: [ // 标签样式
        {
            attr: 'width',
            label: '标签宽度',
            value: 120,
            attrType: 'input-number',
        },
        {
            attr: 'textAlign',
            label: '对齐方式',
            value: 'left',
            attrType: 'radio',
            radioOptions: [
                { label: '左对齐', value: 'left' },
                { label: '居中', value: 'center' },
                { label: '右对齐', value: 'right' },
            ],
        },
    ],
    labelText: { // 标签文本
        label: '标签文字',
        value: '',
        attrType: 'input',
    },
    required: { // 是否必填
        label: '是否必填',
        value: false,
        attrType: 'switch',
    },
};

// 表单项
export const formItemData = {
    input: {
        component: () => (
            <Input placeholder="请输入" />
        ),
    },
    radio: {
        component: () => {
            return (
                <Radio.Group className='m-t-5'>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </Radio.Group>
            );
        },
    },
    checkbox: {
        component: () => {
            const plainOptions = ['Apple', 'Pear', 'Orange'];
            return (
                <Checkbox.Group className='m-t-5' defaultValue={['Apple']} options={plainOptions}/>
            );
        },
    },
};
