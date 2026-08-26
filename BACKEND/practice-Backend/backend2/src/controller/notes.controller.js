const jwt = require("jsonwebtoken");
const notesModel = require("../model/notes.model");
const notesCreationController = async (req, res) => {
    try {
        if (!req.verifyToken) {
            return res.status(401).json({
                message: "unauthorized access: incorrect or expired token"
            });
        }
        const userID = req.verifyToken._id;

        let { title, description } = req.body;
        if (!title || title.trim() === "") {

            return res.status(400).json({
                message: "title can't be empty"
            });

        }
        let note = await notesModel.create({
            userID,
            title,
            description
        })

        res.status(201).json({
            message: "notes creation successful !",
            note
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }

}
const notesDeleteController = async (req, res) => {
    try {
        if (!req.verifyToken) {
            return res.status(401).json({
                message: "unauthorized access: incorrect or expired token"
            });
        }
        const noteID = req.params.id;

        const note = await notesModel.findById(noteID);

        if (!note) {
            return res.status(404).json({
                message: "note not found",

            })
        }
        const noteUserID = note.userID
        if (noteUserID === req.verifyToken._id) {
            return res.status(401).json({
                message: "unauthorized access"
            })
        }
        await note.deleteOne();
        return res.status(200).json({
            message: "note deleted successfully",
            note
        });
    } catch (err) {
        return res.status(500).json({
            message: err,

        })

    }
}
const notesEditController = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!req.verifyToken) {
            return res.status(401).json({
                message: "unauthorized access: incorrect or expired token"
            });
        }
        const noteID = req.params.id;
        const note = await notesModel.findById(noteID);
        console.log("Request params:", req.params);
        console.log("Note ID:", noteID);

        if (!note) {
            return res.status(404).json({
                message: "note not found",

            })

        }
        const noteUserID = note.userID
        if (noteUserID.toString() !== req.verifyToken._id.toString()) {
            return res.status(403).json({
                message: "unauthorized access"
            })
        }
        if (title !== undefined) {
            note.title = title;
        }

        if (description !== undefined) {
            note.description = description;
        }
        await note.save()
        return res.status(200).json({
            message: "note edit successful",
            note
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }
}
const GetAllPostController = async (req,res) =>{
    try{
            if (!req.verifyToken) {
            return res.status(401).json({
                message: "unauthorized access: incorrect or expired token"
            });
            }
            const allnotes = await notesModel.find({
                userID:req.verifyToken._id
            })
            res.status(200).json({
                message:"All notes fetched !",
                allnotes
            })




    }catch(err){
         return res.status(500).json({
            message: err.message
        })
    }
}
module.exports = {
    notesCreationController,
    notesDeleteController,
    notesEditController,
    GetAllPostController
}
