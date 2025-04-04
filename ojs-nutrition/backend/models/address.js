module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        address_line1: {type: DataTypes.STRING, required: false, allowNull: false},
        address_line2: {type: DataTypes.STRING, required: false, allowNull: true},
        city: {type: DataTypes.STRING, required: false, allowNull: true},
        state: {type: DataTypes.STRING, required: false, allowNull: true},
        postal_code: {type: DataTypes.STRING, required: false, allowNull: true},
        country: {type: DataTypes.STRING, required: false, allowNull: false},
        is_primary: {type: DataTypes.BOOLEAN, required: false, allowNull: true, defaultValue: false},
        
    });
    return Address;
};