//
//  EchoPlugin.m
//  App
//
//  Created by 石山岭 on 2024/3/5.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
    CAP_PLUGIN_METHOD(openWkWebView, CAPPluginReturnPromise);
)
