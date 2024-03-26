import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import HgButton from "../buttons/hgButton";
import CRUDform from "../CRUDform";
import { useModal } from "../../context/ModalContext";
import { Picker } from "@react-native-picker/picker";
import GlobalStyles from "../../styles/GlobalStyles";
import { fetchDataFromApi } from "./tableListUtils";

const TableList = (props) => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [prevPageNum, setPrevPageNum] = useState(0);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const itemsPerPage = 10;
  const [dbFields, setDbFields] = useState(
    props.dbFields ? props.dbFields : []
  );
  const [orderBy, setOrderBy] = useState(() => {
    if (props.orderBy) {
      return props.orderBy;
    } else if (props.dbFields && props.dbFields.length > 0) {
      return props.dbFields[0];
    } else {
      return "id";
    }
  });
  const [ascDesc, setAscDesc] = useState(props.ascDesc ? props.ascDesc : "ASC");
  const [findBy, setFindBy] = useState({ where: "name", value: "" });
  const [tableName, setTableName] = useState(props.table_name);
  const { openModal } = useModal();
  const { modalState, toggleModal } = useModal();

  useEffect(() => {
    fetchData();
  }, [findBy, orderBy, ascDesc]);

  useEffect(() => {
    setPrevPageNum(pageNum);
  }, [pageNum]);

  useEffect(() => {
    if (pageNum > prevPageNum) {
      fetchData();
    }
  }, [pageNum]);

  const fetchData = () => {
    fetchDataFromApi(
      tableName,
      setData,
      dbFields,
      findBy,
      pageNum,
      itemsPerPage,
      orderBy,
      ascDesc,
      setAllDataFetched,
      setDbFields
    );
  };

  const handleEndReached = () => {
    if (!allDataFetched) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  const clearDataAndResetPagination = () => {
    setData([]);
    setAllDataFetched(false);
    setPageNum(0);
  };

  const handleChangeFindByValue = (text) => {
    clearDataAndResetPagination();
    setFindBy({ ...findBy, value: text });
  };

  const handleOrderByChange = (value) => {
    clearDataAndResetPagination();
    setOrderBy(value);
  };

  const handleAscDescChange = (value) => {
    clearDataAndResetPagination();
    setAscDesc(value);
  };

  const handleCRUD = (childRet, crudType) => {
    if (!childRet) return;
    let updatedData = [...data];
    const formValues = Object.fromEntries(
      Object.entries(childRet.form).filter(([key, value]) =>
        dbFields.includes(key)
      )
    );
    childRet.ids.forEach((updatedItemId) => {
      switch (crudType) {
        case "update":
          const originalItemIndex = data.findIndex(
            (dataItem) => dataItem.id === updatedItemId
          );
          if (originalItemIndex !== -1) {
            updatedData[originalItemIndex] = {
              ...formValues,
              id: updatedItemId,
            };
          }
          break;
        case "create":
          updatedData.push({ ...formValues, id: updatedItemId });
          break;
        case "delete":
          updatedData = updatedData.filter((item) => item.id !== updatedItemId);
          break;
        default:
          break;
      }
    });
    updatedData.sort((a, b) => {
      const idA = parseInt(a[orderBy]);
      const idB = parseInt(b[orderBy]);

      // Compare lengths of IDs first
      if (a[orderBy].length !== b[orderBy].length) {
        return a[orderBy].length - b[orderBy].length;
      } else {
        // If lengths are the same, compare numerical values
        if (ascDesc === "ASC") return idA - idB;
        else return idB - idA;
      }
    });
    setData(updatedData);
    toggleModal();
  };

  const handleDelete = (childRet) => {
    handleCRUD(childRet, "delete");
  };

  const handleUpdate = (childRet) => {
    handleCRUD(childRet, "update");
  };

  const handleCreate = (childRet) => {
    handleCRUD(childRet, "create");
  };
  const handleItemPress = (item, crudtype = "update") => {
    const buttons = [];
    let hiddenInputs = ["table_name", "what", "where"];
    const fields = Object.keys(item);
    let fieldsObj = (dbFields) =>
      dbFields.reduce((obj, key) => ({ ...obj, [key]: null }), {});
    let formFields = item;
    let callbacks = {};
    switch (crudtype) {
      case "create":
        buttons.push("create");
        formFields = dbFields.reduce(
          (obj, key) => ({ ...obj, [key]: null }),
          {}
        );
        break;
      case "update":
        buttons.push("update");
        hiddenInputs.push("id");
        callbacks.onUpdateCallback = (childRet) => handleUpdate(childRet);
        break;
      case "delete":
        buttons.push("delete");
        hiddenInputs = [...hiddenInputs, ...fields];
        break;
      default:
    }
    return openModal(
      <CRUDform
        {...formFields}
        hiddenInputs={hiddenInputs}
        notInputs={["buttons"]}
        table_name={tableName}
        buttons={buttons}
        {...callbacks}
        onDeleteCallback={(childRet) => handleDelete(childRet)}
        onUpdateCallback={(childRet) => handleUpdate(childRet)}
        onCreateCallback={(childRet) => handleCreate(childRet)}
      />
    );
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => handleItemPress(item)}
      style={GlobalStyles.itemContainer}
    >
      {Object.entries(item).map(([key, value]) => (
        <View key={key} style={GlobalStyles.row}>
          <Text style={GlobalStyles.key}>{key}:</Text>
          <Text style={GlobalStyles.value}>{value}</Text>
        </View>
      ))}
      <View style={GlobalStyles.buttonContainer}>
        <HgButton
          title="Update"
          onPress={() => handleItemPress(item, "update")}
        />
        <HgButton
          title="Delete"
          onPress={() => handleItemPress(item, "delete")}
        />
      </View>
    </Pressable>
  );

  return (
    <View style={GlobalStyles.container}>
      <TextInput
        key="searchbar"
        name="searchbar"
        style={GlobalStyles.search}
        placeholder="Search..."
        placeholderTextColor="#999"
        underlineColorAndroid="transparent"
        value={findBy.value}
        onChangeText={handleChangeFindByValue}
      />

      <View style={GlobalStyles.pickerContainer}>
        <Picker
          name="orderBy"
          selectedValue={orderBy}
          onValueChange={(itemValue) => handleOrderByChange(itemValue)}
          style={GlobalStyles.picker}
        >
          {dbFields.map((field) => (
            <Picker.Item label={field} value={field} key={`orderBy-${field}`} />
          ))}
        </Picker>
        <Picker
          name="asc/desc"
          selectedValue={ascDesc}
          onValueChange={(itemValue) => handleAscDescChange(itemValue)}
          style={GlobalStyles.picker}
        >
          {["ASC", "DESC"].map((field) => (
            <Picker.Item label={field} value={field} key={`ascDesc-${field}`} />
          ))}
        </Picker>
      </View>
      <HgButton title="New" onPress={() => handleItemPress({}, "create")} />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default TableList;
