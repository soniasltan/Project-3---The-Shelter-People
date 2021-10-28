// =======================================
//              DATABASE
// =======================================
const Cat = require("../models/cats");

// Create all CRUD operations
const createCat = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a cat",
    });
  }

  const cat = new Cat(req.body);

  if (!cat) {
    return res.status(400).json({ success: false, error: err });
  }

  cat
    .save()
    .then(() => {
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

const updateCat = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Cat.findOne({ name: req.body.name }, (err, cat) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Cat not found!",
      });
    }
    console.log(req.body);

    cat.name = req.body.name;
    cat.description = req.body.desc;
    cat.image = req.body.image;
    cat.gender = req.body.gender;
    cat.adoptable = req.body.adoptable;
    cat.cage = req.body.cage;

    cat
      .save()
      .then(() => {
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

const deleteCat = async (req, res) => {
  await Cat.findOneAndDelete({ _id: req.params.id }, (err, cat) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!cat) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }

    return res.status(200).json({ success: true, data: cat });
  }).catch((err) => console.log(err));
};

const getCatById = async (req, res) => {
  await Cat.findOne({ _id: req.params.id }, (err, cat) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!cat) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }
    return res.status(200).json({ success: true, data: cat });
  }).catch((err) => console.log(err));
};

const getCats = async (req, res) => {
  await Cat.find({}, (err, cats) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!cats.length) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }
    return res.status(200).json({ success: true, data: cats });
  }).catch((err) => console.log(err));
};

module.exports = {
  createCat,
  updateCat,
  deleteCat,
  getCats,
  getCatById,
};
