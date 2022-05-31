import { connectToMongo } from "../../util/db";
import {hash} from 'bcryptjs'

export default async (req,res)=>{
  if(req.method === 'POST'){
    const {email, password} =req.body;

   const client = await connectToMongo()
   const db = client.db()

   const encriptedPassword = await hash(password, 12)

   db.collection('users2').insertOne({
     email: email,
     password: encriptedPassword
   })
    res.status(200).json({message: 'Radi'})
  }

  //GET
  if(req.method === 'GET'){
    const client = await connectToMongo()

    const db = client.db()

    const result = await db.collection('users2').find().toArray()

    res.status(200).json({data: result})
  }
}
