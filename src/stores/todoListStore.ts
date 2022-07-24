import {action, computed, makeAutoObservable} from "mobx";
import { v4 as uuid } from 'uuid';

interface ITodo {
    id: string,
    text: string,
    isComplete?: boolean
}

type todo = {
    text: string,
    isComplete?: boolean
}
type valueType = Map<string, todo>;
type storeType = Map<string, valueType>;

class TodoListStore {
    private todos: storeType;

    constructor() {
        makeAutoObservable(this);
        this.todos = new Map<string, Map<string, todo>>();
    }

    static isValid(text: string) {
        return text && !/^\s*$/.test(text);
    }

    @computed
    public getTodos(title: string) {
        return Array.from(this.getStore(title),
            ([key, val]) => ({id: key, ...val})
        ).reverse() as ITodo[];
    }

    @computed
    public getAllTodos() {
        return Array.from(this.todos.values(), v =>
            Array.from(v, ([key, val]) =>
                ({id: key, ...val}))
        ).flat().reverse() as ITodo[];
    }

    @action
    public addTodo(text: string, title: string) {
        if(!TodoListStore.isValid(text)) return;
        this.getStore(title).set(uuid(), {text});
    }

    @action
    public removeTodo (todoId: string, title: string) {
        this.getStore(title).delete(todoId);
    }

    @action
    public editTodo (todoId: string, text: string, title: string) {
        if(!TodoListStore.isValid(text)) return;
        this.getStore(title).set(todoId, {text});
    }

    @action
    public completeTodo (todoId: string, title: string) {
        const item = this.todos.get(title)?.get(todoId) as ITodo;
        item.isComplete = !item.isComplete;
        this.getStore(title).set(todoId, item);
    }

    @action
    private getStore(title: string) {
        const value = this.todos.get(title);
        return (value
                ? value
                : this.todos.set(title, new Map()).get(title)
        ) as valueType;
    }
}

const todoListStore = new TodoListStore();

export default todoListStore;
export type {ITodo}