const bcrypt = require("bcryptjs");
const mongooose = require("mongoose");
const User = require("./model");

class UserService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.fastify = fastify;
  }

  async register({ user }) {
    try {
      const exists = await this.checkUsernameExists(user);
      if (exists) return { error: "Username already taken." };

      if (!exists) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hashSync(user.password, salt);

        const newUser = await this.createUser({
          ...user,
          password: hashPassword,
        });
        if (newUser) return { user: newUser };
      }
    } catch (err) {
      this.fastify.log.error(err);
    }
  }

  async login({ username, password }) {
    try {
      const user = await User.findOne({ username }).lean();
      if (!user) return { error: "Invalid username" };

      const passValid = bcrypt.compareSync(password, user.password);
      if (!passValid) return { error: "Invalid Password" };

      delete user.password;
      const token = this.fastify.jwt.sign({ ...user }, { expiresIn: "30d" });
      return { token, user };
    } catch (err) {
      this.fastify.log.error(err);
    }
  }

  async account({ username }) {
    try {
      const user = await User.findOne({ username }).select("-password").lean();
      if (!user) return { error: "Invalid username" };
      const token = this.fastify.jwt.sign({ ...user }, { expiresIn: "30d" });
      return { user: { token, ...user } };
    } catch (err) {
      this.fastify.log.error(err);
    }
  }

  async checkUsernameExists({ username }) {
    try {
      const user = await User.findOne({ username }).select("-password");
      if (!user) return false;
      if (user) return user;
    } catch (err) {
      this.fastify.log.error(err);
    }
  }

  async createUser(user) {
    try {
      const userDoc = new User(user);
      const newUser = await userDoc.save();
      if (newUser._id) {
        return await User.findById(newUser._id).select("-password");
      }
      return false;
    } catch (err) {
      this.fastify.log.error(err);
    }
  }
}

module.exports = { UserService };
