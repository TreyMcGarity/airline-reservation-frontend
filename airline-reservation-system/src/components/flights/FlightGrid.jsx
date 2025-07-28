// FlightGrid.jsx
import styled from 'styled-components';

const FlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export default FlightGrid;
