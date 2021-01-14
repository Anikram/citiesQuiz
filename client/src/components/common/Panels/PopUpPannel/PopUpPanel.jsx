import React, {useState} from 'react';
import s from './PopUpPanel.module.css'
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";

const PopUpPanel = ({wDropdown, dropdownText ,text, confirmText, declineText, onSuccess, onDecline}) => {
  const [region, setRegion] = useState('Europe');

  return (
    <div className={s.backInBlack}>
      <div className={s.panelContainer}>
        <div className={s.textSection}>
          <p>{text || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dolor illo iusto pariatur recusandae voluptatum!'}</p>
        </div>
        { !wDropdown || <InputGroup className="mb-3 col-10 mx-auto">
          <DropdownButton
            as={InputGroup.Prepend}
            variant="outline-secondary"
            title={`${dropdownText}`}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#" onClick={() => {setRegion('Europe')}}>Europe</Dropdown.Item>
          </DropdownButton>
          <FormControl aria-describedby="basic-addon1" defaultValue={region}/>
        </InputGroup>
        }

        <div className={s.actionSection}>
          <Button addClass={'btn btn-success'} cb={(region) => onSuccess(region)} value={region} text={confirmText || 'Lorem.'} side='left'/>
          <Button addClass={'btn btn-warning'} cb={onDecline} text={declineText || 'Ipsum.'} side='right'/>
        </div>
      </div>
    </div>
  )
}

export default PopUpPanel;