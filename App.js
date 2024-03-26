import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TableList from "./components/TableList/TableList";
import ModalComponent from "./components/ModalComponent";
import { ModalProvider } from "./context/ModalContext";
import CRUDform from "./components/CRUDform";
import { ToastProvider } from "react-native-toast-notifications";
import TableListScreen from "./screens/TableListScreen";
import HomeScreen from "./screens/HomeScreen";

const TableListUsageExample = () => {
  return <TableList table_name="user" dbFields={["id", "name", "email"]} />;
};

const screens = [
  { name: "Home", screen: HomeScreen },
  { name: "Admin TableList", screen: TableListScreen },
  { name: "List Users (not admin example)", screen: TableListUsageExample },
];

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <ModalProvider>
      <ToastProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            {screens.map(({ name, screen }) => (
              <Drawer.Screen key={name} name={name} component={screen} />
            ))}
          </Drawer.Navigator>
        </NavigationContainer>
        <ModalComponent />
      </ToastProvider>
    </ModalProvider>
  );
};

export default App;
