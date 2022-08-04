import { action, makeAutoObservable } from 'mobx'

class ModalStore {
   private _handleSubmit: (text: string) => void;
   private _header: string;

   constructor() {
      makeAutoObservable(this);
      this._handleSubmit = () => {}
      this._header = "";
   }

   public get header() {
      return this._header;
   }

   public get handleSubmit() {
      return this._handleSubmit;
   }

   @action
   public show(header: string, handleSubmit: (text: string) => void) {
      this._handleSubmit = handleSubmit;
      this._header = header;
   }

}

const modalStore = new ModalStore();

export default modalStore;