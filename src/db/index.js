const { Op } = require("sequelize");
const roles = require("../enum/role");
const { sequelize } = require("./connection");
const Role = require("./models/role");
const User = require("./models/user");
const seedData = require('./seed.json');

async function fetchRecentUsers() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
    try {
      // Query to get users who were created within the last 7 days
      let recentUsers = await User.findAll({
        attributes: ['id', 'name', 'email', ['CreatedAt', 'createdAt']],
        include: [
            {
                model: Role,
                attributes: ['id', 'name']
            }
        ],
        where: {
          CreatedAt: {
            [Op.gte]: sevenDaysAgo,  // Greater than or equal to 7 days ago
          }
        }
      });
      recentUsers = recentUsers.map((user) => 
        { return {...user.dataValues, Role: { ...user.dataValues.Role.dataValues }} }
      )
      return recentUsers;
    } catch (error) {
      console.error('Error fetching recent users:', error);
      throw error;
    }
  };

  const logRecentUsersOnStartup = async () => {
    try {
      const recentUsers = await fetchRecentUsers();
      console.log(`Total users registered in the last 7 days: ${recentUsers.length} and users: `, recentUsers);
    } catch (error) {
      console.error('Failed to log recent users on startup:', error);
    }
  };

User.belongsTo(Role, {
    foreignKey: "roleId"
  });

sequelize.sync({logging: false, alter:false }).then(async () => {
  console.log("models are in sync with database now");
  const [adminRole, adminRoleCreated] = await Role.findOrCreate({
    where: { name: roles.admin },
    defaults: {
      name: roles.admin
    }
  });
  const [userRole, userRoleCreated] = await Role.findOrCreate({
    where: { name: roles.user },
    defaults: {
      name: roles.user
    }
  });

  const [admin, adminCreated] = await User.findOrCreate({
    where: {
      name: seedData.admin.name
    },
    defaults: {
      roleId: adminRole.id,
      name: seedData.admin.name,
      email: seedData.admin.email,
      password: seedData.admin.password
    }
  });

  if (adminRoleCreated) { console.log(`admin role is created ${JSON.stringify(adminRole)}`); }
  if (userRoleCreated) { console.log(`user role is created ${JSON.stringify(userRole)}`); }
  if (adminCreated) { console.log(`admin is created ${JSON.stringify(admin)}`); }
  
  await logRecentUsersOnStartup();

}).catch(err => {
  console.log(`unable to sync model ${err.message}`)
});
module.exports = { User, Role }
