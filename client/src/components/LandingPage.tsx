import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to the Campground & Hiking App!</h1>
      <p>Please log in or sign up to continue.</p>
      <div>
        <Link to="/login">
          <Button variant="primary" className="m-2">
            Log In
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="secondary" className="m-2">
            Sign Up
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default LandingPage;
