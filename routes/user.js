const express = require('express');
const router = express.Router( 
    // { mergeParams: true } 
);
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post(
    "/signup", 
    wrapAsync(async(req, res) => {
        try {
            let { username, email, password } = req.body;
            console.log(username,  email, password);
            const newUser = new User( { username, email, password } ); 
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);
            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                };
                req.flash("success", "Welcome to wanderlust!");
                res.redirect("/listings");
            });
        } catch (err) {
            req.flash("error", err.message);
            res.redirect("/signup");
        };
    })
);

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post(
    "/login", 
    saveRedirectUrl,
    passport.authenticate("local", { 
        failureRedirect: '/login', 
        failureFlash: true
    }),
    async(req, res) => {
        console.log("AUTHENTICATED USER:");
        req.flash("success", "Welcome back to Wanderlust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        req.flash("success", "You are logged out now.");
        res.redirect("/listings");
    })
})

module.exports = router;

