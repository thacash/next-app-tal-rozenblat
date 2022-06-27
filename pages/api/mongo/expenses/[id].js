import clientPromise from "../../../../lib/mongodb";


export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db();
    const { id } = req.query;

    if (req.method === 'DELETE') {
        const expense = await db.collection("expenses").deleteOne({_id: id});
        if(expense){
            res.status(200).json(expense);
        }
    }

    //finish deletion process

 
};
