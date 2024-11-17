// import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// import { deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removePlaceId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_PLACE } from '../utils/mutations';
import { User } from '../models/User';
import { Place } from '../models/Place';

interface UserData {
  me : User;
}

interface RemovePlaceData {
  removePlace: Place;
}

const SavedPlaces = () => {
  // useQuery hook to execute the GET_ME query
  const { loading, error, data } = useQuery<UserData>(GET_ME);

  // useMutation hook for REMOVE_BOOK
  const [removePlace] = useMutation<RemovePlaceData>(REMOVE_PLACE, {
    update(cache, { data: { removePlace } }) {
      try {
        // Read the existing data from the cache
        const { me } = cache.readQuery<UserData>({ query: GET_ME });

        if (me) {
        // Write the new data to the cache by filtering out the deleted book
        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...me,
              savedPlaces: me.savedBooks.filter((place: Place) => place.placeId !== removePlace.placeId),
            },
          },
        });
      } else {
        console.error('No me found in cache');
      }
      } catch (e) {
        console.error(e);
      }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.me || { savedPlaces: [] };

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeletePlace = async (placeId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute the REMOVE_BOOK mutation
      await removePlace({
        variables: { placeId },
      });

      // Remove the book's id from localStorage
      removePlaceId(placeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData.savedPlaces.length) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved places!</h1>
          ) : (
            <h1>Viewing saved places!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedPlaces.length
            ? `Viewing ${userData.savedPlaces.length} saved ${
                userData.savedPlaces.length === 1 ? 'place' : 'places'
              }:`
            : 'You have no saved places!'}
        </h2>
        <Row>
          {userData.savedPlaces.map((place) => {
            return (
              <Col md='4'>
                <Card key={place.placeId} border='dark'>
                  {place.image ? (
                    <Card.Img
                      src={place.image}
                      alt={`The cover for ${place.name}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{place.name}</Card.Title>
                    <p className='small'>Authors: {place.savedPlaces}</p>
                    <Card.Text>{place.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeletePlace(place.placeId)}
                    >
                      Delete this Place!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedPlaces;
