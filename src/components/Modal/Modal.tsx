import React from 'react';
import { observer } from 'mobx-react'
import { AiOutlineClose } from 'react-icons/ai'
import modalStore from '../../stores/modalStore'
import InputForm from '../InputForm/InputForm'
import "./Modal.css"


const Modal = () => {
   const handleSubmit = (text: string) => {
      modalStore.handleSubmit(text);
      modalStore.hide();
   }

   return (
      <div className={modalStore.active ? "modal active" : "modal"}
           onClick={() => modalStore.hide()}>
         <div className={modalStore.active ? "modal-content active" : "modal-content"}
              onClick={e => e.stopPropagation()}>
            <AiOutlineClose className="modal-close"
                            onClick={() => modalStore.hide()}
            />
            <h1 className="modal-header">{modalStore.header}</h1>
            <InputForm handleSubmit={handleSubmit}/>
         </div>
      </div>
   );
};

export default observer(Modal);