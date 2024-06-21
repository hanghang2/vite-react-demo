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

const Item = ({ label, children }) => (
    <div className='d-flex'>
        <div className='u-3of10 l-h-32'>{label}：</div>
        <div className='u-7of10'>
            {children}
        </div>
    </div>
);

// 表单项
export const formItemData = {
    input: {
        component: () => (
            <Item label="单行文本">
                <Input placeholder="请输入" />
            </Item>
        ),
    },
    radio: {
        component: () => {
            return (
                <Item label="单选">
                    <Radio.Group className='m-t-5'>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </Radio.Group>
                </Item>
            );
        },
    },
    checkbox: {
        component: () => {
            const plainOptions = ['Apple', 'Pear', 'Orange'];
            return (
                <Item label="多选">
                    <Checkbox.Group className='m-t-5' defaultValue={['Apple']} options={plainOptions}/>
                </Item>
            );
        },
    },
};
