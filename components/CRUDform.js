import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { sendRequest } from "../crud/CRUD";
import HgButton from "./buttons/hgButton";
import prepareObj4Api from "../crud/dbUtils";
import { useModal } from "../context/ModalContext";
import GlobalStyles from "../styles/GlobalStyles";

const CRUDform = (props) => {
  const { modalState, toggleModal } = useModal();
  const hiddenInputs = props.hiddenInputs
    ? [...props.hiddenInputs, "hiddenInputs"]
    : ["hiddenInputs"];
  const notInputs = props.notInputs
    ? [...props.notInputs, "notInputs"]
    : ["notInputs"];
  const [formData, setFormData] = useState(() => {
    const filteredData = Object.fromEntries(
      Object.entries(props).filter(
        ([key, value]) =>
          !notInputs.includes(key) && typeof value !== "function"
      )
    );
    filteredData.where = [];
    filteredData.what = [];
    return filteredData;
  });

  const toast = useToast();

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const responseData = await executeDatabaseAction("POST");
      if (typeof props.onCreateCallback === "function") {
        props.onCreateCallback(responseData);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const responseData = await executeDatabaseAction("PUT");
      if (typeof props.onUpdateCallback === "function") {
        props.onUpdateCallback(responseData);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const responseData = await executeDatabaseAction("DELETE");
      if (typeof props.onDeleteCallback === "function") {
        props.onDeleteCallback(responseData);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const selectHandler = (buttonTitle) => {
    switch (buttonTitle.toLowerCase()) {
      case "create":
        return handleCreate();
      case "update":
        return handleUpdate();
      case "delete":
        return handleDelete();
      default:
        return null; // No action for unrecognized buttons
    }
  };

  const executeDatabaseAction = async (method = "POST") => {
    try {
      let dataObj = prepareObj4Api(formData, method, notInputs);
      const responseData = await sendRequest(dataObj, method);

      toast.show(responseData.message);
      if (!responseData.success) {
        return null;
      }
      const ret = { form: formData, ids: responseData.data };
      return ret;
    } catch (error) {
      console.error("Error handling database action:", error);
      return null;
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {Object.entries(formData).map(([fieldName, value]) => {
        if (typeof value != "string") {
          value = "";
        }
        return (
          ![...hiddenInputs].includes(fieldName) && (
            <View key={fieldName}>
              <Text style={GlobalStyles.label}>{fieldName}</Text>
              <TextInput
                id={`${fieldName}-input`}
                name={fieldName}
                style={GlobalStyles.input}
                placeholder={
                  fieldName === "what" || fieldName === "where"
                    ? "Enter " + fieldName + " values separated by commas"
                    : fieldName
                }
                value={
                  typeof formData[fieldName] == "string"
                    ? formData[fieldName]
                    : ""
                }
                onChangeText={(text) => handleInputChange(fieldName, text)}
              />
            </View>
          )
        );
      })}
      {props.buttons?.[0] && props.buttons[0] === "delete" && (
        <Text> Are you sure you want to delete this?</Text>
      )}
      <View style={GlobalStyles.buttonContainer}>
        {/* Render buttons */}
        {props.buttons &&
          props.buttons.map((buttonTitle) => (
            <HgButton
              style={GlobalStyles.button}
              key={buttonTitle}
              title={buttonTitle.replace(/\b\w/g, (char) => char.toUpperCase())}
              onPress={() => selectHandler(buttonTitle)}
            />
          ))}
        <HgButton onPress={toggleModal} title="Cancel" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginRight: 10,
  },
});

export default CRUDform;
