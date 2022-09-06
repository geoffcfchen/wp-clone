import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Context from "../context/Context";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { signUp, signIn } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function SigninScreen() {
  const [currUser, setCurrUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("SignUp");
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(Context);

  // async function handlePress() {
  //   if (mode === "signUp") {
  //     await signUp(email, password);
  //   }
  //   if (mode === "signIn") {
  //     await signIn(email, password);
  //   }
  // }

  async function handlePressSignIn() {
    await signIn(email, password);
  }

  useEffect(() => {
    // console.log(auth);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Welcome to Furry
      </Text>
      <Image
        source={require("../assets/welcome-img.png")}
        style={{ width: 180, height: 180 }}
        resizeMode="cover"
      ></Image>

      <View style={styles.inputContainer}>
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
            title={"Login in"}
            disabled={!password || !email}
            color={colors.secondary}
            onPress={handlePressSignIn}
          ></Button>
          <Button
            title={"Register"}
            color={colors.secondary}
            onPress={() => navigation.navigate("Profile")}
          ></Button>
        </View>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    marginTop: 30,
  },
});
