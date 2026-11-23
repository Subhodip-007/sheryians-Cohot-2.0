// create expence 

import { expenseModel } from "../model/expense.model.js";

export const createExpenseController = async (req,res,next)=>{
    try{
        if(!req.user){
            const error = new Error("unauthorized access");
            error.statusCode = 401;
            return next(error)
        }
        const { title , description , category , date , amountPaise } = req.body;
        // entry validation validator
        const  expense  = await expenseModel.create({
            userId:req.user._id,
            title,
            amountPaise,
            category,
            description,
            date: new Date()
        });
        res.status(200).json({
            success:true,
            message:"expense creaated successful",
            expense
        })


    }catch(err){
        return next(err)
    }
}
// get all expense 
export const getAllExpenceController = async (req,res,next)=>{
    try{
         if(!req.user){
            const error = new Error("unauthorized access");
            error.statusCode = 401;
            return next(error)
        }
        const expenses = await expenseModel.find({
            userId:req.user._id,

        }).sort({date : -1})
        res.status(200).json({
            success:true,
            message:"expense creaated successful",
            expenses
        })

    }catch(err){
        next(err)
    }
}