//
//  SSLWKWebView.swift
//  App
//
//  Created by 石山岭 on 2024/3/5.
//

import UIKit
import WebKit

class SSLWKWebView: UIView, WKNavigationDelegate, WKUIDelegate {
    var wkWebview:WKWebView!;
    var activityIndicator:UIActivityIndicatorView = UIActivityIndicatorView(style: .large);
    init(frame: CGRect,urlStr: String) {
        super.init(frame: frame)
        let con = WKWebViewConfiguration()
        con.applicationNameForUserAgent = "iGSK"

        let wkUController = WKUserContentController()
        con.allowsInlineMediaPlayback = true
        con.allowsPictureInPictureMediaPlayback = true
        con.userContentController = wkUController

        // Create WKWebView with the configuration
        self.wkWebview = WKWebView(frame: .zero, configuration: con)
        wkWebview.scrollView.bounces = false
        wkWebview.navigationDelegate = self
        wkWebview.uiDelegate = self
        wkWebview.allowsBackForwardNavigationGestures = true
        wkWebview.allowsLinkPreview = true

        wkWebview.scrollView.contentInsetAdjustmentBehavior = .never;
        wkWebview.scrollView.sizeToFit();
        self.wkWebview.frame = CGRect(x: self.frame.width/4, y: 0, width: self.frame.width/2, height: self.frame.height)
        self.addSubview(self.wkWebview)
        // Set autoresizing mask for WKWebView
        self.wkWebview.autoresizingMask = .flexibleWidth
        let request = URLRequest(url: URL(string: urlStr)!)
        self.wkWebview.load(request)
            // 在这里进行其他自定义的初始化操作
        
        activityIndicator.center = self.center;
        activityIndicator.color = UIColor.systemBlue
        self.addSubview(activityIndicator);
//        activityIndicator.startAnimating();
        // 添加观察者以监测 canGoBack 属性的变化
        wkWebview.addObserver(self, forKeyPath: #keyPath(WKWebView.canGoBack), options: .new, context: nil)
    }
    
    // 在观察者方法中处理 canGoBack 的变化
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == #keyPath(WKWebView.canGoBack) {
            // 根据 canGoBack 属性的值来显示或隐藏返回按钮
           
        }
    }
    override init(frame: CGRect) {
        super.init(frame: frame);
        
    }
    
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    // 创建 WKWebView 的一些代理方法
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
//        if !navigationAction.targetFrame?.isMainFrame ?? false {
//            webView.load(navigationAction.request)
//        }
        return nil
    }

    // 开始加载
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation) {
        activityIndicator.startAnimating()
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
        activityIndicator.stopAnimating()
    }

    // 加载失败
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation, withError error: Error) {
        print("网页加载失败")
        activityIndicator.stopAnimating()
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
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */

}
