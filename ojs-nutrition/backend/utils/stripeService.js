const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Order, StripePayment } = require('../models');

class StripeService {
    async createPaymentIntent(order) {
        try {
            // Stripe ödeme niyeti oluştur
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(order.total * 100), // Kuruş cinsinden
                currency: 'try',
                metadata: { 
                    OrderId: order.id 
                }
            });

            // Stripe ödeme bilgisini veritabanına kaydet
            await StripePayment.create({
                OrderId: order.id,
                stripePaymentIntentId: paymentIntent.id,
                amount: order.total,
                status: 'pending',
                currency: 'try'
            });

            return {
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id
            };
        } catch (error) {
            console.error('Stripe ödeme niyeti oluşturma hatası:', error);
            throw error;
        }
    }

    async confirmPayment(paymentIntentId) {
        try {
            // Ödeme durumunu güncelle
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            
            const stripePayment = await StripePayment.findOne({
                where: { stripePaymentIntentId: paymentIntentId }
            });

            if (stripePayment) {
                stripePayment.status = paymentIntent.status === 'succeeded' ? 'succeeded' : 'failed';
                await stripePayment.save();

                // İlgili siparişin durumunu güncelle
                await Order.update(
                    { status: paymentIntent.status === 'succeeded' ? 'completed' : 'cancelled' },
                    { where: { id: stripePayment.OrderId } }
                );
            }

            return paymentIntent.status;
        } catch (error) {
            console.error('Ödeme onaylama hatası:', error);
            throw error;
        }
    }
}

module.exports = new StripeService();