// Utility to retrieve saved place IDs from localStorage
export const getSavedPlaceIds = (): string[] => {
  try {
    const savedPlaceIds = localStorage.getItem('saved_places')
      ? JSON.parse(localStorage.getItem('saved_places')!)
      : [];
    return savedPlaceIds;
  } catch (err) {
    console.error('Failed to access localStorage:', err);
    return [];
  }
};

// Utility to save place IDs to localStorage
export const savePlaceIds = (placeIdArr: string[]): void => {
  try {
    if (placeIdArr.length) {
      localStorage.setItem('saved_places', JSON.stringify(placeIdArr));
    } else {
      localStorage.removeItem('saved_places');
    }
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

// Utility to remove a specific place ID from localStorage
export const removePlaceId = (placeId: string): boolean => {
  try {
    const savedPlaceIds = localStorage.getItem('saved_places')
      ? JSON.parse(localStorage.getItem('saved_places')!)
      : null;

    if (!savedPlaceIds) {
      return false;
    }

    const updatedSavedPlaceIds = savedPlaceIds.filter(
      (savedPlaceId: string) => savedPlaceId !== placeId
    );
    localStorage.setItem('saved_places', JSON.stringify(updatedSavedPlaceIds));

    return true;
  } catch (err) {
    console.error('Failed to remove place ID from localStorage:', err);
    return false;
  }
};

// Utility to clear all saved places from localStorage
export const clearSavedPlaces = (): void => {
  try {
    localStorage.removeItem('saved_places');
  } catch (err) {
    console.error('Failed to clear localStorage:', err);
  }
};
