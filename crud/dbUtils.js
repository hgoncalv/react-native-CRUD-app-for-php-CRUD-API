const convertWhereWhatFieldsToArray = (dataObj) => {
  if (
    dataObj.hasOwnProperty("what") &&
    typeof dataObj.what === "string" &&
    dataObj.what !== ""
  ) {
    dataObj.what = dataObj.what.split(",").map((item) => item.trim());
  }
  if (
    dataObj.hasOwnProperty("where") &&
    typeof dataObj.where === "string" &&
    dataObj.where !== ""
  ) {
    dataObj.where = dataObj.where.split(",").map((item) => item.trim());
  }
  return dataObj;
};

const filterEmptyNullHidden = (dataObj, notInputs) => {
  return Object.fromEntries(
    Object.entries(dataObj).filter(
      ([key, value]) => !["", null].includes(value) && key !== "hiddenInputs"
    )
  );
};

const setDefaultWhereConditionIfNeeded = (dataObj, method) => {
  if (
    (method === "PUT" || method === "DELETE" || method === "GET") &&
    (!dataObj.hasOwnProperty("where") ||
      (Array.isArray(dataObj.where) && !dataObj.where.length))
  ) {
    dataObj.where = ["id"];
  }
  return dataObj;
};

const prepareObj4Api = (formData, method = "POST", notInputs) => {
  let dataObj = { ...formData };

  dataObj = convertWhereWhatFieldsToArray(dataObj);
  dataObj = filterEmptyNullHidden(dataObj, notInputs);
  dataObj = setDefaultWhereConditionIfNeeded(dataObj, method);

  return dataObj;
};

export default prepareObj4Api;
