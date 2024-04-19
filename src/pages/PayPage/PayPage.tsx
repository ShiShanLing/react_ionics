import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonContent, IonHeader, IonIcon, IonPage, IonRadio, IonRadioGroup, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { chevronBackOutline} from 'ionicons/icons'
import './PayPage.scss'
const PayPage: React.FC = () => {

  const history = useHistory();
  //支付方式 {title:'', icon:''},
  const payType = [
    [
      { title: '微信', icon: 'icon-zhifu-weixinzhifu' , key:'微信'},
      { title: '支付宝', icon: 'icon-zhifubaozhifu4' , key:'支付宝'},
      { title: '花呗', icon: 'icon-huabei1', key:'花呗' },
      { title: '余额', icon: 'icon-yue', key:'余额' },
    ],
    //银行卡
    [
      { title: '招商银行', icon: 'icon-zhaoshangyinhang1' , key:'招商银行'},
      { title: '中国人民银行', icon: 'icon-zhongguorenminyinhang1', key:'中国人民银行' },
    ],
    //信用卡
    [
      { title: '招商信用卡', icon: 'icon-zhaoshangyinhang1', key:'招商信用卡' },
      { title: '民生信用卡', icon: 'icon-yinhang-minsheng', key:'民生信用卡' },
      { title: '浦发信用卡', icon: 'icon-pufayinhang', key:'浦发信用卡' },
    ],
    //其他
    [
      { title: '添加银行卡', icon: 'icon-tianjiayinhangqia', key:'添加银行卡' },
    ]
  ]
  //
  //需要有个数组记录当前选择的支付方式   
  const [currentPayType, setCurrentPayType] = useState('微信');

  function getCardList() {

    var cardList: any[] = [];
    console.log("刷新---11-");
    console.log('currentPayType', currentPayType);
    var  i = 0;
    payType.forEach((datas) => { 
      
      var contentList: any[] = [];
      // console.log(datas);
      datas.forEach(((value) => {
        //
        /*
          
        */
        contentList.push(
          <IonCardContent key={value.title} onClick={()=>{
            if (value.title == '添加银行卡'){
                //跳转到添加银行卡
            }else{
              setCurrentPayType(value.title)
            }
            
          }}>
            <i className={`iconfont ${value.icon}`}></i>
            <IonText className='pay-type-name'>{value.title}{value.title == '余额'?': 304.5元':''}</IonText>
            <div className='space-flex'></div>
            <IonCheckbox className={`check-box ${value.title == '添加银行卡' ? 'check-hide':''}`} checked={currentPayType == value.title} labelPlacement="end"></IonCheckbox>
          </IonCardContent>
        )
      }))


      cardList.push(
        <IonCard key={i} className='card'>
          {contentList}
        </IonCard>
      )
      i++;
    })

    return cardList;
  }
  
  return (
    <IonPage className='container'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={() => { history.replace('/SubmitOrderPage') }}>
              <IonIcon icon={chevronBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className='nav-bar-title'>支付页面</IonTitle>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* 内容 */}
      <IonContent>
        {getCardList()}
        <div className='pay-now-box'>
            <IonButton className='pay-now'>立即支付</IonButton>
        </div>
        
      </IonContent>
    </IonPage>
  )
}

export default PayPage;