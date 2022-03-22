const express = require("express");
const router = express.Router();
const { User } = require("../db/models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
    User.find()
        .then((users) => {
            res.render("users/users", { title: "Users", users });
        })
        .catch((err) => {
            console.log(err);
        });
});

// Register new user
router
    .route("/register")
    .get((req, res) => {
        res.render("users/register", { title: "Add user" });
    })

    .post(async (req, res) => {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
        };

        const duplicateEmail = await User.find({ email: userData.email });
        const duplicatePhone = await User.find({ phone: userData.phone });
        if (duplicateEmail.length > 0) {
            req.flash(
                "error-message",
                `The email you provided is already in use.`
            );
            return res.redirect("/users/register");
        }

        if (duplicatePhone.length > 0) {
            req.flash(
                "error-message",
                "The phone number you provided is already in use."
            );
            return res.redirect("/users/register");
        }

        const newUser = new User(userData);
        newUser
            .save()
            .then((user) => {
                req.flash("success-message", "User created successfully!");
                res.redirect("/users");
            })
            .catch((err) => {
                req.flash("error-message", err.message);
                res.redirect("/users/register");
            });
    });

// Edit user
router
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        User.findById(id)
            .then((user) => {
                res.render("users/edit", { title: "Edit User", user });
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .put((req, res) => {
        const id = req.params.id;

        User.findById(id).then((user) => {
            (user.username = req.body.username),
                (user.email = req.body.email),
                (user.password = req.body.password),
                (user.address = req.body.address),
                (user.phone = req.body.phone);
            user.save()
                .then((user) => {
                    res.redirect("/users");
                })
                .catch((err) => {
                    req.flash("error-message", err.message);
                    res.redirect(`/users/edit/${id}`);
                });
        });
    });

// Delete user
router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then((user) => {
            req.flash(
                "success-message",
                `The user ${user.username} was deleted succesfully.`
            );
            res.redirect("/users");
        })
        .catch((err) => {
            req.flash("error-mesage", err.message);
            console.log(err);
        });
});

module.exports = router;
