const User = require('../../db/models/user.model');
const RefreshToken = require('../../db/models/refreshToken.model');
const jwt = require('jsonwebtoken');

class Controller {
    async login(req, res) {
        const { name, password } = req.body;
        const users = await User.find({});
        let validUser;

        users.forEach(user => { if(user.name == name && user.password == password) validUser = user; });

        if(validUser !== undefined) {
            const accessToken = jwt.sign({ id: validUser._id }, process.env.TOKEN_SECRET, { expiresIn: 20 });
            const refreshToken = jwt.sign({ id: validUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 });

            const token = new RefreshToken({ token: refreshToken });
            await token.save();

            res.cookie('JWT', accessToken, { maxAge: 86400000, httpOnly: true });

            res.status(200).json({ accessToken, refreshToken});
        } else {
            return res.status(400).json({ message: "Incorrect login or password!" });
        }
    }

    async refresh(req, res) {
        const refreshToken = req.body.token;
        let user;

        if(!refreshToken) return res.sendStatus(401);
        
        const tokenExist = await RefreshToken.findOne({ token: refreshToken });
        if (tokenExist === null) return res.sendStatus(403);

        try {
            user = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch {
            return res.sendStatus(403);
        }

        console.log(user);
        const accesToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: 20 });

        res.cookie("JWT", accesToken, { maxAge: 86400000, httpOnly: true });

        return res.status(200).json({ accesToken });
    }

    async logout(req, res) {
        const refreshToken = req.body.token;
        const tokenExist = await RefreshToken.findOne({ token: refreshToken });

        if(tokenExist === null) return res.status(400).json({ message: "Token not exist" });

        await RefreshToken.deleteOne({ _id: tokenExist._id });
        res.sendStatus(204);
    }
}

module.exports = new Controller();