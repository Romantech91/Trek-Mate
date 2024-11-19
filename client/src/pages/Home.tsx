import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchNPS } from '../utils/API';
import { savePlaceIds, getSavedPlaceIds } from '../utils/localStorage';
import type { Place } from '../models/Place';
import type { NPSAPIPlace } from '../models/NPSAPI';
import { SAVE_PLACE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import MapDisplay from '../components/MapDisplay';

const Home = () => {
  // create state for holding returned google api data
  const [searchedPlaces, setSearchedPlaces] = useState<Place[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedPlaceIds, setSavedPlaceIds] = useState(getSavedPlaceIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmounts
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savePlaceIds(savedPlaceIds);
  }, [savedPlaceIds]);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const campgrounds = await searchNPS(searchInput);

      console.log(campgrounds); 
      const placeData = campgrounds.map((place: NPSAPIPlace) => ({
        placeId: place.id,
        name: place.parkInfo.name,
        description: place.parkInfo.description,
      }));
      console.log(placeData);
      setSearchedPlaces(placeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // useMutation hook for saving a book
  const [savePlace] = useMutation(SAVE_PLACE);

  // create function to handle saving a book to our database
  const handleSavePlace = async (placeId: string) => {
    // find the book in `searchedBooks` state by the matching id
    const placeToSave: Place = searchedPlaces.find((place) => place.placeId === placeId)!;

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);
    if (!token) {
      console.error('No token found, please log in to save places.');
      return false;
    }

    try {
      const response = await savePlace({
        variables: { input: placeToSave },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      if (!response.data) {
        throw new Error('Failed to save the place.');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedPlaceIds([...savedPlaceIds, placeToSave.placeId]);
    } catch (err) {
      console.error(err);
    }
  };

  const locations = searchedPlaces
  .filter(place => place.location?.lat && place.location?.lng)
  .map(place => ({
    lat: place.location.lat,
    lng: place.location.lng,
    name: place.name,
  }));


  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Places!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a place'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
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
      </Container>
      <MapDisplay locations={locations} zoomLevel={10}/>
    </>
  );
};

export default Home;
