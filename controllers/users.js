const User = require("../models/user.js");

module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
        try{
            let {username ,email ,password} = req.body;
            const newUser = new User({email,username});
            const registeredUser = await User.register(newUser,password);
            console.log(registeredUser);
            req.login(registeredUser,(err) => {
                if(err) {
                    return next(err);
                }
                req.flash("success","welcome to wanderlust");
                res.redirect("/listings");
            }); 
        } catch(e){
            console.error("Error during signup:", e.message);
            req.flash("error",e.message);
            res.redirect("/signup");
        }
    };

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req,res) =>{
    req.flash("success","Welcome! Back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
    });
};