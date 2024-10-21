const pagination = (pageNo, pageSize) => {
    const { limit, offset } = {
        limit:parseInt(pageSize) >= 0 ? parseInt(pageSize) : 10,
        offset: parseInt(pageNo) > 0 ? (parseInt(pageNo) - 1)*parseInt(pageSize) : 0
    };
    return {offset, limit }
}

module.exports = pagination;