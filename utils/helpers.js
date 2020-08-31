const fs = require("fs");
const services = require("../services/packageService");

const dataToObjArray = () => {
  fs.readFile("data.txt", async function (_err, data) {
    const packageList = await services.queryPackages();

    //change to string, replace carriage return and split the string in each line breacks
    const arrayList = data
      .toString()
      .replace(/\r/g, "")
      .split(/\n\s*\n/);

    //create package onject
    const packageArray = arrayList.map((list) => {
      return arrayToObject(list);
    });

    //add reverse dependency to the package object
    addReverseDepencency(packageArray);

    //check if the db is empty or not and only save packages if the db is empty
    if (packageList.length < 1) {
      packageArray.map(async (a) => {
        const abb = await services.savePackageToDb(a);
        console.log(abb);
      });
    }
  });
};

const arrayToObject = (arr) => {
  let obj = {};

  //split in each line break so that it is easier to create chuncks and later change to key value pair
  const packageProperties = arr.split("\n");

  for (let i = 0; i < packageProperties.length; i++) {
    let chunk = packageProperties[i].split(": ");

    //concat all the description that are splitted during the line-break
    if (chunk[1] === undefined && obj.Description) {
      obj["Description"] = obj.Description.concat(chunk[0]);
    }
    obj[chunk[0]] = chunk[1];
  }
  return obj;
};

const addReverseDepencency = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    //filter the packages that depend on the arr[i] package
    //it will return the whole package object
    const reverseDependency = arr.filter(
      (a) => a.Depends && a.Depends.includes(arr[i].Package)
    );
    arr[i]["reverseDependency"] = reverseDependency.map((r) => r.Package);
  }
  return arr;
};

module.exports = dataToObjArray;
