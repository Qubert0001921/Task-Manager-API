const User = require('../../db/models/user.model');

class Controller {
    async createUser(req, res) {
        try {
            const { name, password } = req.body;
            const userExists = await User.findOne({name: name});

            if(userExists === null) {
                const newUser = new User({ name: name, password: password });
                await newUser.save();
                return res.status(201).json(newUser);
            } else {
                return res.status(400).json({ message: `Can't create user '${name}', because it's exist`});
            }
        } catch {
            return res.status(500).json({ message: "Server error!" });
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await User.find({});
            return res.status(200).json(users);
        } catch {
            return res.status(500).json({ message: "Server error!" });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findOne({ _id: userId });
            return res.status(200).json(user);
        } catch {
            return res.status(500).json({ message: "Server error!" });
        }
    }
}

module.exports = new Controller();