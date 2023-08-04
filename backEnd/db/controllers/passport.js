const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const User=require('../models/users')

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['access_token'];
    return token;
  }
  const opts={}
  opts.jwtFromRequest = cookieExtractor; // check token in cookie
  opts.secretOrKey = 'salah_hafnaoui_secret_key';
  //opts.ignoreExpiration= true
  passport.use(new JwtStrategy(opts, async function(data, done) {
    try {
      const user = await User.findById(data.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
passport.use(new LocalStrategy({
    usernameField: 'nom_utilisateur',
    passwordField: 'MDP',
  },async(nom_utilisateur,MDP,cb)=>{
    try{
 const user=await User.findOne({nom_utilisateur})
    if(!user){
        return cb(null,false,{message:"erreur d'authentification"})
    }
     const mdp_juste=await user.compare_MDP(MDP)
     if(!mdp_juste){
        return cb(null,false,{message:"erreur d'authentification"})
     }
     return cb(null,user,{message:'succes'})
    }
    catch(e){
     cb(e)
    }
}))