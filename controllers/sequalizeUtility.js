

const getPagination = (page, size) => {
    let limit=null;
    let offset=null;
    if(page==null || size==null) {
        return { limit, offset };
    }
    limit = size ? +size : 3;
    offset = page ? page * limit : 0;
    return { limit, offset };
};
  

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: casts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, casts, totalPages, currentPage };
};

const getPagingAndFilteredData = (data, page, limit) => {
    // console.log(JSON.stringify(data))
    const { count: totalItems, rows: casts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {
        info: {
            count: totalItems,
            pages: totalPages
        },
        results: casts
    }
};
  

module.exports = {
    getPagination,
    getPagingData,
    getPagingAndFilteredData
}