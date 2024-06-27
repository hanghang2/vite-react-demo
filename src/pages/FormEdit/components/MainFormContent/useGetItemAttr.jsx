
// 获取表单项属性hook
import { useMemo } from 'react';

const getAttr = (attr, type) => {
    const result = {};
    attr[type].forEach(item => {
        item.attr.split(',').forEach(a => {
            result[a] = item.unit ? item.value + item.unit : item.value;
        });
    });
    return result;
};
const useGetItemAttr = (attr) => {
    // 容器样式
    const boxStyle = useMemo(() => getAttr(attr, 'boxStyle'), [attr.boxStyle]);
    // 表单label样式
    const labelStyle = useMemo(() => getAttr(attr, 'labelStyle'), [attr.labelStyle]);
    return {
        boxStyle,
        labelAttr: {
            labelStyle,
            required: attr.required.value,
            label: attr.labelText.value,
        },
    };
};

export default useGetItemAttr;
