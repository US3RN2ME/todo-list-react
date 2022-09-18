import { TodoDto, TodoListDto } from '../generated-api';
import { computed, makeAutoObservable, runInAction } from 'mobx';
import api from './api';

class TodoListController {
    private _todoLists: TodoListDto[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get todoLists(): readonly TodoListDto[] {
        return this._todoLists;
    }

    async addTodo(listId: string, name: string) {
        await api.lists.todolistControllerAddTodo(listId, { name });
        await this.updateFromDB();
    }

    async updateTodo(id: string, name: string) {
        await api.todos.todoControllerUpdateTodo(id, { name });
        await this.updateFromDB();
    }

    async completeTodo(id: string) {
        await api.todos.todoControllerCompleteTodo(id);
        await this.updateFromDB();
    }

    async deleteTodo(id: string) {
        await api.todos.todoControllerDeleteTodo(id);
        await this.updateFromDB();
    }

    async deleteList(title: string) {
        await api.lists.todolistControllerDeleteList(title);
        await this.updateFromDB();
    }

    async addList(title: string) {
        await api.lists.todolistControllerAddList({ name: title });
        await this.updateFromDB();
    }

    @computed
    getListNames() {
        return this._todoLists.map((list) => list.name);
    }

    @computed
    getListByName(title: string) {
        return this._todoLists.find(
            (list) => list.name == title
        ) as TodoListDto;
    }

    @computed
    getListById(id: string) {
        return this._todoLists.find((list) => list.id == id) as TodoListDto;
    }

    @computed
    getTodoById(todoId: string) {
        return this._todoLists.find((list) =>
            list.todos.find((todo) => todo.id == todoId)
        );
    }

    @computed
    getTodosByListId(listId: string) {
        this.getListById(listId).todos;
    }

    @computed
    getAllTodos(): TodoDto[] {
        return this._todoLists
            .map((list) =>
                list.todos.map((todo) => ({
                    parent: list.name,
                    ...todo,
                }))
            )
            .flat();
    }

    async updateFromDB() {
        const { data } = await api.lists.todolistControllerGetLists();
        if (data) {
            runInAction(() => (this._todoLists = data));
        }
    }
}

const todoListController = new TodoListController();

export default todoListController;
