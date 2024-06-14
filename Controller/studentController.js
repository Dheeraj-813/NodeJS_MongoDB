const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("student");

// Render form to add a new student
router.get("/", (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Insert Student"
    });
});

// Handle form submission to add or update a student
router.post("/", async (req, res) => {
    if (req.body._id === "") {
        await insertRecord(req, res);
    } else {
        await updateRecord(req, res);
    }
});

async function insertRecord(req, res) {
    const student = new Student({
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    });

    try {
        await student.save();
        res.redirect("student/list");
    } catch (err) {
        console.log("Error during insert: " + err);
        res.render("student/addOrEdit", {
            viewTitle: "Insert Student",
            student: req.body,
            error: err.message
        });
    }
}

async function updateRecord(req, res) {
    try {
        await Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.redirect("student/list");
    } catch (err) {
        console.log("Error during update: " + err);
        res.render("student/addOrEdit", {
            viewTitle: "Update Student",
            student: req.body,
            error: err.message
        });
    }
}

// Display the list of students
router.get("/list", async (req, res) => {
    try {
        const docs = await Student.find();
        res.render("student/list", {
            list: docs
        });
    } catch (err) {
        console.log("Error in retrieval: " + err);
    }
});

// Render form to update a student
router.get("/:id", async (req, res) => {
    try {
        const doc = await Student.findById(req.params.id);
        if (doc) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
        } else {
            res.redirect("/student/list");
        }
    } catch (err) {
        console.log("Error in finding student: " + err);
    }
});

// Handle request to delete a student
router.get("/delete/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect("/student/list");
    } catch (err) {
        console.log("Error in deletion: " + err);
    }
});

module.exports = router;