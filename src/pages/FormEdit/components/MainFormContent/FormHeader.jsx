import { Divider, Input } from 'antd';
import styles from '../../index.module.scss';

const { TextArea } = Input;
const FormHeader = () => {
    return (
        <div className='w-full p-20'>
            <Input
                maxLength={20}
                placeholder="请输入表单名称"
                rootClassName={styles.headTitle}
                showCount
            />
            <TextArea
                allowClear
                maxLength={100}
                placeholder="这里可以输入表单描述。"
                rootClassName={styles.headRemark}
                rows={3}
                showCount
                style={{ resize: 'none' }}
            />
            <Divider>表单内容</Divider>
        </div>
    );
};
export default FormHeader;
