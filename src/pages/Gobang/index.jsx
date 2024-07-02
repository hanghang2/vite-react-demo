import styles from './index.module.scss';
import { useEffect, useState } from 'react';

const Gobang = () => {
    const [chess, setChess] = useState([]); // 棋子
    const [isBlack, setIsBlack] = useState(true); // 是否是黑子
    // 横线
    const hLine = new Array(21).fill(null).map((_, i) => `M 20 ${i * 40 + 20} L 820 ${i * 40 + 20} `).join('');
    // 竖线
    const vLine = new Array(21).fill(null).map((_, i) => `M ${i * 40 + 20} 20 L ${i * 40 + 20} 820 `).join('');
    const handleClick = (e) => { // 点击事件
        const x = Math.floor(e.nativeEvent.offsetX / 40);
        const y = Math.floor(e.nativeEvent.offsetY / 40);
        if (chess.some(item => item.x === x && item.y === y)) { // 已经有棋子
            return;
        }
        const newChess = [...chess, { x, y, isBlack }];
        setChess(newChess);
        setIsBlack(!isBlack);
        // 判断输赢
        const currentChess = newChess.filter(item => item.isBlack === isBlack);
        const isWin = (fn) => { // 判断输赢
            let count = 1;
            for (let i = 1; i < 5; i++) {
                if (currentChess.some(j => fn(j, i))) {
                    count++;
                } else {
                    break;
                }
            }
            return count >= 5;
        };
        if (currentChess.some(item => { // 该点为起点，
            return isWin((cItem, i) => cItem.x === item.x + i && cItem.y === item.y) || // 横向
                isWin((cItem, i) => cItem.x === item.x && cItem.y === item.y + i) || // 纵向
                isWin((cItem, i) => cItem.x === item.x + i && cItem.y === item.y + i) || // 左上到右下
                isWin((cItem, i) => cItem.x === item.x + i && cItem.y === item.y - i); // 左下到右上
        })) {
            setTimeout(() => {
                alert(`${isBlack ? '黑' : '白'}棋赢了`);
            });
        }
    };

    return (
        <div className={styles.box}>
            <svg className={styles.svg}>
                {/* 横线*/}
                <path className={styles.line} d={hLine}/>
                {/* 竖线*/}
                <path className={styles.line} d={vLine}/>
                {/* 棋子*/}
                {
                    chess.map((item, index) => (
                        <circle
                            cx={item.x * 40 + 20}
                            cy={item.y * 40 + 20}
                            fill={item.isBlack ? 'black' : 'white'}
                            key={index}
                            r={10}
                            stroke="black"
                            strokeWidth="1"
                        />
                    ))
                }
            </svg>
            {/* 点击区域*/}
            <div className={styles.pointArea} onClick={handleClick}/>
        </div>
    );
};

export default Gobang;
