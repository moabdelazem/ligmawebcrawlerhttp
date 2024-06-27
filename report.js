function printReport(pages) {
    console.log("=========");
    console.log("REPORT");
    console.log("=========");

    const sortedPages = sortPages(pages);
    for (sortPage of sortedPages) {
        const url = sortPage[0];
        const hits = sortPage[1];
        console.log(`Found ${hits} links to page ${url}`);
    }

    console.log("=========");
    console.log("REPORT");
    console.log("=========");
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    });

    return pagesArr;
}

module.exports = {
    sortPages,
    printReport,
};
