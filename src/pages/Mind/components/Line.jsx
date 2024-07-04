import styles from '../index.module.scss';

// 获取连线路径
const getPath = (x, y, pid, parent, w, h) => {
    if (x > parent.x) {
        return `M ${x} ${y + h / 2} L ${parent.x + parent.w} ${parent.y + parent.h / 2}`;
    } else {
        return `M ${x + w} ${y + h / 2} L ${parent.x} ${parent.y + parent.h / 2}`;
    }
};
// 箭头路径
const getArrow = (x, y, parent, w, h) => {
    const centerX = (x + parent.x + (x > parent.x ? parent.w : w)) / 2;
    const centerY = (y + parent.y + h / 2 + parent.h / 2) / 2;
    let angle; // 角度
    if (x > parent.x) {
        angle = 360 * Math.atan((parent.y + parent.h / 2 - y - h / 2) / (parent.x + parent.w - x)) / (2 * Math.PI); // 角度
    } else {
        angle = 360 * Math.atan((parent.y + parent.h / 2 - y - h / 2) / (parent.x - w - x)) / (2 * Math.PI) + 180; // 角度
    }
    // 结束点在开始点范围内
    const endX = x;
    if (endX > parent.x && endX < parent.x + parent.w || (
        endX + w > parent.x && endX + w < parent.x + parent.w
    )) {
        angle += 180;
    }

    return {
        d: `M ${centerX - 5} ${centerY - 5} L ${centerX} ${centerY} L ${centerX - 5} ${centerY + 5}`,
        transform: `rotate(${angle} ${centerX} ${centerY})`,
    };
};
const Line = ({ x, y, pid, list, w, h }) => {
    const parent = list.find(item => item.id === pid);

    return (
        <>
            <path
                className={styles.line}
                d={getPath(x, y, pid, parent, w, h)}
            />
            <path
                className={styles.line}
                {...getArrow(x, y, parent, w, h)}
            />
        </>
    );
};

export default Line;
