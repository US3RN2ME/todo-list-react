import { observable } from 'mobx';

const modalStore = {
    handleSubmit: (value: string) => {},
    header: '',
};

export default observable(modalStore);
