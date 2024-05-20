import { registerPlugin } from '@capacitor/core';
import { BleInfo } from '../Context/global'
const Echo: any = registerPlugin('Echo');

export default class Services {
    public static async getBleList() {
        const { value } = await Echo.getBleList({ value: 'Hello World!' });
        return JSON.parse(value) as BleInfo[]
    }
    public static async echo(location: string) {
        const { value } = await Echo.echo({ deviceAddress: location });
        return value;
    }
    public static async getRpm(location: string) {
        const { value } = await Echo.getRpm({ deviceAddress: location });
        return value;
    }
}