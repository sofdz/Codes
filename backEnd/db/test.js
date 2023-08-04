const user=require('./models/users')
require('./mongoose')


const u1=new user({  
prenom : "hafnaoui",
nom_utilisateur: "hafsalah2022",
MDP: "hafsalah2022",
role: "Admin",
telephone: "0666393527",})
u1.save().then(r=>{console.log(r)}).catch(e=>{console.log(e)})