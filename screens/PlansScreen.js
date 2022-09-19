import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const plansQuery = query(
    collection(db, "products"),
    where("active", "==", true)
  );
  // console.log(plansQuery);
  useEffect(() => {
    const unsubscribe = onSnapshot(plansQuery, (querySnapshot) => {
      const products = querySnapshot;
      // querySnapshot.forEach(async (productDoc) => {
      //   products[productDoc.id] = productDoc.data();
      //   const priceSnap = await productDoc.ref.collection("prices").get();
      //   priceSnap.docs.forEach((price) => {
      //     products[productDoc.id].prices = {
      //       priceID: price.id,
      //       priceData: price.data(),
      //     };
      //   });
      // });
      setProducts(products);
    });
  }, []);
  console.log(products);

  return (
    <View>
      <Text>PlansScreen</Text>
    </View>
  );
}
