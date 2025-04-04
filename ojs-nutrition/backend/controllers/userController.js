const db = require('../models');
const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params; // 'user_id' doğru şekilde kullanılmalı

        const user = await db.User.findOne({
            where: { id: user_id }, // 'user_id' ile eşleşen kullanıcıyı bul
            include: [{ model: db.Review }],
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
const createUser = async (req, res) => {
    try {
        const { name, lastName, email, password, role } = req.body;

        const createUser = await db.User.create({
            name,
            lastName,
            email,
            password,
            role,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        if (!createUser) {
            res.status(400).send('User not created');
        }
        res.status(201).send('User Created Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
module.exports = {
    getAllUsers,
    getUserById,
    createUser
};