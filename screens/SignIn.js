import { View, Text, Image, TextInput, Button } from "react-native";
import React, { useContext, useState } from "react";
import Context from "../context/Context";
import { async } from "../utils";
import { signUp, signIn } from "../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("SignUp");
  const {
    theme: { colors },
  } = useContext(Context);
  async function handlePress() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Welcome to whatsapp
      </Text>
      <Image
        source={require("../assets/welcome-img.png")}
        style={{ width: 180, height: 180 }}
        resizeMode="cover"
      ></Image>
      <View style={{ marginTop: 20 }}>
        <TextInput
          autoCapitalize="none"
          autoFocus
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
          }}
        ></TextInput>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            marginTop: 20,
          }}
        ></TextInput>
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "Sign up" : "Login in"}
            disabled={!password || !email}
            color={colors.secondary}
            onPress={handlePress}
          ></Button>
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <Text>
            {mode === "signUp"
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
