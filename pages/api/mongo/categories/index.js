import clientPromise from "../../../../lib/mongodb";

export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db();
    
    if (req.method === 'POST') {
        const category = await db
        .collection("categories")
        .insertOne({ 
            userId: req.body.userId,
            category: req.body.category,
        });

        res.status(201).json(category);
        return;
    }

 
};