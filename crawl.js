const { Http2ServerRequest } = require("http2");
const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentUrl, pages) {
    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);
    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        return pages;
    }

    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    if (pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++;
        return pages;
    }

    pages[normalizedCurrentUrl] = 1;

    console.log(`actively crawling : ${currentUrl}`);
    try {
        const response = await fetch(currentUrl);
        if (response.status > 399) {
            console.log(
                `error in fetching data ${response.status} on page ${currentUrl}`
            );
            return pages;
        }
        const contentType = response.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(
                `error non html respone, content type : ${contentType} on page ${currentUrl}`
            );
            return pages;
        }

        const htmlBody = await response.text();
        const nextUrls = getUrlsFromHTML(htmlBody, baseUrl);

        await Promise.all(
            nextUrls.map(async (nextUrl) => {
                pages = await crawlPage(baseUrl, nextUrl, pages);
            })
        );
    } catch (error) {
        console.log(`error in fetch : ${error}`);
    }
    return pages;
}

function getUrlsFromHTML(htmlBody, baseUrl) {
    const urls = [];
    const linksDOM = new JSDOM(htmlBody);

    const linkElements = linksDOM.window.document.querySelectorAll("a");
    for (let linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") {
            try {
                const objUrl = new URL(`${baseUrl}${linkElement.href}`);
                urls.push(objUrl.href);
            } catch (error) {
                console.log(
                    `there is something wrong with the provided url : ${error}`
                );
            }
        } else {
            try {
                const objUrl = new URL(linkElement.href);
                urls.push(objUrl.href);
            } catch (error) {
                console.log(
                    `there is something wrong with the provided url : ${error}`
                );
            }
        }
    }
    return urls;
}

// Normalize The Url From The User
function normalizeUrl(urlString) {
    const objUrl = new URL(urlString);
    const hostPath = `${objUrl.hostname}${objUrl.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = { normalizeUrl, getUrlsFromHTML, crawlPage };
