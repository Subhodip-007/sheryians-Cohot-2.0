const express = require("express");
const { notesCreationController,notesDeleteController,notesEditController} = require("../controller/notes.controller");
const TokenVerify = require("../middleware/auth.Verify");
const noteRoute = express.Router()
/**
 * @metnod - POST
 * @route - api/notes/create
 * @description -
 */
 noteRoute.post("/create",TokenVerify,notesCreationController)
 /**
 * @metnod - DELETE
 * @route - api/notes/delete
 * @description -
 */
 noteRoute.delete("/delete/:id",TokenVerify,notesDeleteController)
 /**
  * @method - 
  * @route - 
  * @description - 
  */
noteRoute.patch("/replace/:id",TokenVerify,notesEditController) ///continue withe controiller // case add userid with notes 


  module.exports = noteRoute