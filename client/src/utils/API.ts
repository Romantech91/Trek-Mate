
// make a search to maps api
export const searchNPS = (query: string) => {
  return fetch(`https://developer.nps.gov/api/v1/campgrounds?stateCode=${query}=${query}&api_key=${API_KEY}`);
};
