// =======================================
//              DEPENDENCIES
// =======================================
require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT ?? 3000;
const mongoose = require("mongoose");
const catRouter = require("./controllers/cat-router");
const MONGO_URI = process.env.MONGO_URI 
// =======================================
//              CONFIGURATION
// =======================================
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .catch((err) => {
    console.error("Connection error", err.message);
  });
mongoose.connection.on("error", (err) =>
  console.log(err.message + "Mongod not running")
);
// =======================================
//              MIDDLEWARE
// =======================================
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", catRouter);
const Cat = require("./models/cats");

app.get("/", (req, res) => {
  Cat.create(
    {
      name: "Ginger",
      description: "Goodgirl",
      image: "test",
      gender: "F",
      cage: "6/7",
      adoptable: "Yes",
    },
    (error, createdCat) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      // .json() will send proper headers in response so client knows it's json coming back
      res.status(200).send(createdCat);
    }
  );
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
