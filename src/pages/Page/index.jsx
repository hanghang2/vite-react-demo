import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import testStore from '@/store/test';

const Page = () => {
    console.log(import.meta.env.MODE);
    console.log(window.BASE_URL);
    const [num, setNum] = useState(0);
    return (
        <div>
            page
            <div>
                num:{num}
                <button onClick={() => setNum(num + 1)}>num++</button>
            </div>
            <div className='color-info'>color-info</div>
            <div>
                mobx test val:
                {testStore.number}
            </div>
        </div>
    );
};

export default observer(Page);
