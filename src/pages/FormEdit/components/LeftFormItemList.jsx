import { Scrollbars } from 'react-custom-scrollbars';
import { Button } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';
import { formTagData } from '@/utils/form-item-data.jsx';

const LeftFormItemList = ({ $event }) => {
    // onClick 点击tag 新增
    // onDragStart 拖拽开始 记录
    // onDragEnd 拖拽结束 清除
    return (
        <div className={styles.leftFormItemList}>
            <Scrollbars autoHide>
                <div className='d-flex flex-wrap m-y-20'>
                    <div className='w-full m-10 color-999'>可拖拽或点击</div>
                    {
                        formTagData.map(item => (
                            <Button
                                className={styles.tag}
                                draggable="true"
                                key={item.value}
                                onClick={() => $event.emit(['onTagClick', item])}
                                onDragEnd={() => $event.emit(['onDragEnd'])}
                                onDragStart={() => $event.emit(['onDragStart', item])}
                                type="dashed"
                            >
                                <DragOutlined />
                                {item.label}
                            </Button>
                        ))
                    }
                </div>
            </Scrollbars>
        </div>
    );
};

export default LeftFormItemList;

/**
 * 实现：做几个tag标签，1、可点击，点击默认新增到表单最后；2、可拖拽到表单区域，拖拽显示插入位置；
 * 拖拽位置实现：使用h5的拖拽属性，表单区域显示拖拽标签位置，当鼠标在表单区域元素上时，会显示插入表单前面；
 * 松开鼠标或者点击标签后新增插入：通过事件通信，调用插入表单元素方法；
 */
