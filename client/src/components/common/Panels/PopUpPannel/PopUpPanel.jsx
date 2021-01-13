import React from 'react';
import s from './PopUpPanel.module.css'
import Button from "../../Button/Button";
import Input from "../../Input/Input";

const PopUpPanel = ({text, confirmText, declineText}) => {
  return (
    <div className={s.backInBlack}>
      <div className={s.panelContainer}>
        <div className={s.textSection}>
          <p>{text || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dolor illo iusto pariatur recusandae voluptatum!'}</p>
        </div>
        <div className={s.actionSection}>
          <Input inputType='input' value='' placeholderText='input text here'/>
          <Button text='Lorem.' side='left'/>
          <Button text='Ipsum.' side='right'/>
        </div>
      </div>
    </div>
  )
}

export default PopUpPanel;