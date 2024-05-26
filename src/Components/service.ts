import { registerPlugin } from '@capacitor/core';
import { BleInfo } from '../Context/global'
import { CommandType } from '../Context/Model';
import { Capacitor } from '@capacitor/core';
const Echo: any = registerPlugin('Echo');
let isDebug = true;
if (Capacitor.getPlatform() === 'android') {
    isDebug = false;
}
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
    public static async disconnect() {
        return await Echo.disconnect();
    }
    public static async echo(location: string) {
        if (isDebug) {
            return "mockEcho";
        }
        const { value } = await Echo.echo({ deviceAddress: location });
        return value;
    }
    public static async heartBeat(location: string, toRequsetList: CommandType[]): Promise<Partial<{ [key in CommandType]: any }>> {
        //const vin = "09020140:4902014C53471:454E353441354E2:44313736333237";
        if (isDebug) {
            const res: Partial<{ [key in CommandType]: any }> = {};
            if (toRequsetList.includes(CommandType.VIN)) {
                res[CommandType.VIN] = "09020140:4902014C53471:454E353441354E2:44313736333237";
            }
            if (toRequsetList.includes(CommandType.RPM)) {
                res[CommandType.RPM] = Math.floor(950 + 2000 * Math.random());
            }
            if (toRequsetList.includes(CommandType.SPEED)) {
                res[CommandType.SPEED] = Math.floor(30 + 20 * Math.random());
            }
            return res;

        }
        const requsetResult = await Echo.heartBeat({ deviceAddress: location, toRequsetList });
        console.log(requsetResult)
        const { RPM, SPEED, VIN } = requsetResult;
        const res: Partial<{ [key in CommandType]: any }> = {};
        if (RPM) {
            if (RPM.indexOf('410C') === 0 || RPM.indexOf('010C410C') === 0) {
                const newValueLength = '010C410C122A'.length;
                const x16Value = newValueLength === RPM.length ? RPM.substring(8) : RPM.substring(4);
                const decimalNumber = parseInt(x16Value, 16);
                const formatedValue = decimalNumber / 4;
                res[CommandType.RPM] = formatedValue;
            }
        }
        if (SPEED) {
            if (SPEED.indexOf('410D') === 0 || SPEED.indexOf('010D410D') === 0) {
                //speed ="010D410D00"
                const newValueLength = '010D410D00'.length;
                const x16Value = newValueLength === SPEED.length ? SPEED.substring(8) : SPEED.substring(4);
                const decimalNumber = parseInt(x16Value, 16);
                res[CommandType.SPEED] = decimalNumber;
            }
        }
        if (VIN) {
            res[CommandType.VIN] = VIN;
        }
        return res;
    }
}