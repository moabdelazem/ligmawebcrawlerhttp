const { JSDOM } = require("jsdom");

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

module.exports = { normalizeUrl, getUrlsFromHTML };
