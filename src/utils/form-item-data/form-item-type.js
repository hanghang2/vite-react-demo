// 表单项类型
export default [
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
        label: '多行文本',
        value: 'textarea',
        attr: [
            {
                attrType: 'input-number',
                label: '字数限制',
                value: 0,
            },
            {
                attrType: 'input-number',
                label: '行数',
                value: 3,
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
    {
        label: '评分',
        value: 'rate',
        attr: [],
    },
    {
        label: '选择器',
        value: 'select',
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
        label: '滑动输入条',
        value: 'slider',
        attr: [],
    },
    {
        label: '开关',
        value: 'switch',
        attr: [],
    },
    {
        label: '时间选择框',
        value: 'time',
        attr: [],
    },
    {
        label: '日期选择框',
        value: 'date',
        attr: [],
    },
    {
        label: '颜色选择器',
        value: 'color',
        attr: [],
    },
];
