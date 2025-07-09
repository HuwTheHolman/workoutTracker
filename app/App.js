import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutInfoScreen from "./screens/WorkoutInfoScreen";
import WorkoutTrackerScreen from "./screens/WorkoutTrackerScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WorkoutInfo">
        <Stack.Screen
          name="WorkoutInfo"
          component={WorkoutInfoScreen}
          options={({ navigation }) => ({
            title: "Workout Info",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("WorkoutTracker")}
                style={{
                  marginRight: 15,
                  backgroundColor: "#007AFF",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
                >
                  Tracker
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="WorkoutTracker"
          component={WorkoutTrackerScreen}
          options={({ navigation }) => ({
            title: "Workout Tracker",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("WorkoutInfo")}
                style={{
                  marginRight: 15,
                  backgroundColor: "#007AFF",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
                >
                  Info
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
