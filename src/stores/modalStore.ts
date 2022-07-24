import { action, makeAutoObservable } from 'mobx'

class ModalStore {
   private _handleSubmit: (text: string) => void;
   private _header: string;
   private _active = false;

   constructor() {
      makeAutoObservable(this);
      this._handleSubmit = () => {}
      this._header = "";
   }

   public get active() {
      return this._active;
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
      this._active = true;
   }

   @action
   public hide() {
      this._active = false;
   }

}

const modalStore = new ModalStore();

export default modalStore;