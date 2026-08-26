const express = require("express");
const { notesCreationController,notesDeleteController,notesEditController,GetAllPostController} = require("../controller/notes.controller");
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
 /**
  * @method - 
  * @route - 
  * @description - 
  */
 noteRoute.get("/GetallNotes",TokenVerify,GetAllPostController)

  module.exports = noteRoute