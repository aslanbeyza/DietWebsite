const db = require("../models");
const { Op } = require("sequelize");

const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await db.Product.findOne({
      where: { id: product_id },
      include: [
        { model: db.Review },
        { model: db.Category },
        { model: db.PriceInfo },
        {
          model: db.Variant,
          include: [{ model: db.Size }, { model: db.PriceInfo }],
        },
      ],
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }
    console.log("beyza", product);
    console.log("Product ID:", req.params.id);
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const getProductByName = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.productName}%`, // Case-sensitive arama Todo: capitalize
        },
      },
    });

    if (products.length === 0) {
      return res.status(404).send("No products found");
    }

    return res.json(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      name,
      short_explanation,
      slug,
      photo_src,
      comment_count,
      average_star,
      usage,
      features,
      description,
      variants,
      sizes,
    } = req.body;

    const createProduct = await db.Product.create({
      name,
      short_explanation,
      slug,
      photo_src,
      comment_count,
      average_star,
      usage,
      features,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!createProduct) {
      return res.status(400).send("Product not created");
    }

    if (variants && variants.length > 0) {
      const variantInstances = variants.map((variant) => {
        if (!variant.aroma) {
          throw new Error(`Variant is missing required field: aroma`);
        }

        return {
          flavor: variant.aroma,
          productId: createProduct.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...variant,
        };
      });

      await db.Variant.bulkCreate(variantInstances);
    }

    if (sizes && sizes.length > 0) {
      const sizeInstances = sizes.map((size) => ({
        ...size,
        productId: createProduct.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await db.Size.bulkCreate(sizeInstances);
    }

    return res.status(201).send("Product Created Successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit = 12, offset = 0 } = req.query;

    // Ürünleri ilişkili Review modeliyle birlikte alıyoruz
    const products = await db.Product.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: db.Review,
          attributes: ["id", "rating", "description"], // Gerekli alanları seçiyoruz
        },
      ],
    });

    // Her ürün için yorum özeti (ortalama puan ve yorum sayısı) ekliyoruz
    const productsWithReviews = products.map((product) => {
      const reviews = product.Reviews || [];
      const reviewCount = reviews.length;
      const averageRating =
        reviewCount > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviewCount
          : 0;

      return {
        ...product.toJSON(),
        // Sequelize nesnesini düz JSON'a çeviriyoruz
        reviewSummary: {
          reviewCount,
          averageRating,
        },
      };
    });

    res.json(productsWithReviews);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getProductByName,
  getProductById,
  createProduct,
  getAllProduct,
};