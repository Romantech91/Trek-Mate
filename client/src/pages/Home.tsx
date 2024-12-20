import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
// import {
//   Container,
//   Col,
//   Button,
//   Card,
//   Row
// } from 'react-bootstrap';
import Auth from '../utils/auth';
import { searchNPS } from '../utils/API';
// import { savePlaceIds, getSavedPlaceIds } from '../utils/localStorage';
import type { Place } from '../models/Place';
import type { NPSAPIInfo } from '../models/NPSAPI';
// import { SAVE_PLACE } from '../utils/mutations';
// import { useMutation } from '@apollo/client';
import MapDisplay from '../components/MapDisplay';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PrivateRoutes from '../components/PrivateRoutes';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/');
    }
  }, []);
  // create state for holding returned google api data
  const [searchedPlaces, setSearchedPlaces] = useState<Place[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved placeId values
  // const [savedPlaceIds, setSavedPlaceIds] = useState(getSavedPlaceIds());

  // set up useEffect hook to save `savedPlaceIds` list to localStorage on component unmounts
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => savePlaceIds(savedPlaceIds);
  // }, [savedPlaceIds]);

  // create method to search for places and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const data = await searchNPS(searchInput);

      console.log(data); 
      const placeData = data.map((place: NPSAPIInfo) => ({
        lat: parseFloat(place.latitude), // Removes any non-numeric, non-decimal, non-minus sign
        lng: parseFloat(place.longitude),
        name: place.name,
        weather: place.weatherOverview,
        directions: place.directionsUrl,
        images: place.images,
        url: place.url,
      }));
      console.log(placeData);
      
      setSearchedPlaces(placeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // const locations = searchedPlaces
  // .filter(place => place.location?.lat && place.location?.lng)
  // .map(place => ({
  //   lat: place.location.lat,
  //   lng: place.location.lng,
  //   name: place.name,
  // }));

  // useMutation hook for saving a place
  // const [savePlace] = useMutation(SAVE_PLACE);

  // create function to handle saving a place to our database
  // const handleSavePlace = async (placeId: string) => {
  //   // find the place in `searchedPlaces` state by the matching id
  //   const placeToSave: Place = searchedPlaces.find((place) => place.placeId === placeId)!;

  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   console.log(token);
  //   if (!token) {
  //     console.error('No token found, please log in to save places.');
  //     return false;
  //   }

  //   try {
  //     const response = await savePlace({
  //       variables: { input: placeToSave },
  //       context: {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       },
  //     });

  //     if (!response.data) {
  //       throw new Error('Failed to save the place.');
  //     }

  //     // if book successfully saves to user's account, save book id to state
  //     setSavedPlaceIds([...savedPlaceIds, placeToSave.placeId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };



  


  return (
    <>
      <div className="text-light bg-dark p-5">
      <PrivateRoutes>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleFormSubmit={handleFormSubmit}
        />
      </PrivateRoutes>
      </div>
      {/* <Container>
        <h2 className='pt-5'>
          {searchedPlaces.length
            ? `Viewing ${searchedPlaces.length} results:`
            : 'Search for a place to begin'}
        </h2>
        <Row>
          {searchedPlaces.map((place) => {
            return (
              <Col md="4" key={place.placeId}>
                <Card border='dark'>
                  {place.description ? (
                    <Card.Img src={place.description} alt={`The cover for ${place.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{place.name}</Card.Title>
                    <p className='small'>Places {place.savedPlaces}</p>
                    <Card.Text>{place.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedPlaceIds?.some((savedPlaceId: string) => savedPlaceId === place.placeId)}
                        className='btn-block btn-info'
                        onClick={() => handleSavePlace(place.placeId)}>
                        {savedPlaceIds?.some((savedPlaceId: string) => savedPlaceId === place.placeId)
                          ? 'This place has already been saved!'
                          : 'Save this place!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container> */}
      <MapDisplay locations={searchedPlaces} zoomLevel={10}/>
    </>
  );
};

export default Home;
