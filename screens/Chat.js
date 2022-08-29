// @refresh reset
import { View, Text } from "react-native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { auth, db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import GlobalContext from "../context/Context";
import { collection } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { setDoc } from "firebase/firestore";

const randomID = nanoid();

export default function Chat() {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomID = room ? room.id : randomID;

  const roomRef = doc(db, "rooms", roomID);
  const roomMessagesRef = collection(db, "room", roomID, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: currentUser.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
}
