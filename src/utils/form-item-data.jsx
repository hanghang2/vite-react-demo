import { Input, Radio, Checkbox } from 'antd';

// 表单元素
export const formTagData = [
    {
        label: '单行文本',
        value: 'input',
        attr: [
            {
                attrType: 'input-number',
                label: '字数限制',
                value: 0,
            },
        ],
    },
    {
        label: '单选',
        value: 'radio',
        attr: [
            {
                attrType: 'list-label-value',
                label: '选项值',
                value: [
                    { label: 'A', value: '0' },
                    { label: 'B', value: '1' },
                    { label: 'C', value: '2' },
                ],
            },
        ],
    },
    {
        label: '多选',
        value: 'checkbox',
        attr: [
            {
                attrType: 'list-label-value',
                label: '选项值',
                value: [
                    { label: 'A', value: '0' },
                    { label: 'B', value: '1' },
                    { label: 'C', value: '2' },
                ],
            },
        ],
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
    name: { // 字段名
        label: '字段名',
        value: '',
        attrType: 'input',
    },
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
        component: ({ attr }) => {
            const maxLength = attr?.curAttrs[0]?.value;
            return (
                <Input maxLength={maxLength || null} placeholder="请输入" showCount={!!maxLength}/>
            );
        },
    },
    radio: {
        component: ({ attr }) => {
            const options = attr?.curAttrs[0]?.value?.filter(item => item.label && item.value);
            return (
                <Radio.Group className='m-t-5'>
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
        component: ({ attr }) => {
            const options = attr?.curAttrs[0]?.value?.filter(item => item.label && item.value);
            return (
                <Checkbox.Group className='m-t-5'>
                    {
                        options?.map(item => (
                            <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
                        ))
                    }
                </Checkbox.Group>
            );
        },
    },
};
