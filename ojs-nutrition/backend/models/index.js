const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.SA_PASSWORD,
  {
    host: process.env.DB_SERVER, 
    port: process.env.DB_PORT || 1433,
    dialect: "mssql",
    logging: console.log, 
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Address = require("./address")(sequelize, Sequelize);
db.Category = require("./category")(sequelize, Sequelize);
db.Order = require("./order")(sequelize, Sequelize);
db.OrderItem = require("./orderItem")(sequelize, Sequelize);
db.Payment = require("./payment")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.PriceInfo = require("./priceInfo")(sequelize, Sequelize);
db.Review = require("./review")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Variant = require("./variant")(sequelize, Sequelize);
db.Size = require("./size")(sequelize, Sequelize);
db.StripePayment = require("./stripePayment")(sequelize, Sequelize);

db.ProductCategory = sequelize.define(
  "ProductCategory",
  {},
  { timestamps: false }
);

// User and Address
db.Address.belongsTo(db.User, { foreignKey: "UserId" });
db.User.hasMany(db.Address, { foreignKey: "UserId" });

// Category and Product (Many-to-Many)
db.Category.belongsToMany(db.Product, { through: db.ProductCategory });
db.Product.belongsToMany(db.Category, { through: db.ProductCategory });

// Order and User
db.Order.belongsTo(db.User, { foreignKey: "UserId" });
db.User.hasMany(db.Order, { foreignKey: "UserId" });

// OrderItem and Order
db.Order.hasMany(db.OrderItem, { foreignKey: "OrderId" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "OrderId" });

// OrderItem and Product
db.OrderItem.belongsTo(db.Product, { foreignKey: "ProductId" });

// Payment and Order
db.Payment.belongsTo(db.Order, { foreignKey: "OrderId" });

// İlişkileri tanımlayın
db.StripePayment.belongsTo(db.Order, { foreignKey: "OrderId" });
db.Order.hasOne(db.StripePayment, { foreignKey: "OrderId" });
// PriceInfo and Product
db.Product.hasOne(db.PriceInfo, { foreignKey: "ProductId" });
db.PriceInfo.belongsTo(db.Product, { foreignKey: "ProductId" });

// Review and Product
db.Product.hasMany(db.Review, { foreignKey: "ProductId" });
db.Review.belongsTo(db.Product, { foreignKey: "ProductId" });

// Review and User
db.User.hasMany(db.Review, { foreignKey: "UserId" });
db.Review.belongsTo(db.User, { foreignKey: "UserId" });

// Product ve Variant arasındaki ilişki
db.Product.hasMany(db.Variant, { foreignKey: "ProductId" });
db.Variant.belongsTo(db.Product, { foreignKey: "ProductId" });
db.Variant.hasMany(db.PriceInfo, { foreignKey: "VariantId" });

// PriceInfo and Variant ilişki
db.PriceInfo.belongsTo(db.Variant, { foreignKey: "VariantId" });
db.PriceInfo.belongsTo(db.Product, { foreignKey: "ProductId" });
// Size ve Variant arasındaki ilişki
db.Variant.hasMany(db.Size, { foreignKey: "VariantId" });
db.Size.belongsTo(db.Variant, { foreignKey: "VariantId" });

module.exports = db;