// =======================================
//              DATABASE
// =======================================
const Cat = require("../models/cats");

// Create all Cats CRUD operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// For making a new cat
const createCat = (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a cat",
    });
  }
  // req.body exists, so make a new cat
  const cat = new Cat(req.body);

  // somehow, if the new cat doesn't exist, return error
  if (!cat) {
    return res.status(400).json({ success: false, error: err });
  }
  // cat exists! So insert it in database
  cat
    .save()
    .then(() => {
      // return json response if successful
      return res.status(201).json({
        success: true,
        id: cat._id,
        message: "Cat created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Cat not created!",
      });
    });
};

// For updating cat
const updateCat = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  // req.body exists, so find the cat by id and then update
  Cat.findOne({ _id: req.params.id }, (err, cat) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Cat not found!",
      });
    }
    console.log(req.body);
    // update the cat details
    cat.name = req.body.name;
    cat.description = req.body.desc;
    cat.image = req.body.image;
    cat.gender = req.body.gender;
    cat.adoptable = req.body.adoptable;
    cat.cage = req.body.cage;
    // save the updated cat
    cat
      .save()
      .then(() => {
        // return json response if successful
        return res.status(200).json({
          success: true,
          id: cat._id,
          message: "Cat updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Cat not updated!",
        });
      });
  });
};

// For deleting cat
const deleteCat = async (req, res) => {
  // find cat by id, then remove
  await Cat.findOneAndDelete({ _id: req.params.id }, (err, cat) => {
    // if there is an error, throw error
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    // if the cat doesnt exist, throw error
    if (!cat) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }
    // return json response if successful
    return res.status(200).json({ success: true, data: cat });
  }).catch((err) => console.log(err));
};

// For showing a particular cat
const getCatById = async (req, res) => {
  // find the cat by id
  await Cat.findOne({ _id: req.params.id }, (err, cat) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!cat) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }
    // return json response if successful
    return res.status(200).json({ success: true, data: cat });
  }).catch((err) => console.log(err));
};

// For showing all cats - this is the cat index page
const getCats = async (req, res) => {
  // find all the cats
  await Cat.find({}, (err, cats) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!cats.length) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }
    // return json response if successful
    return res.status(200).json({ success: true, data: cats });
  }).catch((err) => console.log(err));
};

// export the modules - CRUD
// Read has 2 (for the index page--> showing all cats, and for the show page--> show particular cat)
module.exports = {
  createCat,
  updateCat,
  deleteCat,
  getCats,
  getCatById,
};