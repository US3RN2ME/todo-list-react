import { action, computed, makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

interface ITodo {
    id: string;
    text: string;
    parent?: string;
    isComplete?: boolean;
}

type todo = {
    text: string;
    isComplete?: boolean;
};
type valueType = Map<string, todo>;

class TodoListStore {
    readonly todos = new Map<string, valueType>();

    constructor() {
        makeAutoObservable(this);
        this.readFromLocalStorage();
    }

    static isValid(text: string) {
        return text && !/^\s*$/.test(text);
    }

    @computed
    public getTodos(title: string) {
        return Array.from(this.getStore(title), ([key, val]) => ({
            id: key,
            ...val,
        })).reverse() as ITodo[];
    }

    @computed
    public getAllTodos() {
        return Array.from(this.todos, (v) =>
            Array.from(v[1], ([key, val]) => ({
                id: key,
                parent: v[0],
                ...val,
            }))
        )
            .flat()
            .reverse() as ITodo[];
    }

    @action
    public addTodo(text: string, title: string) {
        if (!TodoListStore.isValid(text)) return;
        this.getStore(title).set(uuid(), { text });
        this.saveToLocalStorage();
    }

    @action
    public removeTodo(todoId: string, title: string) {
        this.getStore(title).delete(todoId);
        this.saveToLocalStorage();
    }

    @action
    public removeTodos(title: string) {
        if (this.todos.delete(title)) {
            this.saveToLocalStorage();
        }
    }

    @action
    public editTodo(todoId: string, text: string, title: string) {
        if (!TodoListStore.isValid(text)) return;
        this.getStore(title).set(todoId, { text });
        this.saveToLocalStorage();
    }

    @action
    public completeTodo(todoId: string, title: string) {
        const item = this.getStore(title).get(todoId) as todo;
        if (!item) console.log(this.getStore(title));
        item.isComplete = !item.isComplete;
        this.getStore(title).set(todoId, item);
        this.saveToLocalStorage();
    }

    @action
    private getStore(title: string) {
        const value = this.todos.get(title);
        return (
            value ? value : this.todos.set(title, new Map()).get(title)
        ) as valueType;
    }

    private saveToLocalStorage() {
        localStorage.todoListItems = JSON.stringify(this.todos);
    }

    private readFromLocalStorage() {
        const data = localStorage.todoListItems;
        if (data) {
            JSON.parse(data).forEach((v: any) => {
                this.todos.set(v[0], new Map<string, todo>(v[1]));
            });
        }
    }
}

const todoListStore = new TodoListStore();

export default todoListStore;
export type { ITodo };
