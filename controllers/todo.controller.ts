import {Todo} from '../models/todo.model';
import httpErrors from 'http-errors';
import {sequelize} from '../helper/common/init_mysql';
import  { NextFunction, Request, Response } from 'express';
import {todoType} from '../helper/types/todo.type'


const createToDo = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction();
    try {
        const todoDetails: todoType = req.body;
        await Todo.create({
            taskName: todoDetails.taskName,
            date: todoDetails.date
        }, {
            transaction
        })
        await transaction.commit();
        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    message: "todo created successfully",
                },
            });
        }

    } catch (error: any) {
        await transaction.rollback();
        next(error);
    }
}

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoDetails = req.body;
        const query: {where: {id?: string, taskName?: string, date?: string}} = { where: {} };

        if (todoDetails.todoId) {
            query.where.id = todoDetails.todoId
        }
        if (todoDetails.taskName) {
            query.where.taskName = todoDetails.taskName
        }
        if (todoDetails.date) {
            query.where.date = todoDetails.date
        }

        const todo = await Todo.findOne(query)

        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    todo: todo,
                    message: "todo fetched successfully",
                },
            });
        }

    } catch (error: any) {
        next(error);
    }
}

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction();
    try {
        const todoDetails = req.body;
        const todo = await Todo.findOne({
            where: {
                id: todoDetails.todoId,
            }
        })

        if (!todo) {
            throw httpErrors.NotFound(`Todo with id: ${todoDetails.todoId} not exist.`);
        }

        await Todo.update(
            {
                id: todoDetails.taskId,
                taskName: todoDetails.taskName,
                date: todoDetails.date,
            },
            {
                where: {
                    id: todoDetails.taskId
                },
                transaction
            },
        )

        await transaction.commit();

        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    message: "Todo updated successfully",
                },
            });
        }
    } catch (error: any) {
        await transaction.rollback();
        next(error);
    }
}

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction();
    try {
        const todoDetails = req.body;
        const todo = await Todo.findOne({
            where: {
                id: todoDetails.todoId,
            }
        })

        if (!todo) {
            throw httpErrors.NotFound(`Expense with id: ${todoDetails.todoId} not exist.`);
        }

        await Todo.destroy(
            {
                where: {
                    id: todoDetails.expenseId
                },
                transaction
            }
        )

        await transaction.commit();


        if (res.headersSent === false) {
            res.status(200).send({
                error: false,
                data: {
                    message: "Expense deleted successfully",
                },
            });
        }

    } catch (error: any) {
        await transaction.rollback();
        next(error);
    }
}


export  {
    createToDo,
    getTodo,
    updateTodo,
    deleteTodo,
}