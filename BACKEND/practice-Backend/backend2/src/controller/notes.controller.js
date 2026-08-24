const jwt = require("jsonwebtoken");
const notesModel = require("../model/notes.model");
const notesCreationController = async (req, res) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "token not found !"
            })
        }
        try {
            let veriftToken = jwt.verify(
                token,
                process.env.JWT_SECRET
            )

        } catch (err) {
            return res.status(401).json({
                message: "unauthorized access : incorrect token " + err
            })

        }
        let { title, description } = req.body;
        if (!title || title.trim() === "") {

            return res.status(400).json({
                message: "title can't be empty"
            });

        }
        let note = await notesModel.create({
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
module.exports = {
    notesCreationController,
}
