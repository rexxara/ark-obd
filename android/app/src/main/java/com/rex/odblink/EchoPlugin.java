package com.rex.odblink;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import androidx.annotation.NonNull;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.github.pires.obd.commands.engine.RPMCommand;
import com.github.pires.obd.commands.protocol.EchoOffCommand;
import com.github.pires.obd.commands.protocol.LineFeedOffCommand;
import com.github.pires.obd.commands.protocol.SelectProtocolCommand;
import com.github.pires.obd.commands.protocol.TimeoutCommand;
import com.github.pires.obd.commands.temperature.AmbientAirTemperatureCommand;
import com.github.pires.obd.enums.ObdProtocols;

import java.util.ArrayList;
import java.util.Set;
import java.util.UUID;

@CapacitorPlugin(name = "Echo")
public class EchoPlugin extends Plugin {

    private BluetoothSocket socket = null;

    @SuppressLint("MissingPermission")
    @PluginMethod()
    public void init(PluginCall call) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        String deviceAddress = call.getString("deviceAddress");
        BluetoothDevice device = bluetoothAdapter.getRemoteDevice(deviceAddress);
        JSObject ret = new JSObject();
        var rex = deviceAddress + "|";
        try {
            UUID uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
            if(socket==null){
                socket = device.createRfcommSocketToServiceRecord(uuid);
            }
            if(!socket.isConnected()){
                socket.connect();
            }
            var cmd = new EchoOffCommand();
            cmd.run(socket.getInputStream(), socket.getOutputStream());
            rex += cmd.getResult();
//            new LineFeedOffCommand().run(socket.getInputStream(), socket.getOutputStream());
//            new TimeoutCommand(125).run(socket.getInputStream(), socket.getOutputStream());
//            new SelectProtocolCommand(ObdProtocols.AUTO).run(socket.getInputStream(), socket.getOutputStream());
//            new AmbientAirTemperatureCommand().run(socket.getInputStream(), socket.getOutputStream());
        } catch (Exception e) {
            rex+=e.getMessage();
            // handle errors
        } finally {
            ret.put("value", rex);
            call.resolve(ret);
        }
    }
    @PluginMethod()
    public void echo(PluginCall call) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        @SuppressLint("MissingPermission")
        Set<BluetoothDevice> bondedDevices = bluetoothAdapter.getBondedDevices();

        var connectedDevices = new ArrayList<BluetoothDevice>();
        for (BluetoothDevice device : bondedDevices) {
            connectedDevices.add(device);
        }

        JSObject ret = getJsObject(connectedDevices, bluetoothAdapter);
        call.resolve(ret);
    }

    @SuppressLint("MissingPermission")
    @NonNull
    private static JSObject getJsObject(ArrayList<BluetoothDevice> connectedDevices,
            BluetoothAdapter bluetoothAdapter) {
        JSObject ret = new JSObject();
        var deviceMap = new ArrayList<BLEDto>();
        for (BluetoothDevice device : connectedDevices) {
            @SuppressLint("MissingPermission")
            String deviceName = device.getName();
            String deviceAddress = device.getAddress();
            @SuppressLint("MissingPermission")
            int deviceState = device.getBondState();
            @SuppressLint("MissingPermission")
            int type = device.getType();
            @SuppressLint("MissingPermission")
            String alias = null;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.R) {
                alias = device.getAlias();
            }

            var res = new BLEDto(deviceName, deviceAddress, deviceState, type, alias);
            deviceMap.add(res);
        }

        ObjectMapper objectMapper = new ObjectMapper();

        String json = null;
        try {
            json = objectMapper.writeValueAsString(deviceMap);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        ret.put("value", json);
        return ret;
    }
}