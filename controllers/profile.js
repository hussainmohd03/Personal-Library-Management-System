const User = require("./../models/user");
const bcrypt = require("bcrypt");

exports.profile_show_get = async (req, res) => {
    const user = await User.findById(req.session.user._id)
    res.render("profile/show.ejs", { user });
};

exports.profile_edit_get = async (req, res) => {
  const profile = await Profile.findById(req.body.username);
  res.render("profile/edit.ejs", { profile });
};
exports.profile_edit_put = async (req, res) => {
  const profile = await Profile.findByIdAndUpdate(req.params._id, req.body);
  res.redirect(`/auth/${req.params._id}/${profile}`);
};


