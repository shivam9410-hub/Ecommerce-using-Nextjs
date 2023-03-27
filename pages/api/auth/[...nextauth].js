import User from "@/models/User";
import db from "@/utils/db";
import bcryptjs from "bcryptjs/dist/bcrypt";

const { default: nextAuth } = require("next-auth");


export default NextAuth({
session:{
    strategy:'jwt',
},
 callbacks:{
 async jwt({token,user}){
          if(user?._id)
          token._id=user._id ;
          if(user?.isAdmin)
          token.isAdmin=user.isAdmin;
     return token ; 
 },
 async session({session,token}){
    if(token?._id)
    session.user._id=token._id; 
    if(token?.isAdmin)session.user.isAdmin=token.isAdmin;
    return session;

 },

 }
 ,
 providers:[
    CredentialsProvider({
        async authorize(credentials){
            await db.connect() ; 
            const user= await User.findOne({email:credentials.email}) ;
            await db.disconnect() ;
             if(user && bcryptjs.compareSync(credentials.password ,user.password)){

             }
        }
    })

 ]
}) ; 