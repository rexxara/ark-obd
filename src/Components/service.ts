import { registerPlugin } from '@capacitor/core';
import { BleInfo } from '../Context/global'
const Echo: any = registerPlugin('Echo');
const isDebug = true;
export default class Services {
    public static async getBleList() {
        if (isDebug) {
            const mockInfo: BleInfo[] = [{
                Name: 'OBDII',
                Location: '1.1.1.1.1',
                Alias: '2333',
                DeviceState: 0,
                Type: 0
            }];
            return mockInfo;
        }
        const { value } = await Echo.getBleList({ value: 'Hello World!' });
        return JSON.parse(value) as BleInfo[]
    }
    public static async echo(location: string) {
        if (isDebug) {
            return "mockEcho";
        }
        const { value } = await Echo.echo({ deviceAddress: location });
        return value;
    }
    public static async getRpm(location: string) {
        if (isDebug) {
            return Math.floor(950 + 350 * Math.random());
        }
        const { value } = await Echo.getRpm({ deviceAddress: location });

        if (value.indexOf('410C') === 0) {
            const x16Value = value.substring(4);
            const decimalNumber = parseInt(x16Value, 16);
            const formatedValue = decimalNumber / 4;
            return formatedValue;
        }
        return 0;
    }
}