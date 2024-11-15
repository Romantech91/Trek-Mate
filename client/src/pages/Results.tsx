
import MapDisplay from '../components/MapDisplay';
import map1 from '../utils/images/forest5.jpg';



const ResultsPage = () => {
  return (
    <div className=""
    style={{
      minHeight: '100vh',
      backgroundImage: `url(${map1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <div>
      <MapDisplay />
      </div>
    </div>
    );
  };
  
  export default ResultsPage;
  