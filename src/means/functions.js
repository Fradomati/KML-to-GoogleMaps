export const removeFirstCoordinate = (url) => {
  var pattern = /\/dir\/[^\/]+\//;
  return url.replace(pattern, "/dir//");
};
