import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "bson";

export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db();
    const { id } = req.query;

    if (req.method === 'DELETE') {
        const category = await db.collection("categories").deleteOne({_id: ObjectId(id)});
        if(category){
            res.status(200).json(category);
        }
    }

    //finish deletion process

 
};
