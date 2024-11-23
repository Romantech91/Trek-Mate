import { Form, Row, Col, Button } from 'react-bootstrap';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, setSearchInput, handleFormSubmit }) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <Row>
        <Col xs={12} md={8}>
          <Form.Control
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Search for a place"
          />
        </Col>
        <Col xs={12} md={4}>
          <Button type="submit" variant="success" size="lg">
            Submit Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
