
// const API_KEY = 'SE2pqSQA5gDRSax0XSmb6keLsi0GWsbIaOAc1p56';
// make a search to nps api
export const searchNPS = async (query: string) => {
  try {
    const url = `https://developer.nps.gov/api/v1/campgrounds?stateCode=${query}&api_key=${import.meta.env.VITE_NPS_API_KEY}`;
    const response = await fetch(
      url
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API.');
    }
    const campgrounds = await response.json();
    return campgrounds.data || []; // Parse the JSON data here
  } catch (error) {
    console.error(error);
    return null;
  }
};
