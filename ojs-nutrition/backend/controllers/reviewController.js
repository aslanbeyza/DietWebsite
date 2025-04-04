const db = require("../models");
const jwt = require("jsonwebtoken");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await db.Review.findAll();

    res.json(reviews);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createReview = async (req, res) => {
  try {
    const { rating, description, ProductId } = req.body;
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded,"decoded")
    console.log("first", decoded.id);
    const createReview = await db.Review.create({
      rating,
      description,
      ProductId,
      UserId: decoded.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!createReview) {
      res.status(400).send("Review not created");
    }

    res.status(201).send("Review Created Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllReviews,
  createReview,
};