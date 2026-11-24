import {Router} from "express"
import { createExpenseController, deleteExpenseController, getAllExpenceController, getSingleExpenseController, updateExpenseController } from "../controller/expense.controller.js";
import { ExpenseValidator } from "../validator/expense.validator.js";
import { tokenVerify } from "../middleware/verifyToken.js";
export const expenseRouter = Router()

expenseRouter.post("/create",tokenVerify,ExpenseValidator,createExpenseController);
expenseRouter.get("/getAll",tokenVerify,getAllExpenceController);
expenseRouter.get("/get/:id",tokenVerify,getSingleExpenseController);
expenseRouter.patch("/edit/:id",tokenVerify,updateExpenseController);
expenseRouter.delete("/delete/:id",tokenVerify,deleteExpenseController)