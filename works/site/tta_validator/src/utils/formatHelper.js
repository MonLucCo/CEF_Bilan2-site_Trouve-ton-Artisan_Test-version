const formatResults = (results) => {
    return results.map(result => ({
        page: result.page,
        htmlErrors: result.html.errors.length,
        cssErrors: result.css.errors.length
    }));
};

module.exports = { formatResults };
