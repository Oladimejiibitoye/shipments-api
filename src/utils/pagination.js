const mongoose = require("mongoose");
const { BadRequestError } = require("./errors")

const getPagination = (page, size) => {
  const currentPage = page;
  const limit = size ? +size : 10;
  const skip = currentPage ? currentPage * limit : 0;

  return { limit, skip };
};

const getPagingData = async (pagingObj) => {
  const { data, Model, query, page, size } = pagingObj;
  let totalItems;
  if (query) {
    totalItems = await Model.countDocuments(query);
  } else {
    totalItems = await Model.countDocuments();
  }
  const currentPage = page ? +page : 0;
  const limit = size ? +size : 10;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    totalPages,
    currentPage,
    data,
  };
};


module.exports = {
  getPagination,
  getPagingData,
};
