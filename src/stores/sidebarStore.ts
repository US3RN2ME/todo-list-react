import {action, computed, makeAutoObservable} from "mobx";

interface ISidebarItem {
    title: string,
    path: string
}


class SidebarStore {
    private _items = new Map<string, string>();

    constructor() {
        makeAutoObservable(this);
        this.readFromLocalStorage();
    }

    @action
    getValue(key: string) {
        return this._items.get(key);
    }

    @action
    public removeItem(path: string) {
        if(this._items.delete(path)) {
            this.saveToLocalStorage()
        }
    }

    @action
    public addItem(title: string) {
        const key = "/" + title.toLowerCase().replaceAll(" ", "_");
        if(!this._items.get(key)) {
            this._items.set(key, title);
            this.saveToLocalStorage()
        }
        return key;
    }

    @computed
    public getItems() {
        return Array.from(this._items, ([key, val]) =>
           ({ path: key, title: val })) as ISidebarItem[];
    }

    private saveToLocalStorage() {
        localStorage.setItem('sidebarItems', JSON.stringify(this._items));
    }

    private readFromLocalStorage() {
        const data = localStorage.getItem('sidebarItems')
        if(data) {
            this._items = new Map<string, string>(JSON.parse(data));
        } else {
            this._items.set("/", "Home");
        }
    }
}

const sidebarStore = new SidebarStore();

export default sidebarStore;

export type {ISidebarItem}