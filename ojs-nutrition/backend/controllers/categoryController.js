const db = require("../models");

// Tüm kategorileri getir (ürünlerle birlikte)
const getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      include: [{ model: db.Product }], // Her kategoriye bağlı ürünleri de getir
    });

    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ID'ye göre bir kategori getir (ürünlerle birlikte)
const getCategoryById = async (req, res) => {
  try {
    const { category_id } = req.params;

    // Kategoriyi ürünler ve ürünlerin yorum bilgileriyle birlikte getiriyoruz
    const category = await db.Category.findOne({
      where: { id: category_id },
      include: [
        {
          model: db.Product,
          include: [
            {
              model: db.Review,
              attributes: ["id", "rating", "comment"], // Yorumların gerekli alanları
            },
          ],
        },
      ],
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    // Ürünlere yorum özeti (yorum sayısı ve ortalama puan) ekliyoruz
    const categoryWithProducts = {
      ...category.toJSON(),
      Products: category.Products.map((product) => {
        const reviews = product.Reviews || [];
        const reviewCount = reviews.length;
        const averageRating =
          reviewCount > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviewCount
            : 0;

        return {
          ...product,
          reviewSummary: {
            reviewCount,
            averageRating,
          },
        };
      }),
    };

    res.json(categoryWithProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Yeni bir kategori oluştur
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await db.Category.create({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Category Created Successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Belirli bir kategorinin tüm ürünlerini getir
const getProductsByCategory = async (req, res) => {
  console.log("beyza");
  try {
    const { category_id } = req.params;
    console.log(req.params);
    console.log(category_id);
    console.log("beyza1");

    // Kategoriyi ve ürünleri yorum bilgileriyle birlikte alıyoruz
    const category = await db.Category.findOne({
      where: { id: category_id },
      include: [
        {
          model: db.Product,
          include: [
            {
              model: db.Review,
              attributes: ["id", "rating", "description"], // Gerekli alanları seçiyoruz
            },
          ],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Ürünlere yorum özeti (yorum sayısı ve ortalama puan) ekliyoruz
    const productsWithReviews = category.Products.map((product) => {
      const reviews = product.Reviews || [];
      const reviewCount = reviews.length;
      const averageRating =
        reviewCount > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviewCount
          : 0;

      return {
        ...product.toJSON(),
        reviewSummary: {
          reviewCount,
          averageRating,
        },
      };
    });

    res.json(productsWithReviews); // Yalnızca ürünleri yorum bilgileriyle birlikte döndür
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  getProductsByCategory, // Yeni eklenen fonksiyon
};