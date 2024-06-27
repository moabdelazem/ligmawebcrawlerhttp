function normalizeUrl(urlString) {
  const objUrl = new URL(urlString);
  const hostPath = `${objUrl.hostname}${objUrl.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = { normalizeUrl };
