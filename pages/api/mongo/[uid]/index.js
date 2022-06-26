import clientPromise from "../../../../lib/mongodb";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const client = await clientPromise;
    const db = client.db();
    const { uid } = req.query;
    let user = await db.collection("users").findOne({ email: uid });
    if (!user) {
      const current = new Date();
      const time =
        `${current.getFullYear()}-${current.getMonth() + 1
        }-${current.getDate()}`;
      user = await db
        .collection("users")
        .insertOne({ email: uid, createdAt: time});
    }
    res.json({ user });
  } else {
    res.json({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};