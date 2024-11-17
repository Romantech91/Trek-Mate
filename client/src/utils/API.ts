
// make a search to maps api
export const searchNPS = async (query: string) => {
  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/campgrounds?stateCode=${query}&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from the API.');
    }

    return await response.json(); // Parse the JSON data here
  } catch (error) {
    console.error(error);
    return null; // Or handle errors however you'd like
  }
};
