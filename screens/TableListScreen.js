import { useEffect } from "react";
import { Text } from "react-native";

import TableList from "../components/TableList/TableList";

const TableListScreen = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params && route.params.table_name) {
      navigation.setOptions({
        headerTitle: route.params.table_name,
      });
    }
  }, [route]);

  return route.params?.table_name ? (
    <TableList key={route.params.table_name} {...route.params} />
  ) : (
    <Text>Go back to Home and open a list</Text>
  );
};

export default TableListScreen;
