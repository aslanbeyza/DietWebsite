const express = require("express");
const stripe = require("stripe")(
  "sk_test_51QTrHhDmeOtxZbxLYpubFS45fZ3K0gV7VCvOXBLPHO9i254olhLwfLbWEPu2f6k0eTRBhsyQavZp89UCGClpstpj00euhMqj7G"
); // Stripe API anahtarınızı buraya ekleyin
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getAllPayments);
router.get("/:payment_id", paymentController.getPaymentById);

// Yeni Stripe route'ları
router.post(
  "/create-intent",
  authMiddleware,
  paymentController.createStripePayment
);
router.post("/confirm", authMiddleware, paymentController.confirmStripePayment);
router.get(
  "/history",
  authMiddleware,
  paymentController.getStripePaymentHistory
);

// Stripe Checkout route'u ekleniyor
router.post(
  "/checkout-session",
  authMiddleware,
  paymentController.createStripeCheckoutSession
);

module.exports = router;