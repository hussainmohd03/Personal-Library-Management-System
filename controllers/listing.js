const List = require("../models/listing")


exports.list_show_get = async (req, res) => {
   res.render("listings/show.ejs")
}

exports.profile_edit_get = async (req, res) => {
    const profile = await List.findById(req.body.username)
    res.render("profile/edit.ejs", { profile })
}
exports.profile_edit_put = async (req, res) => {
    const profile = await List.findByIdAndUpdate(req.params._id, req.body)
    res.redirect(`/auth/${req.params._id}/${ profile }`)
}