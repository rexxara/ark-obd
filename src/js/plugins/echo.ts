import { registerPlugin } from '@capacitor/core';
import { message } from 'antd';

const Echo: any = registerPlugin('Echo');

export default async function echoTest() {
    const { value } = await Echo.echo({ value: 'Hello World!' });
    (JSON.parse(value)).map(async v => {
        const name: string = v.Name;
        if (name.indexOf('OBD') === 0) {
            const location = v.Location;
            console.log(v)
            const { value } = await Echo.init({ deviceAddress: location });
            console.log(value)
            message.success(value)
        }
    })
};
