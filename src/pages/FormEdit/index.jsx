import { useEventEmitter } from 'ahooks';
import Header from './components/Header';
import LeftFormItemList from './components/LeftFormItemList'; // 左侧表单元素列表
import MainFormContent from './components/MainFormContent'; // 表单内容
import RightItemAttrs from './components/RightItemAttrs'; // 右侧表单元素属性
import styles from './index.module.scss';

const FormEdit = () => {
    const $event = useEventEmitter();
    const $eventFI = useEventEmitter(); // 表单项属性设置通信

    return (
        <div className='h-full d-flex flex-column'>
            <Header/>
            <div className={`flex-1 d-flex  ${styles.main}`}>
                <LeftFormItemList $event={$event}/>
                <MainFormContent $event={$event} $eventFI={$eventFI}/>
                <RightItemAttrs $eventFI={$eventFI}/>
            </div>
        </div>
    );
};

export default FormEdit;
