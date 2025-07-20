const User = require("./../models/user")
const bcrypt = require("bcrypt")


// APIs

exports.auth_signup_get = async (req, res) => {
    res.render("auth/sign-up.ejs")
}
exports.auth_signup_post = async (req, res) => {

    const userFinder = await User.findOne({username: req.body.username})
    if (userFinder){
        return res.send("The username was taken!! please type another")
    }
    else if (req.body.password !== req.body.confirmPassword) {
        return res.send("The password and confirm password must be the same")
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.send(`Your username is ${user.username}, Thank you for signing up`)
    
    }

exports.auth_signin_get = async (req, res) => {
    res.render("auth/sign-in.ejs")
}
exports.auth_signin_post = async (req, res) => {
    const userFinder = await User.findOne({ username: req.body.username })
if (userFinder === req.body.username){
    res.send("The username is available")
}
else {
    res.send(`${req.body.username} is not found!`)
}
const passwordFinder = await User.findOne({ username: req.body.password })
const validPassword = bcrypt.compareSync(req.body.password, passwordFinder.password) // userFinder.password
if(!validPassword){
    return res.send("password is not found! please try again")
}

req.session.userFinding = {
    username: userFinder.username,
    _id: userFinder._id
}
res.redirect("/")

}

exports.auth_signout_get = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}


