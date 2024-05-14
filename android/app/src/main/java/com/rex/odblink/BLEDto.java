package com.rex.odblink;

public class BLEDto {
    public  String Name;
    public  String Location;
    public  String Alias;
    public  int DeviceState;
    public  int Type;
    public  BLEDto(String name, String location, int deviceState, int type, String alias) {
        Name = name;
        Location = location;
        DeviceState = deviceState;
        Type = type;
        Alias = alias;
    }
}
