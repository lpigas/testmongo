import clientPromise from "../lib/mongodb";
import { useRouter } from "next/router";
import axios from 'axios'
import React, { useEffect, useState } from "react";

export default function Movies({ productInfo }) {
    const router = useRouter()
    const getData = async () => {
        if (typeof window !== "undefined") {
          const hostname = window.location.origin;
          const getApi = await axios.get(
            `${hostname + process.env.API_PRODUCTDATA}movies`
          );
         console.log(getApi.data)
        }
      };
    useEffect(() => {
        getData()
    }, [])

  return (
    <div>
        <button onClick={()=> router.push('/')}>Back</button>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {productInfo.map((item) => (
          <div key={item.body}>
            <h1>{item.name_product}</h1>
          </div>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

  const productInfo = await db
    .collection("productdata")
    .find({id:8})
    .sort({})
    .toArray();

  return {
    props: {
        productInfo: JSON.parse(JSON.stringify(productInfo)),
    },
  };
}