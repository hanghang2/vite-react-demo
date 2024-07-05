// 获取节点的位置-防碰撞
export const getNotePosition = (node, list, x, y) => {
    const result = { x, y, w: 100, h: 50 }; // 默认位置

    // 计算重叠
    let isOverlap = false; // 是否重叠
    do {
        isOverlap = false;
        list.forEach(n => {
            if (Math.max(result.x, n.x) < Math.min(result.x + result.w, n.x + n.w)) { // x轴重叠
                if (Math.max(result.y, n.y) < Math.min(result.y + result.h, n.y + n.h)) { // y轴重叠
                    isOverlap = true;
                    result.y = n.y + n.h + 20; // 把节点往下移动
                }
            }
        });
    } while (isOverlap);
    return result;
};

// 碰撞检测
export const isCollision = (node, list) => {
    let isOverlap = false; // 是否重叠
    list.forEach(n => {
        if (node !== n) {
            if (Math.max(node.x, n.x) < Math.min(node.x + node.w, n.x + n.w)) { // x轴重叠
                if (Math.max(node.y, n.y) < Math.min(node.y + node.h, n.y + n.h)) { // y轴重叠
                    isOverlap = true;
                }
            }
        }
    });
    return isOverlap;
};
