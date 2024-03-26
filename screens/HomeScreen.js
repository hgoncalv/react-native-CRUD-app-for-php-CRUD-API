import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { sendRequest } from "../crud/CRUD";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";

function HomeScreen({ navigation }) {
  const [tableCols, setTableCols] = useState([]);
  const [tables, setTables] = useState([]);
  const tableRowsObj = {
    table_name: "user",
    table_cols: true,
  };
  const infoObj = {
    getTableNames: true,
  };

  useEffect(() => {
    sendRequest(infoObj, "GET")
      .then((responseData) => {
        setTables(responseData.data);
        responseData.data.forEach((element) => {
          sendRequest({ table_name: element, table_cols: true }, "GET")
            .then((response) => {
              setTableCols((prevTableCols) => ({
                ...prevTableCols,
                [element]: response.data,
              }));
            })
            .catch((error) => {
              console.error(
                `Error fetching columns for table ${element}:`,
                error
              );
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching table info:", error);
      });
  }, []);

  const handlePress = (item) => {
    let tableName = item.title;
    navigation.navigate("Admin TableList", {
      table_name: tableName,
      dbFields: tableCols[tableName],
    });
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      onPress={() => handlePress(item)}
      style={[
        GlobalStyles.TwoColitemContainer,
        index === tables.length - 1 &&
          tables.length % 2 === 1 &&
          GlobalStyles.TwoColsoloItemContainer,
      ]}
    >
      <FontAwesome name={item.iconName} size={30} color="black" />
      <Text style={GlobalStyles.title}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={GlobalStyles.TwoColcontainer}>
      {tables && tables.length > 0 && (
        <FlatList
          data={tables.map((item, index) => ({
            id: index.toString(),
            title: item,
            iconName: "table",
          }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerstyle={GlobalStyles.TwoColflatListContainer}
        />
      )}
      {tables.length <= 0 && <Text>No database tables detected</Text>}
    </View>
  );
}

export default HomeScreen;
