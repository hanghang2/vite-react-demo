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
 * 实现：做几个tag标签，1、可点击，点击默认新增到表单最后；
 * 2、可拖拽到表单区域，拖拽标签插入到指定位置，松开鼠标表单项插入到指定位置；
 */
