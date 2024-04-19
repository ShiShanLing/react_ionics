//
//  EchoPlugin.swift
//  App
//
//  Created by 石山岭 on 2024/3/5.
//

import Foundation
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin {
    @objc func openWkWebView(_ call: CAPPluginCall){
        print("openWkWebView===call---", call);
        guard let value = call.getString("value") else {
            call.resolve(["value": "error:url不能为空"])
            return;
        }
        print("openWkWebView===", value)
        if(value == "0"){
            DispatchQueue.main.async {
                guard let window = UIApplication.shared.windows.first else {
                    return;
                }
           
                print("openWkWebView333-", window.rootViewController ?? "空的3")
                print("openWkWebView444-", window)
                let wkWebView = WKWebViewController()
                /*
                 https://wxm-dev.igskapp.com/MealH5/P/Food/ChoosePreApproval?UserId=sss31597
                 https://wxm-dev.igskapp.com/MealH5/P/Order/Index1?UserId=sss31597
                 */
                let tempURL = "https://wxm-dev.igskapp.com/MealH5/P/Food/ChoosePreApprovalForCRM?UserId=sss31597"
                wkWebView.urlStr = tempURL;
            
                wkWebView.modalPresentationStyle = .fullScreen
                wkWebView.modalTransitionStyle = .coverVertical
                window.rootViewController?.present(wkWebView, animated: true);
            }
        }else{
            DispatchQueue.main.async {
                guard let window = UIApplication.shared.windows.first else {
                    return;
                }
                
           
                print("openWkWebView333-", window.rootViewController ?? "空的3")
                print("openWkWebView444-", window)
                let wkWebView = WKWebViewController()
                /*
                 
                 https://wxm-dev.igskapp.com/MealH5/P/Food/ChoosePreApproval?UserId=sss31597
                 https://wxm-dev.igskapp.com/MealH5/P/Order/Index1?UserId=sss31597
                 https://wxm-dev.igskapp.com/MealH5/P/Order/IndexTest?UserId=sss31597
                 https://wxm-dev.igskapp.com/MealH5/P/Order/IndexForCRM?UserId=sss31597
                 */
                let tempURL = "https://wxm-dev.igskapp.com/MealH5/P/Order/IndexForCRM?UserId=sss31597"
                wkWebView.urlStr = tempURL;
                wkWebView.modalPresentationStyle = .fullScreen
                wkWebView.modalTransitionStyle = .coverVertical
                window.rootViewController?.present(wkWebView, animated: true);
            }
        }
        
      
   
    }
}
