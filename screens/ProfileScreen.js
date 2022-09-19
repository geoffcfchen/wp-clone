import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import Context from "../context/Context";
import { async } from "../utils";
import { signUp, signIn } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { pickImage, askForPermission, uploadImage } from "../utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../firebase";

export default function ProfileScreen() {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handlePress() {
    await signUp(email, password);
    const user = auth.currentUser;
    console.log("user", user);
    console.log("selectedImage", selectedImage);
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    console.log("test", photoURL);
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "customers", user.uid), { ...userData, uid: user.uid }),
    ]);
    console.log("updated user", user);
    navigation.replace("Home");
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={{ fontSize: 22, color: colors.foreground }}>
        Profile Info
      </Text>
      <Text style={{ fontSize: 13, color: colors.text, marginTop: 20 }}>
        Please provide your name and an optional profile photo
      </Text>
      <TouchableOpacity
        onPress={handleProfilePicture}
        style={{
          marginTop: 30,
          borderRadius: 120,
          width: 120,
          height: 120,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!selectedImage ? (
          <MaterialCommunityIcons
            name="camera-plus"
            color={colors.iconGray}
            size={45}
          ></MaterialCommunityIcons>
        ) : (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: "100%", borderRadius: 120 }}
          ></Image>
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          autoFocus
          autoCapitalize="none"
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: 250,
          }}
        ></TextInput>
        <TextInput
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            marginTop: 40,
            width: 250,
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
            width: 250,
            marginTop: 40,
          }}
        ></TextInput>
      </View>
      <View style={{ marginTop: 40, width: 80 }}>
        <Button
          title="Next"
          disabled={!password || !email || !displayName}
          color={colors.secondary}
          onPress={handlePress}
        ></Button>
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
