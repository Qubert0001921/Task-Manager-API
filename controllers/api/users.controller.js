const User = require('../../db/models/user.model');

class Controller {
    async createUser(req, res) {
        try {
            const { name, password } = req.body;
            const userExists = await User.findOne({name: name});

            if(!(name || password)) return res.status(400).json({message: "name or password not exist"});

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

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const { name, password } = req.body;

            if(!(name || password)) return res.status(400).json({message: "name or password not exist"});

            const nameExist = await User.findOne({ name: name });
            let user;
            
            if (nameExist === null) {
                try {
                    user = await User.findOne({ _id: id });
                } catch {
                    return res.status(400).json({ message: "User not exist" });
                }
                user.name = name;
                user.password = password;
    
                await user.save();
    
                return res.status(201).json(user);
            } else {
                return res.status(400).json({ message: `Can't update user, because the name is already taken`});
            }

        } catch {
            return res.status(500).json({ message: "Server error!" });
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            let userExist;
            try {
                userExist = await User.findOne({ _id: id });
            } catch {
                return res.status(400).json({ message: "Can't delete user because it's not exist!" });
            } 
            
            await User.deleteOne({ _id: id });
            res.sendStatus(204);
        } catch {
            return res.status(500).json({ message: "Server error!" });
        }
    }
}

module.exports = new Controller();