import { View, Text } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import Context from "../context/Context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../firebase";
import { TabActions } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Photo from "./PhotoScreen";
import Chats from "./ChatsScreen";
import {
  AntDesign,
  Ionicons,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  const {
    theme: { colors },
  } = useContext(Context);

  const navigation = useNavigation();

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Signin");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Vetcation",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Plans")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Entypo name="camera" size={24} color={colors.white} />;
            } else {
              return <Entypo name="chat" size={24} color={colors.white} />;
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photo}></Tab.Screen>
      <Tab.Screen name="chats" component={Chats}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeScreen;
