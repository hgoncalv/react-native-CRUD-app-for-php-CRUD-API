import React from "react";
import { useNavigation } from "@react-navigation/native";

const wrapper4props = (WrappedComponent) => {
  const WrapperComponent = (props) => {
    const navigation = useNavigation();

    const toggleModal = () => {
      navigation.setParams({
        ...navigation.getParam("screenParams", {}),
        isModalVisible: !navigation.getParam("screenParams", {}).isModalVisible,
      });
    };

    const openModal = (content) => {
      navigation.setParams({
        ...navigation.getParam("screenParams", {}),
        isModalVisible: true,
        modalContent: content,
      });
    };

    return (
      <WrappedComponent
        {...props}
        openModal={openModal}
        toggleModal={toggleModal}
      />
    );
  };

  return WrapperComponent;
};

export default wrapper4props;
