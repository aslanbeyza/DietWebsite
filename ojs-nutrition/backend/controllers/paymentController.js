const db = require("../models");
const StripeService = require("../utils/stripeService");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getAllPayments = async (_req, res) => {
  try {
    const allPayments = await db.StripePayment.findAll({
      include: [
        {
          model: db.Order,
          attributes: ["id", "total", "status"],
        },
      ],
    });

    res.json(allPayments);
  } catch (err) {
    res.status(500).json({
      message: "Ödemeler alınırken hata oluştu",
      error: err.message,
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { payment_id } = req.params;

    const payment = await db.StripePayment.findOne({
      where: { id: payment_id },
      include: [
        {
          model: db.Order,
          attributes: ["id", "total", "status"],
        },
      ],
    });

    if (!payment) {
      return res.status(404).json({ message: "Ödeme bulunamadı" });
    }

    res.json(payment);
  } catch (err) {
    res.status(500).json({
      message: "Ödeme bilgisi alınırken hata oluştu",
      error: err.message,
    });
  }
};

const createStripePayment = async (req, res) => {
  try {
    const { OrderId } = req.body;
    console.log("OrderId", OrderId);

    // Siparişi kontrol et
    const order = await db.Order.findOne({
      where: {
        id: OrderId,
        UserId: req.user.id,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı" });
    }

    // Ödeme niyeti oluştur
    const paymentIntent = await StripeService.createPaymentIntent(order);
    console.log("paymentIntent", paymentIntent);
    res.status(200).json({
      clientSecret: paymentIntent.clientSecret,
      paymentIntentId: paymentIntent.paymentIntentId,
    });
  } catch (err) {
    res.status(500).json({
      message: "Ödeme oluşturulurken hata oluştu",
      error: err.message,
    });
  }
};

const confirmStripePayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const status = await StripeService.confirmPayment(paymentIntentId);

    res.status(200).json({
      status,
      message:
        status === "succeeded"
          ? "Ödeme başarıyla tamamlandı"
          : "Ödeme başarısız",
    });
  } catch (err) {
    res.status(500).json({
      message: "Ödeme onaylanırken hata oluştu",
      error: err.message,
    });
  }
};

const createStripeCheckoutSession = async (req, res) => {
  try {
    const successUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/payment?status=success`;
    const cancelUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/payment?status=failure`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "try",
            product_data: {
              name: `Orders`,
            },
            unit_amount: Math.round(100 * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({
      message: "Checkout session creation failed",
      error: err.message,
    });
  }
};

const getStripePaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await db.StripePayment.findAll({
      include: [
        {
          model: db.Order,
          where: { UserId: userId },
          attributes: ["id", "total", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(payments);
  } catch (err) {
    res.status(500).json({
      message: "Ödeme geçmişi alınırken hata oluştu",
      error: err.message,
    });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createStripePayment,
  confirmStripePayment,
  createStripeCheckoutSession,
  getStripePaymentHistory,
};