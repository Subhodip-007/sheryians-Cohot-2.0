import { notesModel } from "../model/notes.model.js";
import { userModel } from "../model/user.model.js";
/**
 * 
 * @param {*} req 
 * @returns 
 */

export const createNotesController = async (req,res,next)=>{
 try{
        if(!req.verifyToken){
        const error = new Error("unauthorized access")
        error.statusCode = 401;
            return next(error)
    }
    const userId = req.verifyToken._id;
    const { title , description } = req.body
      let note = await notesModel.create({
            userId,
            title,
            description
        })

        res.status(201).json({
            message: "notes creation successful !",
            note
        })
 }catch(err){
    next(err)
 }

}
export const noteDeleteController = async (req, res, next) => {
    try {

        if (!req.verifyToken) {
            const error = new Error("Unauthorized access");
            error.statusCode = 401; 
            return next(error); 
        }
        const noteId = req.params.id;
        const note = await notesModel.findById(noteId);
        if (!note) {
            const error = new Error("Note not found!");
            error.statusCode = 404; 
            return next(error);
        }
        if (note.userId.toString() !== req.verifyToken._id.toString()) {
            const error = new Error("Forbidden: You do not own this note");
            error.statusCode = 403; 
            return next(error);
        }
        await note.deleteOne();

        return res.status(200).json({
            message: "Note deleted successfully",
            note
        });

    } catch (err) {
        next(err);
    }
};

export const getAllNoteController = async(req,res,next) =>{
    try{
        if(!req.verifyToken){
             const error = new Error("unauthorized access");
            error.statusCode = 404;
            return next(error);
        }
         const allnotes = await notesModel.find({
                userId:req.verifyToken._id
            })
             return res.status(200).json({
                message:"All notes fetched !",
                allnotes
            })

    }catch(err){
        next(err)
    }
}
// edit notes