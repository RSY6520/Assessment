const { User, Role } = require("../db");
const roles = require("../enum/role");
const throwError = require("../utility/gloabal/throwError");
const pagination = require("../utility/pagination");
const { Op } = require('sequelize');

async function insert(data) {
    // data validation
    const exist = await User.findOne({
        where: {email: data.email}
    });
    if(exist) throwError("User with the email already exist!");
    const userRoleId = await Role.findOne({
        attributes: ['id', 'name'],
        where: {
            name: roles.user
        }
    });
    data.roleId = userRoleId.dataValues.id;
    const user = User.build(data);
    await user.save();
    return { ...user.dataValues, password: undefined };
}

async function getProfile(data) {
    // validation
    const user = await User.findOne({
        attributes: ['name', 'email', ['CreatedAt', 'registrationDate']],
        where: {
            email: data.email
        }
    });

    if(!user) {
    throwError("User is no longer present!");
    }
    return user;

}

async function getUsersByPagination(data) {
    const { pageNo, pageSize, name, email } = data;
    // validation
    const searchList = [];
    if(name) searchList.push({ name: { [Op.iLike]: `%${name}%` } });
    if(email) searchList.push({ email: { [Op.iLike]: `%${email}%` } })
    const { offset, limit } = pagination(pageNo, pageSize);
    const users = await User.findAll({
        attributes: ['name', 'email', ['CreatedAt', 'registrationDate']],
        where: {
            [Op.or]: searchList
          },
        limit: limit,
        offset: offset
    });
    return users;
}

async function insertByAdmin(data) {
    const { roleName } = data;
    if(!(roleName === roles.admin || roleName === roles.user))
        throwError("Please enter a valid role Name(User, Admin)");

    const exist = await User.findOne({
        where: {email: data.email}
    });
    if(exist) throwError("User with the email already exist!");

    const userRoleId = await Role.findOne({
        attributes: ['id', 'name'],
        where: {
            name: roleName
        }
    });
    data.roleId = userRoleId.dataValues.id;
    const user = User.build(data);
    await user.save();
    return { ...user.dataValues, password: undefined };
}

async function update(id, data) {
    // validation
    const userById = await User.findOne({
        where: {
            id: id
        }
    });
    if(!userById) throwError("User not found");
    
    if(data.email){
        const userByMail = await User.findOne({
            where: {
                email: data.email
            }
        });
        if(userByMail) throwError("User with this mail already exist!");
    }

    const { roleName } = data;
    if(roleName) {
    if(!(roleName === roles.admin || roleName === roles.user))
        throwError("Please enter a valid role Name(User, Admin)");
        const userRoleId = await Role.findOne({
            attributes: ['id', 'name'],
            where: {
                name: roleName
            }
        });
        delete data.roleName;
        data.roleId = userRoleId.dataValues.id;
    }

    let [ ,[userAfterUpdate]] = await User.update({
        ...data
    },{
        where:{
            id: id
        },
        returning:true
    })
    return userAfterUpdate;
}

async function deleteUser(id) {
    // validation
    const user = await User.findOne({
        include: {
            model: Role,
            attributes: ['id', 'name']
        },
        where: {
            id: id
        }
    });
    if(!user) throwError("User not found");
    if(user.dataValues.Role.dataValues.name === roles.admin) throwError("You are not authorised to delete this user!");
    const deleted = await User.destroy({
        where: {
            id: id
        }
    });
    return deleted;
}

module.exports = { insert, getProfile, getUsersByPagination, insertByAdmin, update, deleteUser};