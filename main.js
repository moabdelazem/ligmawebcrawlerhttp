const { crawlPage } = require("./crawl.js");

function main() {
    if (process.argv.length < 3) {
        console.log("no website provided!");
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log("too may command line args provided!");
        process.exit(1);
    }
    const baseUrl = process.argv[2];
    console.log(`starting crawling on ${baseUrl}...`);
    crawlPage(baseUrl);
}

main();
