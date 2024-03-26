import React from "react";
import { View, Modal, StyleSheet, Pressable, ScrollView } from "react-native";
import { useModal } from "../context/ModalContext";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../styles/GlobalStyles";

const ModalComponent = () => {
  const { modalState, toggleModal } = useModal();

  return (
    <Modal
      visible={modalState.isModalVisible}
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View style={GlobalStyles.modalContainer}>
        <View style={GlobalStyles.modalContent}>
          <Pressable onPress={toggleModal} style={GlobalStyles.closeIcon}>
            <Ionicons
              name="close"
              size={24}
              color="#fff"
              style={GlobalStyles.icon}
            />
          </Pressable>
          <View style={GlobalStyles.header}></View>
          <ScrollView style={GlobalStyles.scrollView}>
            {modalState.modalContent}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
