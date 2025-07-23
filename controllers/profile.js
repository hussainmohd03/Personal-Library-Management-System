const Book = require("../models/book");
const User = require("./../models/user");
const bcrypt = require("bcrypt");

exports.profile_show_get = async (req, res) => {
    const user = await User.findById(req.session.user._id)
    res.render("profile/show.ejs", { user });
};

exports.profile_edit_get = async (req, res) => {
  const profile = await User.findById(req.session.user._id);
  res.render("profile/edit.ejs", { profile });
};
exports.profile_edit_put = async (req, res) => {
  const profile = await User.findByIdAndUpdate(req.session.user._id, req.body);
  res.redirect(`/profile`);
};



