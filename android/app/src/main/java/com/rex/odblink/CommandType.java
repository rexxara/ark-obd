package com.rex.odblink;

public enum CommandType {
    RPM("RPM"),
    SPEED("SPEED"),
    VIN("VIN");

    private final String value;

    CommandType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}