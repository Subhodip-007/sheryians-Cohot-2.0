const getPagination = (
    page = 1,
    limit = 20
) => {

    const currentPage =
        Math.max(
            1,
            Number(page)
        );


    const pageSize =
        Math.min(
            100,
            Math.max(
                1,
                Number(limit)
            )
        );


    return {
        page:
            currentPage,

        limit:
            pageSize,

        skip:
            (
                currentPage - 1
            ) *
            pageSize
    };
};


export {
    getPagination
};
