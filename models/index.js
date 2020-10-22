const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment");

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

// With these two .belongsToMany() methods in place,
// we're allowing both the User and Post models to query
// each other's information in the context of a vote
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Vote };

/**
 * Note:
 * These association changes will not take affect in the User table,
 * because there isn't a way to make changes to the table dynamically.
 *
 * Sequelize does have a way to dynamically drop the table
 * and create a new one to overwrite existing tables and establish the new associations.
 */
