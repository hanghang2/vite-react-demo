import useSize from '../../hooks/useSize';
import { useRef, useState } from 'react';

const Child = () => {
    const boxRef = useRef(null);
    const size = useSize(boxRef);
    const [rate, setRate] = useState(30);
    console.log(size);
    return (
        <>
            <input onChange={e => setRate(e.target.value)} type="range" value={rate}/>
            <div ref={boxRef} style={{ border: '1px solid #ccc', width: `${rate}%`, height: rate * 5 }}>
                区域
            </div>
            w-{size.width}  h-{size.height}
        </>
    );
};

export default Child;
