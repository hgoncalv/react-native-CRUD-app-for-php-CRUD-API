import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  buttonPressed: {
    backgroundColor: "#0056b3",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  key: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  input: {
    height: 40,
    // width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  closeIcon: {
    position: "absolute",
    top: -22,
    right: -22,
    zIndex: 1,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 50,
  },
  icon: {
    userSelect: "none",
  },
  scrollView: {
    flex: 1,
    maxHeight: "100%",
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  soloItemContainer: {
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    position: "relative",
    maxHeight: height * 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  TwoColcontainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
  },
  TwoColflatListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  TwoColitemContainer: {
    width: "45%", // Default width for even number of items
    margin: "2.5%", // Add margin to create spacing between items
    alignItems: "center",
    borderWidth: 1, // Add border
    borderColor: "black", // Border color
    borderRadius: 5, // Border radius for a rounded look
    paddingVertical: 10, // Add vertical padding for better appearance
  },
  TwoColsoloItemContainer: {
    width: "95%", // Adjusted width for solo item
  },
});

export default GlobalStyles;
