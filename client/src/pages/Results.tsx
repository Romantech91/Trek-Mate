
import MapDisplay from '../components/MapDisplay';
// import Login from '../components/LoginForm';
import map1 from '../utils/images/forest5.jpg';
import './Results.css';




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
    {/* <div style={{border:'solid,white'}}><Login /></div> */}
      <div className='sigma1'>
        
        <div className=''>
          
          <MapDisplay />
        </div>
      </div>
    </div>
    );
  };
  
  export default ResultsPage;
  