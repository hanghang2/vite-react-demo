// 表单项通用属性
export default {
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
