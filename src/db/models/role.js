const { sequelize, DataTypes } = require("./../connection");
// const tableName = require('../../enum/tableName'); 

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field:'Id'
    },
    name:{
        type:DataTypes.STRING,
        field:'Name'
    }
},{
    freezeTableName: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Role;
