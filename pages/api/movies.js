import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const productdata = await db
    .collection("productdata")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(productdata);
};