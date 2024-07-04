import { useEffect, useState } from 'react';

const useSize = (dom) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        dom = dom?.current || dom;
        if (dom instanceof HTMLElement === false) {
            console.error('dom is not a HTMLElement');
            return;
        }
        const rsObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const target = entry.target;
                setSize({ width: target.offsetWidth, height: target.offsetHeight });
            }
        });
        rsObserver.observe(dom); // 添加监听
        return () => {
            rsObserver.unobserve(dom); // 移除监听
        };
    }, []);
    return size;
};

export default useSize;
