"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.createToDo = void 0;
var todo_model_1 = require("../models/todo.model");
var http_errors_1 = require("http-errors");
var init_mysql_1 = require("../helper/common/init_mysql");
var createToDo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction, todoDetails, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, init_mysql_1.sequelize.transaction()];
            case 1:
                transaction = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 7]);
                todoDetails = req.body;
                return [4 /*yield*/, todo_model_1.Todo.create({
                        taskName: todoDetails.taskName,
                        date: todoDetails.date
                    }, {
                        transaction: transaction
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, transaction.commit()];
            case 4:
                _a.sent();
                if (res.headersSent === false) {
                    res.status(200).send({
                        error: false,
                        data: {
                            message: "todo created successfully",
                        },
                    });
                }
                return [3 /*break*/, 7];
            case 5:
                error_1 = _a.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 6:
                _a.sent();
                next(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createToDo = createToDo;
var getTodo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var todoDetails, query, todo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                todoDetails = req.body;
                query = { where: {} };
                if (todoDetails.todoId) {
                    query.where.id = todoDetails.todoId;
                }
                if (todoDetails.taskName) {
                    query.where.taskName = todoDetails.taskName;
                }
                if (todoDetails.date) {
                    query.where.date = todoDetails.date;
                }
                return [4 /*yield*/, todo_model_1.Todo.findOne(query)];
            case 1:
                todo = _a.sent();
                if (res.headersSent === false) {
                    res.status(200).send({
                        error: false,
                        data: {
                            todo: todo,
                            message: "todo fetched successfully",
                        },
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTodo = getTodo;
var updateTodo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction, todoDetails, todo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, init_mysql_1.sequelize.transaction()];
            case 1:
                transaction = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 8]);
                todoDetails = req.body;
                return [4 /*yield*/, todo_model_1.Todo.findOne({
                        where: {
                            id: todoDetails.todoId,
                        }
                    })];
            case 3:
                todo = _a.sent();
                if (!todo) {
                    throw http_errors_1.default.NotFound("Todo with id: ".concat(todoDetails.todoId, " not exist."));
                }
                return [4 /*yield*/, todo_model_1.Todo.update({
                        id: todoDetails.taskId,
                        taskName: todoDetails.taskName,
                        date: todoDetails.date,
                    }, {
                        where: {
                            id: todoDetails.taskId
                        },
                        transaction: transaction
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, transaction.commit()];
            case 5:
                _a.sent();
                if (res.headersSent === false) {
                    res.status(200).send({
                        error: false,
                        data: {
                            message: "Todo updated successfully",
                        },
                    });
                }
                return [3 /*break*/, 8];
            case 6:
                error_3 = _a.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 7:
                _a.sent();
                next(error_3);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateTodo = updateTodo;
var deleteTodo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction, todoDetails, todo, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, init_mysql_1.sequelize.transaction()];
            case 1:
                transaction = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 8]);
                todoDetails = req.body;
                return [4 /*yield*/, todo_model_1.Todo.findOne({
                        where: {
                            id: todoDetails.todoId,
                        }
                    })];
            case 3:
                todo = _a.sent();
                if (!todo) {
                    throw http_errors_1.default.NotFound("Expense with id: ".concat(todoDetails.todoId, " not exist."));
                }
                return [4 /*yield*/, todo_model_1.Todo.destroy({
                        where: {
                            id: todoDetails.expenseId
                        },
                        transaction: transaction
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, transaction.commit()];
            case 5:
                _a.sent();
                if (res.headersSent === false) {
                    res.status(200).send({
                        error: false,
                        data: {
                            message: "Expense deleted successfully",
                        },
                    });
                }
                return [3 /*break*/, 8];
            case 6:
                error_4 = _a.sent();
                return [4 /*yield*/, transaction.rollback()];
            case 7:
                _a.sent();
                next(error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deleteTodo = deleteTodo;
