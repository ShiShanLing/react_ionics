//
//  WKWebViewController.swift
//  App
//
//  Created by 石山岭 on 2024/3/5.
//

import UIKit
import WebKit

class WKWebViewController: UIViewController,WKNavigationDelegate, WKUIDelegate {
    var urlStr = "";
    var wkWebview:WKWebView!;
    var activityIndicator:UIActivityIndicatorView = UIActivityIndicatorView(style: .large);
    let goBackButton = UIButton(type: .system)
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let ContentView = UIView(frame: self.view.frame)
//        ContentView.backgroundColor = .red;
        self.view.addSubview(ContentView);
        let con = WKWebViewConfiguration()
        con.applicationNameForUserAgent = "iGSK"
        
        let customNavBar = UIView(frame: CGRect(x: 0, y: 0, width: ContentView.frame.width, height: 64))
        customNavBar.backgroundColor = UIColor(red: 0, green: 0, blue: 1, alpha: 0.6)
        
        let titleLabel = UILabel()
        titleLabel.text = "HT-Meal"
        titleLabel.textColor = UIColor.white
        titleLabel.frame = CGRect(x: 0, y: 15, width: ContentView.frame.width, height: 44)
        titleLabel.textAlignment = .center
        
        customNavBar.addSubview(titleLabel)
        
        ContentView.addSubview(customNavBar)
        
        
        goBackButton.setTitle("GoBack", for: .normal)
        goBackButton.setTitleColor(.white, for: UIControl.State.normal)
        goBackButton.addTarget(self, action: #selector(goBaclButtonClick), for: .touchUpInside)
        customNavBar.addSubview(goBackButton)
        goBackButton.isHidden = true;
        goBackButton.frame = CGRect(x: 15, y: 30, width: 70, height: 20);
        
        
        let closeButton = UIButton(type: .system)
        
        closeButton.setTitle("ClosePage", for: .normal)
        closeButton.setTitleColor(.white, for: UIControl.State.normal)
        closeButton.addTarget(self, action: #selector(closeButtonClicked), for: .touchUpInside)
        customNavBar.addSubview(closeButton)
        closeButton.frame = CGRect(x: self.view.frame.width-120, y: 20, width: 90, height: 40);
        
        let wkUController = WKUserContentController()
        con.allowsInlineMediaPlayback = true
        con.allowsPictureInPictureMediaPlayback = true
        con.userContentController = wkUController
        //
        // Create WKWebView with the configuration
        //
        self.wkWebview = WKWebView(frame: .zero, configuration: con)
        wkWebview.scrollView.bounces = false
        wkWebview.navigationDelegate = self
        wkWebview.uiDelegate = self
        wkWebview.allowsBackForwardNavigationGestures = true
        wkWebview.allowsLinkPreview = true
        
        wkWebview.scrollView.contentInsetAdjustmentBehavior = .never;
        wkWebview.scrollView.sizeToFit();
        
        self.wkWebview.frame = CGRect(x: 0, y: 0, width: self.view.frame.width, height: self.view.frame.height)
//        self.wkWebview.backgroundColor = .red
//      self.wkWebview.transform = CGAffineTransform(rotationAngle: CGFloat.pi / 2)
        ContentView.addSubview(self.wkWebview)
        // Set autoresizing mask for WKWebView
        self.wkWebview.autoresizingMask = .flexibleWidth
        let request = URLRequest(url: URL(string: urlStr)!)
        self.wkWebview.load(request)
        // 在这里进行其他自定义的初始化操作
        //activityIndicator.startAnimating();
        // 添加观察者以监测 canGoBack 属性的变化
        wkWebview.addObserver(self, forKeyPath: #keyPath(WKWebView.canGoBack), options: .new, context: nil)
        self.view.backgroundColor = UIColor(red: 229, green: 229, blue: 229, alpha: 1);
        self.wkWebview.frame = CGRect(x: view.frame.width/3, y: 64, width: view.frame.width/3, height: view.frame.height - 64)
     
        // Do any additional setup after loading the view.
    }
    
    
    override func viewWillAppear(_ animated: Bool) {
        
  
    }
    
    
    //返回上一页面
    @objc func goBaclButtonClick(){
        wkWebview.goBack();
    }
    
    
    @objc func closeButtonClicked() {
        print("关闭页面按钮被点击了")
        self.dismiss(animated: true)
    }

    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == #keyPath(WKWebView.canGoBack) {
            // 根据 canGoBack 属性的值来显示或隐藏返回按钮
            if wkWebview.canGoBack {
                // 显示返回按钮的逻辑
                goBackButton.isHidden = false;
            } else {
                // 隐藏返回按钮的逻辑
                goBackButton.isHidden = true;
            }
        }
    }

    
    // 开始加载
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation) {
//        activityIndicator.startAnimating()
        print("网页开始加载")
    }

    // 重定向时调用
    func webView(_ webView: WKWebView, didReceiveServerRedirectForProvisionalNavigation navigation: WKNavigation) {
        let str = webView.url?.absoluteString
        print("重定向时调用")
    }

    // 加载成功
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation) {
        print("网页加载成功")
//        activityIndicator.stopAnimating()
    }

    // 加载失败
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation, withError error: Error) {
        print("网页加载失败")
//        activityIndicator.stopAnimating()
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        completionHandler(true)
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        print("runJavaScriptConfirmPanelWithMessage-message=== \(message)")
        completionHandler()
    }

    // 允许所有的导航
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        print("navigationAction.request.URL.scheme=== \(String(describing: navigationAction.request.url))")
        decisionHandler(.allow)
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        decisionHandler(.allow)
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
