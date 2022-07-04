import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "bson";

export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db();
    const { id } = req.query;

    // if (req.method === 'GET') {
    //     const example = await db.collection("examples").find({type: id}).toArray(function(err,results){
    //         res.status(200).json(results);

    //     });
    //     return;
    // }

    if (req.method === 'GET') {
        const example = await db.collection("examples").find({type: id});
        const exampleArray = await example.toArray();
        res.status(200).json(exampleArray);
        return;
    }
    //finish deletion process

 
};
