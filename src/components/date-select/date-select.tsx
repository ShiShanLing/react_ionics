import React, { useState } from 'react'
import { IonButton, IonDatetime } from '@ionic/react';
import './date-select.scss'

export default function DateSelect({onDateChange, onCancel, onConfirm}:{onDateChange:any, onCancel:any, onConfirm:any}) {
  // return <IonDatetime  max="2024-02-27T23:59:59"></IonDatetime>;
  var tempDate: Date | null = null
  var [selectDate, setSelectDate] = useState<Date | null>(null);

  function selectDateChange(event: any) {
    console.log("selectDateChange==", event.detail.value);
    setSelectDate(event.detail.value)

  }
  //点击确定隐藏页面并且返回选中的数据
  function confirm() {
    onDateChange(selectDate);
    onConfirm();
  }
  //

  function cancel(){
    // onDateChange(null);
    onCancel();
  }


  return (
    <div className='content'>
    <div className='button-box'>

      <IonButton className='cancel' onClick={cancel}>取消</IonButton>
      <div className='space'></div>
      <IonButton className='confirm' disabled={selectDate ? false : true} onClick={confirm}>确定</IonButton>
    </div>

    <IonDatetime presentation="date" onIonChange={selectDateChange}></IonDatetime>
  </div>
  );
}
// export default DateSelect;