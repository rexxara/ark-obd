package com.rex.odblink;

import android.content.Context;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        Context context = this;
        registerPlugin(EchoPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
