import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
// import { pickImage } from "../utils";

export default function Photo() {
  const navigation = useNavigation();
  const [cancelled, setCancelled] = useState(false);

  return (
    <View>
      <Text>Phtesto</Text>
    </View>
  );
}
