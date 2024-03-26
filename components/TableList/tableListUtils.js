import { sendRequest } from "../../crud/CRUD";

export const prepareObj2fetchDataFromApi = (
  table_name,
  what = "*",
  findBy,
  pageNum,
  itemsPerPage,
  orderby,
  ascDesc
) => {
  what = typeof what === "string" ? [what] : what;
  const dataObj = {
    table_name: table_name,
    what: what,
    orderby: orderby,
    ascdesc: ascDesc,
  };
  if (findBy.value !== "") {
    dataObj.where = [findBy.where];
    dataObj.name = findBy.value;
    dataObj.like = true;
  }

  // Conditionally add limit and offset parameters
  if (itemsPerPage !== 0) {
    dataObj.limit = itemsPerPage;
    dataObj.offset = pageNum * itemsPerPage;
  }
  return dataObj;
};

export const fetchDataFromApi = (
  table_name,
  setData,
  what,
  findBy = null,
  pageNum = 0,
  itemsPerPage = 0,
  orderby = "",
  ascDesc = "ASC",
  setAllDataFetched = false,
  setDbFields
) => {
  const isDbFieldsEmpty = !!what;
  const dataObj = prepareObj2fetchDataFromApi(
    table_name,
    what,
    findBy,
    pageNum,
    itemsPerPage,
    orderby,
    ascDesc
  );
  sendRequest(dataObj, "GET")
    .then((responseData) => {
      if (!responseData.data) {
        setAllDataFetched(true);
      } else {
        if (responseData.data[0] && isDbFieldsEmpty)
          setDbFields(Object.keys(responseData.data[0]));
        setData((prevData) => [...prevData, ...responseData.data]);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
