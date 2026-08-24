const express = require("express");
const { notesCreationController } = require("../controller/notes.controller");
const noteRoute = express.Router()
/**
 * @metnod - POST
 * @route - api/notes/create
 * @description -
 */
 noteRoute.post("/create",notesCreationController)
 module.exports = noteRoute