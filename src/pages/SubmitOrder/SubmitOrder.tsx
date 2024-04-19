//订单提交页面

import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput,
  IonPage, IonTitle, IonToolbar, IonPicker, IonModal, IonLabel, IonTextarea, IonRadio, IonRadioGroup, IonToggle, IonFab, IonFabButton, IonFabList, IonActionSheet, IonCheckbox, IonGrid, IonRow
} from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { chevronBackOutline, eye, chevronForwardOutline, chevronDownCircle, colorPalette, globe } from 'ionicons/icons'
{/* <ion-icon name="chevron-forward-outline"></ion-icon> */ }
import { useHistory } from 'react-router'
import './SubmitOrder.scss'
import DateSelect from '../../components/date-select/date-select'
import { format } from 'date-fns';
import { CascadePicker, Picker } from 'antd-mobile';

import { cityInfo } from './dataSource';
interface UserDataModel {
  //姓名
  name: string
  //性别 0 女 1男
  gender: string
  //会议状态 已婚/未婚
  maritalState: string
  //电话
  photo: string
  //生日
  birthday: Date | null
  //收货地址省市县
  address: string
  //地址详情
  detailAddress: string
  //设置为默认收货地址
  setDefaultAddress: boolean
  //附加服务 比如一年包退.2年包退.3年包退,碎屏险,交通意外险
  otherServices: string[]
}

const SubmitOrderPage: React.FC = () => {

  //页面跳转使用
  const history = useHistory();
  //生日选择器高度获取
  const modal = useRef<HTMLIonModalElement>(null);
  //生日选择器高度获取
  const dateSelectRef = useRef<HTMLIonContentElement>(null);
  //生日选择器是否打开
  var [dateSelectOpen, setDateSelectOpen] = useState(false);
  //城市选择Picker是否展示
  const [cityPickerVisible, setCityPickerVisible] = useState(false);
  //表单用户填写的数据
  var [userData, setUserData] = useState<UserDataModel>({
    name: '',
    gender: '',
    maritalState: '',
    photo: '',
    birthday: null,
    address: '',
    detailAddress: '',
    setDefaultAddress: false,
    otherServices: [],
  })
  //想办法获取组件的高度--后续在写
  useEffect(() => {
    console.log("useEffect");
    if (dateSelectRef.current) {
      const height = dateSelectRef.current.clientHeight;
      console.log('组件的高度为：', height);
    }
  })
  //选择生日日历发生变化
  function onBirthdayDateChange(event: any) {
    setUserData((prevUser) => ({
      ...prevUser,
      birthday: event
    }));
    console.log("onBirthdayDateChange--", event);
  }

  //用户选择附加服务

  //获取当前提交按钮是否可用 也就是表单是否有效
  function formIsValid() {
    if (userData.name.length &&
      userData.gender.length &&
      userData.maritalState.length &&
      userData.photo.length &&
      userData.birthday &&
      userData.address &&
      userData.detailAddress) {
      return true;
    } else {
      return false;
    }

  }

  return (
    <IonPage className='container'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={() => { history.replace('/Home') }}>
              <IonIcon icon={chevronBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className='nav-bar-title'>订单提交</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className='content-box'>
          {/* 姓名 */}
          <div className='item-box'>
            <div className='required-symbol'>*</div>
            <IonInput className='text-input' label="姓名" placeholder='请输入你的姓名' value={userData.name}
              onIonChange={(event) => {
                console.log('姓名', event.detail.value);
                setUserData((prevUser) => ({
                  ...prevUser,
                  name: event.detail.value ?? ''
                }));
              }}
            ></IonInput>
          </div>
          {/* 性别 */}
          <div className='item-box'>
            <div className='address-row' style={{ height: '66px' }}>
              <div className='required-symbol'>*</div>
              <IonRadioGroup  className='gender-radio' onIonChange={(data)=>{
                console.log("性别发生改变", data.detail.value);
                setUserData((oldUserData)=>({
                    ...oldUserData,
                    gender:data.detail.value == 0?"女性":"男性"
                }))
              }}>
                <IonRadio value="1" labelPlacement='end'>男士</IonRadio>
                <IonRadio value="0" className='item' labelPlacement='end'>女士</IonRadio>
              </IonRadioGroup>
            </div>
          </div>
          {/* 电话 */}
          <div className='item-box'>
            <div className='required-symbol'>*</div>
            <IonInput className='text-input'
              label="电话"
              placeholder='请输入你的电话'
              value={userData.photo}
              onIonChange={(event) => {
                setUserData((prevUser) => ({
                  ...prevUser,
                  photo: event.detail.value ?? ''
                }));
              }}
            ></IonInput>
          </div>
          {/* 生日 */}
          <div className='item-box' id="open-modal" onClick={() => {
            setDateSelectOpen(true)
            console.log("dateSelectRef.current.clientHeight==", dateSelectRef.current?.clientHeight);
          }}>
            <div className='required-symbol'>*</div>
            <div className='title'>生日</div>
            <div className={`content-text ${userData.birthday ? '' : 'text-default'}`}>{userData.birthday ? format(userData.birthday, 'yyyy-MM-dd') : '请选择你的生日'}</div>
            <div className='flex-1'></div>
            <IonButton fill="clear" slot="end" disabled={true} aria-label="Show/hide">
              <IonIcon slot="icon-only" style={{ color: 'black' }} icon={chevronForwardOutline} aria-hidden="true"></IonIcon>
            </IonButton>
          </div>
          {/* 婚姻状态 */}
          <div className='item-box' id="open-marital-status-selector" onClick={() => {

          }}>
            <div className='required-symbol'>*</div>
            <div className='title'>婚姻状态</div>
            <div className={`content-text ${userData.maritalState ? '' : 'text-default'}`}>{userData.maritalState ? userData.maritalState : '请选择你的婚姻状态'}</div>
            <div className='flex-1'></div>
            <IonButton fill="clear" slot="end" disabled={true} aria-label="Show/hide">
              <IonIcon slot="icon-only" style={{ color: 'black' }} icon={chevronForwardOutline} aria-hidden="true"></IonIcon>
            </IonButton>

          </div>
          {/* 收货地址 */}
          <div className={`item-box address-box`}>
            <div className='address-row' onClick={() => {
              setCityPickerVisible(true)
            }}>
              <div className='required-symbol'>*</div>
              <div className='title'>地址</div>
              <div className={`content-text 
              ${userData.address.length ? '' : 'text-default'}`}>
                {userData.address.length ? userData.address : '请选择你的收货地址'}
              </div>
              <div className='flex-1'></div>
              <IonButton fill="clear" slot="end" disabled={true} aria-label="Show/hide">
                <IonIcon slot="icon-only" style={{ color: 'black' }} icon={chevronForwardOutline} aria-hidden="true"></IonIcon>
              </IonButton>
            </div>
            <div className='address-row'>
              <div className='required-symbol' style={{ height: '20px' }}>*</div>
              <IonTextarea
                style={{ marginLeft: '8px' }}
                label="详情"
                placeholder="街道信息"
                onIonChange={(data) => {
                  setUserData((prevUser) => ({
                    ...prevUser,
                    detailAddress: data.detail.value ?? ''
                  }));
                }}
                value={userData.detailAddress}></IonTextarea>
            </div>



            <div className='address-row'>
              <IonToggle labelPlacement="end" onIonChange={(data) => {

                console.log("设置默认收货地址", data);
                setUserData((prevuser) => ({
                  ...prevuser,
                  setDefaultAddress: data.detail.checked
                }))
              }} className='setDefaultShippingAddress'>设置为默认收货地址</IonToggle>
            </div>


          </div>
          {/* 附加服务多选 */}
          <div className={`item-box`}>

            <div className='other-services-box'>
              <div className='title'>附加服务</div>
              <div className='other-services' >
                <IonGrid>
                  <IonRow>
                    <IonCheckbox onIonChange={(data) => {
                      //如果是选中,就添加到数组
                      if (data.detail.checked) {

                      } else {
                        //否则就移除
                      }
                      console.log('一年上门维修', data);
                    }} labelPlacement="end" className='item' value='一年上门维修'>一年上门维修</IonCheckbox>
                    <IonCheckbox labelPlacement="end" className='item' value='一年无条件退货'>一年无条件退货</IonCheckbox>
                    <IonCheckbox labelPlacement="end" className='item' value={'十年保修'}>十年保修</IonCheckbox>
                    <IonCheckbox labelPlacement="end" className='item' value={'三年屏保'}>三年屏保</IonCheckbox>
                    <IonCheckbox labelPlacement="end" className='item' value={'五年专属客服'}>五年专属客服</IonCheckbox>
                  </IonRow>
                </IonGrid>
              </div>
            </div>

          </div>
          <IonButton disabled={!formIsValid()} onClick={() => {
            //跳转到支付页面
            console.log('userData=====', userData);
            history.push('/PayPage');
          }}>Submit</IonButton>
          <IonButton onClick={() => {
            console.log('userData=====', userData);
            history.push('/PayPage');
          }}>查看当前数据</IonButton>
        </div>
      </IonContent>
      {/* 城市选择组件 */}
      <CascadePicker
        title='选择城市'
        options={cityInfo}
        visible={cityPickerVisible}
        onClose={() => {
          setCityPickerVisible(false)
        }}
        onConfirm={(val, extend) => {
          console.log('onConfirm', val)
          const result = val.join(',');
          console.log("result==", result);
          setUserData((prevUser) => ({
            ...prevUser,
            address: result
          }));

        }}
        onSelect={val => {
          console.log('onSelect', val)
        }}
      />
      {/* 生日选择组件 */}
      <IonModal
        isOpen={dateSelectOpen}
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={0.5}
        breakpoints={[0, 0.5]}
        onWillDismiss={() => {
          if (dateSelectOpen) { setDateSelectOpen(false) }
        }}
      >
        {/* 生日选择组件 */}
        <IonContent className="ion-padding" ref={dateSelectRef}>
          <DateSelect onDateChange={onBirthdayDateChange} onCancel={() => {
            setDateSelectOpen(false);
          }} onConfirm={() => {
            setDateSelectOpen(false)
          }}></DateSelect>
        </IonContent>
      </IonModal>
      {/* 婚姻状态选择 */}
      <IonActionSheet
        trigger="open-marital-status-selector"
        header="选择婚姻状态"
        onDidDismiss={(detail) => {
          console.log("选择婚姻状态===", detail.detail);

          

          if (detail.detail.data && detail.detail.data.action != '取消') {
            setUserData((prevUser) => ({
              ...prevUser,
              maritalState: detail.detail.data.action
            }));
          }
        }}
        buttons={[
          {
            text: '未婚',
            role: 'destructive',
            data: {
              action: '未婚',
            },
          },
          {
            text: '已婚未育',
            data: {
              action: '已婚未育',
            },
          },
          {
            text: '已婚已育',
            data: {
              action: '已婚已育',
            },
          },
          {
            text: '取消',
            role: 'cancel',
            data: {
              action: '取消',
            },
          },
        ]}
      ></IonActionSheet>
    </IonPage>

  )
}


/*
姓名
手机号
生日:日期选择器 日历类型的选择器
地址:地址选择器  - 省市区
详细地址::输入框
男还是女:单选
已婚/未婚:下拉菜单选择
附加服务:多选
填写进度:一个进度条代表当前用户填写了多少信息了
设置为默认地址:开关-Toggle


*/

export default SubmitOrderPage