import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import GlobalContext from "../context/Context";
import { useNavigation } from "@react-navigation/native";

export default function ContactsFloatingIcon() {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Contacts")}
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AntDesign name="message1" size={30} color="white" />
    </TouchableOpacity>
  );
}
