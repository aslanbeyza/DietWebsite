const db = require("../models");
const jwt = require("jsonwebtoken");

const getAllAddresses = async (_req, res) => {
  try {
    const addresses = await db.Address.findAll();
    res.json(addresses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createAddress = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
      is_primary,
    } = req.body;

    const newAddress = await db.Address.create({
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
      is_primary,
      UserId: decoded.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!newAddress) {
      res.status(400).send("Address not created");
    }

    res.status(201).send("Address Created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await db.Address.findByPk(id);

    if (!address) {
      res.status(404).send("Address not found");
    }

    res.json(address);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { address_id } = req.params;
    const {
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
      is_primary,
    } = req.body;

    const updateResult = await db.Address.update(
      {
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        is_primary,
        updatedAt: new Date(),
      },
      {
        where: { id: address_id },
      }
    );

    if (updateResult[0] === 0) {
      res.status(404).send("Address not found");
    }

    res.send("Address Updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { address_id } = req.params; // "address_id" yerine "id" yerine
    console.log("adres", req.params);
    const deleteResult = await db.Address.destroy({
      where: { id: address_id },
    });

    if (deleteResult === 0) {
      // Daha doğru bir kontrol
      return res.status(404).send("Address not found");
    }

    res.send("Address Deleted Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAddressesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const addresses = await db.Address.findAll({
      where: { UserId: user_id },
    });

    if (!addresses) {
      res.status(404).send("Addresses not found");
    }

    res.json(addresses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getDefaultAddressByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const address = await db.Address.findOne({
      where: { UserId: user_id, is_primary: true },
    });

    if (!address) {
      res.status(404).send("Default address not found");
    }

    res.json(address);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllAddresses,
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAddressesByUserId,
  getDefaultAddressByUserId,
};