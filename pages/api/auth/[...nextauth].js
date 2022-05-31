import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToMongo } from '../../../util/db'
import {compare} from 'bcryptjs'

export default NextAuth({
    session:{
        jwt: true,
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials){
               const client = await connectToMongo();

               const usersCollection = client.db().collection('users2')

               const user = await usersCollection.findOne({email: credentials.email})

               if(!user){
                   throw new Error ('Not user found!')
               }

               const isValid = await compare(credentials.password, user.password)

               if(!isValid){
                   throw new Error ('No user found2!')
               }
               client.close()
               return{email: user.email}

             
            }
        })
    ],
    callbacks: {
    },
    secret: process.env.JWT_SECRET,
})