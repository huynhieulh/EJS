module.exports.actionAth = function(req, res, next){
    // Check if user is authenticated
    if(req.method == "POST"){
        // Check action
    }else{

    }


    // User is authenticated, proceed to the next middleware/route handler
    next();

}

module.exports.sessionAuth = (req, res, next) => {
    // return next();
    // Exclude the login route from redirection
    if (req.path === '/login') {
        return next();
    }

    // Check if session exists
    if (!req.session || !req.session.username) {
        // Redirect to the login page if session doesn't exist
        return res.redirect('/login');
    }
    // Call next middleware if session exists
    return next();
};