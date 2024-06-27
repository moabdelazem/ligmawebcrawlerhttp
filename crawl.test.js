const { normalizeUrl, getUrlsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

// Normalize The URL -- Every link should be the same
// https://example.com => http://example.com => https://Example.com

test("normalizeUrl strip protocol", () => {
  const input = "https://blog.example.com/path";
  const actual = normalizeUrl(input);
  const expected = "blog.example.com/path";

  expect(actual).toEqual(expected);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "https://api.example.com/path/";
  const actual = normalizeUrl(input);
  const expected = "api.example.com/path";

  expect(actual).toEqual(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://BLOG.example.com/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.example.com/path";

  expect(actual).toEqual(expected);
});

test("normalizeUrl strip http", () => {
  const input = "http://blog.example.com/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.example.com/path";

  expect(actual).toEqual(expected);
});

// getUserUrls => Getting The Urls From HtmlData

test("getUrlsFromHTML absolute ", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.example.com/path/">
            Example.com Blog
        </a>
    </body>
</html>
`;

  const inputBaseUrl = "https://blog.example.com/path/";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.example.com/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML relative", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            This is Path
        </a>
    </body>
</html>
`;

  const inputBaseUrl = "https://blog.example.com";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.example.com/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML both types of links", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="/path1/">
            This is Path One 
        </a>
        <a href="https://blog.example.com/path2/">
            This is Path Two 
        </a>
    </body>
</html>
`;

  const inputBaseUrl = "https://blog.example.com";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [
    "https://blog.example.com/path1/",
    "https://blog.example.com/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML invalid", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            Invalid Url
        </a>
    </body>
</html>
`;

  const inputBaseUrl = "https://blog.example.com";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});
