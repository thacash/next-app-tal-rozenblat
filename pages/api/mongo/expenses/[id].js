import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "bson";

export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db();
    const { id } = req.query;

    if (req.method === 'DELETE') {
        const expense = await db.collection("expenses").deleteOne({_id: ObjectId(id)});
        if(expense){
            res.status(200).json(expense);
        }
    }

    //finish deletion process

 
};
