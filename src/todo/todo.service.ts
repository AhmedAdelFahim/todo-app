import { FilterQuery } from 'mongoose';
import { IToDo } from './todo.interface';
import Todo from './todo.model';
import { NotFoundException } from 'expressjs-errors-handler';

export async function create(todo: IToDo) {
  const insertedTodo = await Todo.create(todo);
  return insertedTodo;
}

export async function getOne(filter: FilterQuery<IToDo>) {
  const todo = await Todo.findOne(filter);
  if (!todo) {
    throw new NotFoundException([
      {
        message: 'not found',
        code: 'NOT_FOUND',
      },
    ]);
  }
  return todo;
}

export async function getAll(filter: FilterQuery<IToDo>) {
  const todoList = await Todo.find(filter);
  return todoList;
}

export async function update(filter: FilterQuery<IToDo>, data: IToDo) {
  return Todo.updateOne(filter, data);
}

export async function deleteOne(filter: FilterQuery<IToDo>) {
  return Todo.deleteOne(filter);
}
