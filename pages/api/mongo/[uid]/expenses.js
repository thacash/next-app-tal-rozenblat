import clientPromise from "../../../../lib/mongodb";

export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db();
    const { uid } = req.query;

    if (req.method === 'GET') {
        const expenses = await db.collection("expenses").find({ userId: uid }).toArray(function(err,results){
            res.status(200).json(results);

        });
        return;
    }
    
};