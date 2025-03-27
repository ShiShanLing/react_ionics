import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/react'
import React, { useState } from 'react'
import './HTMeal.scss'
import { chevronBackOutline } from 'ionicons/icons';
import Echo from './capacitor';

const HTMeal: React.FC = () => {
    const [view, setView] = useState<any>(undefined);
    async function openWebView(index:number) {
        console.log("开始订餐");
        const { value } = await (Echo as any).openWkWebView({ value: `${index}` });
        console.log('Response from native:', value);
        // setView(value);
        // alert(value)
        // 
        //https://chat.openai.com/g/g-hGv5OZZDC-paper-review-pro
        // let result = await WebBrowser.openBrowserAsync('https://www.example.com');
        // console.log(result);
        /*
        const { value } = await Echo.echo({ value: 'Hello World!' });
        console.log('Response from native:', value);
        //
        */
    }
    return (
        <div>
            <IonPage className='container'>
                <IonHeader >
                    <IonButtons slot='start'>
                        {/* <IonButton onClick={() => {
                            openWebView();
                        }}>
                            打开网页
                        </IonButton> */}
                    </IonButtons>
                    <IonToolbar color="custom-toolbar-color" >
                        <IonTitle className='nav-bar-title'>This is the CRM page</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='content'>
                    <div className='box'>
                    <IonButton onClick={() => {
                            openWebView(0);
                        }}>
                            查看二维码
                        </IonButton>
                    </div>
             
                    <iframe title='test' src='https://mp.weixin.qq.com/' width="100%" height="100%" ></iframe>
                </IonContent>
            </IonPage>
        </div>
    )
}
export default HTMeal;


