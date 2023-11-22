import express from 'express';
import * as todoController from '../controllers/todo.controller';

const todoRouter = express.Router();

todoRouter.post('/create-todo', todoController.createToDo);
todoRouter.post('/get-todos', todoController.getTodo);
todoRouter.post('/update-todo', todoController.updateTodo);
todoRouter.post('/delete-todo', todoController.deleteTodo);

export default todoRouter;
