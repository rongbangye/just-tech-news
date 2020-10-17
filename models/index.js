const User = require("./User");
const Post = require("./Post");

/**
 * The constraint we impose here is that a post can belong to one user, not many users
 */
// create associations
// link to the corresponding foreign key pair, which is the user_id in the Post model.
User.hasMany(Post, {
  foreignKey: "user_id",
});

// make reverse associations
Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post };

/**
 * Note:
 * These association changes will not take affect in the User table,
 * because there isn't a way to make changes to the table dynamically.
 *
 * Sequelize does have a way to dynamically drop the table
 * and create a new one to overwrite existing tables and establish the new associations.
 */
