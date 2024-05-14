import { BleClient, numberToUUID } from '@capacitor-community/bluetooth-le';

export default async function listAll() {
    await BleClient.initialize();
    BleClient.getConnectedDevices([]).then(data => {
        console.log(data);
    })
}