import { useState, useContext, createContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isModalVisible: false,
    modalContent: null,
  });

  const openModal = (content) => {
    setModalState({
      isModalVisible: true,
      modalContent: content, // Update modal content with the clicked item
    });
  };

  const toggleModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
