const { sequelize, DataTypes } = require("./../connection");
const getHashedPassword = require("../../utility/auth/getHashedPassword");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field:'Id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'Name'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field:'Email'
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        field:'Password',
        set(value) {
            this.setDataValue('password', getHashedPassword(value));
          }
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
            model: 'Role',
            key: 'Id',
        },
        field:'RoleId'
    }
},{
    createdAt: 'CreatedAt',
    freezeTableName: true,
    updatedAt: 'UpdatedAt'
});

module.exports = User;
