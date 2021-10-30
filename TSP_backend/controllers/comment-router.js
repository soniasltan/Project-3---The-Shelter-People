// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const router = express.Router();
// get the CRUD operations
const CommentCtrl = require("./comment-ctrl");

// =======================================
//              POST ROUTES
// =======================================
// This is for new comment for a particular cat
router.post("/cats/:id/newcomment", CommentCtrl.createComment);

// =======================================
//              PUT ROUTES
// =======================================
// This is for updating a comment
router.put("/comments/:id", CommentCtrl.updateComment);

// =======================================
//              DELETE ROUTES
// =======================================
// delete comment
router.delete("/comments/:id", CommentCtrl.deleteComment);

module.exports = router;