import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave, withIonLifeCycle, IonicSlides, IonGrid, IonRow, IonCol, IonIcon, IonImg, RouteManagerContext, IonRouterOutlet, IonItem, IonRouterLink, IonCard } from '@ionic/react';
import './Home.scss';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';
import { Autoplay, Pagination } from 'swiper/modules';
import {
  logoIonic, beerOutline, bagAdd, beaker, carSport, card, earth, fish,
  gameController, phonePortrait, shield, thunderstorm, train, shirt
} from 'ionicons/icons';
import {useHistory } from 'react-router';





//功能组件生命周期
const Home: React.FC = () => {
  const history = useHistory();
  const [isRed, setIsRed] = useState(false);
  const [pageNum, setPageNum] = useState(0);

  function onSlideChange(swiper: any) {
    // console.log("onSlideChange--", onSlideChange, swiper);

  }
  useIonViewDidEnter(() => {
    console.log("window.innerWidth==", window.innerWidth);

  })

  function getGoodsList() {
    console.log("getGoodsList==", history);
    
    var list = [];
    for (const key in dataSource) {

      list.push(
        <div key={key} className='goods-item' onClick={()=>{history.push('/SubmitOrderPage')}}>
          <IonImg className='goods-image' src='image/goods.png'></IonImg>
          <div className='goods-name'>3年保修|九阳牌电磁炉就是好用,7天无条件退款</div>
          <div className='goods-des'>一键烹饪|定时停止|过热保护</div>
          <div className='price-box'>
            <div className='goods-price'>¥128.9</div>
            <div className='price-des'>| 历史最低价</div>
          </div>
          {
            /*
            SubmitOrderPage
            <IonRouterLink></IonRouterLink>
            */
          }
        </div>



      )


    }
    return list;
  }

  const dataSource = ['1', '2', '3', '4', '5', '6', '7']

  var applicationDatas = [
    [{ name: '聚餐', icon: beerOutline }, { name: '购物', icon: bagAdd },
    { name: '实验', icon: beaker }, { name: '出行', icon: carSport },
    { name: '钱包', icon: card }, { name: '环球', icon: earth },
    { name: '垂钓', icon: fish }, { name: '娱乐', icon: gameController },
    { name: '手机', icon: phonePortrait }, { name: '安全中心', icon: shield }
    ]
    , [
      { name: '天气', icon: thunderstorm }, { name: '火车', icon: train }, , { name: '衣服', icon: shirt }
    ],
  ]

  function getApplicationList() {
    var appList: any[] = [];

    applicationDatas.forEach((list) => {


      var items: JSX.Element[] = [];

      list.forEach((item) => {
        items.push(
          <div className='application-item'>
            <IonIcon className='icon' icon={item?.icon} color="primary"></IonIcon>
            <div className='title'>{item?.name}</div>
          </div>
        )
      })

      appList.push(
        <SwiperSlide >
          <IonGrid>
            <IonRow>
              {items}
            </IonRow>
          </IonGrid>
        </SwiperSlide>
      )
    })
    return appList;
  }

  function applicationPageChange(swiper: any) {
    console.log("applicationPageChange---", swiper.activeIndex);
    setIsRed(true);
    setPageNum(swiper.activeIndex)

  }


  return (
    <IonPage className='container'>

      <IonHeader>
        <IonToolbar>
          <IonTitle className='nav-bar-title'>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        {/* 轮播组件 */}
        <Swiper className='ad-swiper'
          modules={[Autoplay, Pagination]}
          loop={true}
          spaceBetween={3}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={true}
          onSlideChange={(swiper) => onSlideChange(swiper)}>
          <SwiperSlide className='swiper-slide'>
            {/* 这里 需要一个label*/}
            <img src='image/slide1.jpeg'></img>
            <div className='subTitle'>这是轮播图1</div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slide'>
            <img src='image/slide2.jpeg'></img>
            <div className='subTitle'>这是轮播图2</div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slide'>
            <img src='image/slide3.jpeg'></img>
            <div className='subTitle'>这是轮播图3</div>
          </SwiperSlide>
        </Swiper>
        {/* 应用列表 */}
        <Swiper className={'application-swiper'} 
        resistanceRatio={0} 
        onSlideChange={(swiper) => applicationPageChange(swiper)}>
          {getApplicationList()}
        </Swiper>
        <div className='application-sliding-indication-box'>
          <div className='indication-box'>
            <div className='indication-bar' style={{ marginLeft: pageNum * 50 + 'px' }}></div>
          </div>
        </div>
        {/* 商品列表 */}
        <IonGrid className='goods-list-box'>
          <IonRow>
            {getGoodsList()}
          </IonRow>
        </IonGrid>
      </IonContent>

    </IonPage>

  );
};

export default Home;

