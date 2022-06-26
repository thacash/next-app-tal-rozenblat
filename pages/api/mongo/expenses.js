import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db();

    if (req.method === 'GET') {
        const expenses = await db.collection("expenses").find({ userId: req.body.userId }).toArray(function(err,results){
            res.status(200).json(results);

        });
        return;
    }
    
    else if (req.method === 'POST') {
        const expense = await db
        .collection("expenses")
        .insertOne({ 
            userId: req.body.userId,
            createdAt: req.body.createdAt,
            amount: req.body.amount,
            desc: req.body.desc ? req.body.desc : 'null',
            category: req.body.category
        });

        res.status(201).json(expense);
        return;
    }
};