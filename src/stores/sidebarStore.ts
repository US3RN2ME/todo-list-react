import {action, computed, makeAutoObservable} from "mobx";

interface ISidebarItem {
    title: string,
    path: string
}

class SidebarStore {
    private items = new Map<string, string>();

    constructor() {
        makeAutoObservable(this);
        this.items.set("/", "Home");
    }

    @action
    public addItem(title: string) {
        const key = "/" + title.toLowerCase();
        if(!this.items.get(key)) {
            this.items.set(key, title);
        }
    }

    @computed
    public getItems() {
        return Array.from(this.items, ([key, val]) =>
            ({ path: key, title: val })) as ISidebarItem[];
    }
}

const sidebarStore = new SidebarStore();

sidebarStore.addItem("Todo1");

export default sidebarStore;

export type {ISidebarItem}