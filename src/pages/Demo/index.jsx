import { useMouse } from 'ahooks';
import { WeiboCircleOutlined, TaobaoOutlined, AlipayCircleOutlined } from '@ant-design/icons';
import { Flex, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import testStore from '@/store/test';

const Demo = () => {
    const mouse = useMouse();
    return (
        <div>
            <h1>demo</h1>
            <h2>ahooks</h2>
            <p>
                Client - x: {mouse.clientX}, y: {mouse.clientY}
            </p>
            <p>
                Page - x: {mouse.pageX}, y: {mouse.pageY}
            </p>
            <p>
                Screen - x: {mouse.screenX}, y: {mouse.screenY}
            </p>
            <h2>antd-icon</h2>
            <div style={{ fontSize: 30 }}>
                <WeiboCircleOutlined />
                <AlipayCircleOutlined />
                <TaobaoOutlined />
            </div>
            <h2>antd</h2>
            <Flex gap="small" wrap>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
            </Flex>
            <h3>mobx</h3>
            <div>
                val:{testStore.number}
                <br />
                <Button onClick={() => testStore.add()}>val++</Button>
                <Button onClick={() => testStore.sub()}>val--</Button>
            </div>
        </div>
    );
};

export default observer(Demo);
