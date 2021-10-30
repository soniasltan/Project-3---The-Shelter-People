// =======================================
//              DATABASE
// =======================================
const Comment = require("../models/comments");
const Cat = require("../models/cats");

// Create all Comments CRUD operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// For making a new comment
// When making new comment, have to attach comment to particular cat
const createComment = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a comment",
    });
  }
  await Cat.findById(req.params.id, (err, foundCat) => {
    // req.body exists, so make a new comment
    const comment = new Comment(req.body);
    // Append the comment to the cat
    foundCat.comments.push(comment);
    foundCat.save((err, data) => console.log(data));
    // somehow, if the new comment doesn't exist, return error
    if (!comment) {
      return res.status(400).json({ success: false, error: err });
    }
    // comment exists! So insert it in database
    comment
      .save()
      .then(() => {
        // return json response if successful
        return res.status(201).json({
          success: true,
          id: comment._id,
          message: "Comment created!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Comment not created!",
        });
      });
  });
};

// For updating comment
const updateComment = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    // req.body exists, so find the comment by id and then update
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        err,
        message: "Comment not found!",
      });
    }
    // update the comment details
    comment.text = req.body.text;
    // save the updated comment
    await comment.save();

    // now update the comment entry for the cat too
    const cat = await Cat.findById(comment.cat_id);
    // remove the old, non-updated comment first
    cat.comments.id(comment._id).remove();
    // now add in the updated comment
    cat.comments.push(comment);

    await cat.save();

    res.status(200).json({
      success: true,
      id: comment._id,
      message: "Comment updated!",
    });
  } catch (err) {
    res.status(404).json({
      error,
      message: "Comment not updated!",
    });
  }
};

// For deleting comment
// need to remove comment from particular cat
const deleteComment = async (req, res) => {
  // find comment by id, then remove
  await Comment.findOneAndDelete({ _id: req.params.id }, (err, comment) => {
    // if there is an error, throw error
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    // if the comment doesnt exist, throw error
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: `Comment not found` });
    }
    // return json response if successful
    return res.status(200).json({ success: true, data: comment });
  }).catch((err) => console.log(err));
};

// export the modules - CRUD
module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
