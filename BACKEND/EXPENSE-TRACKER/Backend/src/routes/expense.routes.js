import {Router} from "express"
import { createExpenseController, getAllExpenceController } from "../controller/expense.controller.js";
import { ExpenseValidator } from "../validator/expense.validator.js";
import { tokenVerify } from "../middleware/verifyToken.js";
export const expenseRouter = Router()

expenseRouter.post("/create",tokenVerify,ExpenseValidator,createExpenseController);
expenseRouter.get("/getAll",tokenVerify,getAllExpenceController);