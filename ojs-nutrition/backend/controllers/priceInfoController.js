const db = require('../models');

const getPriceInfo = async (req, res) => {
    try {
        const priceInfos = await db.PriceInfo.findAll();

        res.json(priceInfos);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getPriceInfoById = async (req, res) => {
    try {
        const {priceInfo_id} = req.params;

        const priceInfo = await db.PriceInfo.findOne({
            where: {id: priceInfo_id}
        });

        if (!priceInfo) {
            res.status(404).send('Price Info not found');
        }

        res.json(priceInfo);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createPriceInfo = async (req, res) => {
    try {
        const {profit, total_price, discounted_price, price_per_servings, discount_percentage, ProductId} = req.body

        const createPriceInfo = await db.PriceInfo.create({
            profit,
            total_price,
            discounted_price,
            price_per_servings,
            discount_percentage,
            ProductId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!createPriceInfo) {
            res.status(400).send('Price Info not created');
        }

        res.status(201).send('Price Info Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getPriceInfo,
    getPriceInfoById,
    createPriceInfo
};