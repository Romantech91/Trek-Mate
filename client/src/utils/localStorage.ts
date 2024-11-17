export const getSavedPlaceIds = () => {
  const savedPlaceIds = localStorage.getItem('saved_places')
    ? JSON.parse(localStorage.getItem('saved_places')!)
    : [];

  return savedPlaceIds;
};

export const savePlaceIds = (placeIdArr: string[]) => {
  if (placeIdArr.length) {
    localStorage.setItem('saved_places', JSON.stringify(placeIdArr));
  } else {
    localStorage.removeItem('saved_places');
  }
};

export const removePlaceId = (placeId: string) => {
  const savedPlaceIds = localStorage.getItem('saved_places')
    ? JSON.parse(localStorage.getItem('saved_places')!)
    : null;

  if (!savedPlaceIds) {
    return false;
  }

  const updatedSavedPlaceIds = savedPlaceIds?.filter((savedPlaceId: string) => savedPlaceId !== placeId);
  localStorage.setItem('saved_places', JSON.stringify(updatedSavedPlaceIds));

  return true;
};
