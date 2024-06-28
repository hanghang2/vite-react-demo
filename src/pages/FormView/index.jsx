import { useState } from 'react';
import FormItem from '@/pages/FormEdit/components/MainFormContent/FormItem.jsx';
import formStyle from '@/pages/FormEdit/index.module.scss';
import styles from './index.module.scss';
import { Button } from 'antd';
import { useSetState } from 'ahooks';

const FormView = () => {
    const [formItems, _] = useState(JSON.parse(localStorage.getItem('formItems') || '[]')); // 表单项
    const [formData, setFormData] = useState({}); // 表单数据

    const onSubmit = () => { // 提交表单
        console.log(formData);
    };
    return (
        <div className={`${formStyle.mainFormContent} ${styles.form}`}>
            <div className={formStyle.box}>
                {
                    formItems.map(({ data, attr }) =>
                        <FormItem
                            data={data}
                            key={data.id}
                            onChange={val => setFormData({ ...formData, [attr.name.value]: val })}
                            value={formData[attr.name.value]}
                            viewAttr={attr}
                        />,
                    )
                }
            </div>
            <div className='flexCC p-t-20'>
                <Button className='m-r-16' onClick={() => setFormData({})}>清空表单</Button>
                <Button onClick={onSubmit} type="primary">提交</Button>
            </div>
        </div>
    );
};

export default FormView;
