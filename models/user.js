// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // The email cannot be null, and must be a proper email before creation
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
                // validate: {

            // }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Full_name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isInt: true,
                min: 5,
                max: 5
            }
        }
    });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    User.hasMany = function(models) {
        models.User.belongsTo(models.Library, {
            onDelete: "cascade"
        });
    };
    User.hasMany = function(models) {
        models.User.belongsTo(models.Wishlist, {
            onDelete: "cascade"
        });
    };
    User.hasMany = function(models) {
        models.User.belongsTo(models.Comment, {
            onDelete: "cascade"
        });
    };
    User.hasMany = function(models) {
        models.User.belongsTo(models.Blogpost, {
            onDelete: "cascade"
        });
    };
    return User;
};