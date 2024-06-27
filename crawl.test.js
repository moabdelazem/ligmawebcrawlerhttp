const { normalizeUrl } = require("./crawl.js");
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
