
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://subhodip31xd_db_user:myshub2005@cluster0.9qu01r0.mongodb.net/Backend-experiments");
console.log("connected to DB....");

const Student = mongoose.model("Student", {
    name: String,
    class: String,
    roll: Number
});

// Create
app.post("/students", async (req, res) => {
    const s = new Student(req.body);

    await s.save();

    res.json(s);
});

// Read
app.get("/students", async (req, res) => {
    res.json(await Student.find());
});

// Update
app.put("/students/:id", async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);

    res.json({ message: "Student Updated" });
});

// Delete
app.delete("/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student Deleted" });
});

app.listen(3000, () => console.log("Server Running"));
