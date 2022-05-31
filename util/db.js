import {MongoClient} from 'mongodb'

export async function connectToMongo(){
    const client = await MongoClient.connect('mongodb+srv://mirko123:mirko123@cluster0.npbqy.mongodb.net/MyDatabase?retryWrites=true&w=majority')
    return client;
}