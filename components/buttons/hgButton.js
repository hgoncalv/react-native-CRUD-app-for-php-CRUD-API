import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles";

const HgButton = ({ title, onPress, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        GlobalStyles.button,
        pressed && GlobalStyles.buttonPressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={GlobalStyles.text}>{title}</Text>
    </Pressable>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: 100,
//   },
//   buttonPressed: {
//     backgroundColor: "#0056b3", // Change color when pressed
//   },
//   text: {
//     color: "#ffffff",
//     fontSize: 16,
//   },
// });

export default HgButton;
