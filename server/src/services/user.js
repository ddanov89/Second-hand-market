const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const identityName = 'email';

async function register(identity, password) {
    const existing = await User.findOne({ [identityName]: identity });
    if (existing) {
        throw new Error(`This ${identityName} is already in use!`);
    }
    const user = new User({
        [identityName]: identity,
        password: await bcrypt.hash(password, 10)
    });

    await user.save();

    return user;
}

async function login(identity, password) {

    const user = await User.findOne({ [identityName]: identity });

    if (!user) {
        throw new Error(`Incorrect ${identityName} or password!`);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error(`Incorrect ${identityName} or password!`);
    }

    return user;
}

function getUserById(userId) {
    const user = User.findById(userId);
    return user;
}

function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    

    User.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
        .then(user => { res.status(200).json(user) })
        .catch(next);
}

async function checkUserId(userId) {
    const user = await User.find().lean();
    const isValid = user.find(el => el._id.toString() == userId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    register,
    login,
    getProfileInfo,
    checkUserId,
    getUserById
};