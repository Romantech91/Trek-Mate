import MapDisplay from "../../client/src/components/MapDisplay.tsx";

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept({
        method: 'GET',
        url: '/api/questions/random'
      },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
      ).as('searchNPS')
    });

  it('should start the quiz and display the first question', () => {
    cy.mount(<MapDisplay />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should render the map', () => {
    cy.mount(<MapDisplay />);
    cy.get('button').contains('Start Quiz').click();

    // Answer questions
    cy.get('button').contains('1').click();

    // Verify the quiz completion
    cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
  });

  it('should restart the quiz after completion', () => {
    cy.mount(<MapDisplay />);
    cy.get('button').contains('Start Quiz').click();

    // Answer questions
    cy.get('button').contains('Submit').click();

  });
});
