import React, { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons'
import "./app.css"

function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 46,
    longitude: 17,
    zoom: 4
  });

  // functino for changing viewports (not like tutorial)
  const handleViewportChange = (nextViewport) => {
    console.log("Viewport Changed:", nextViewport);
    setViewport(nextViewport);
  };

  return (
    <div className="App" style={{ height: '100vh', width: '100vw' }}>
      <ReactMapGL
        initialViewState={viewport}
        interactive={true}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={handleViewportChange}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onLoad={() => console.log('Map Loaded')}
        onError={(e) => console.error('Map Error:', e)}
      >
        <Marker
          latitude={48.858093}
          longitude={2.294694}
          offsetLeft={-20} 
          offsetRight={-10}       
        >
          <Room style={{fontSize:viewport.zoom * 7, color:"slateblue" }}/> 

        </Marker>
        
        {/* <Popup
          latitude ={48.858093}
          longitude ={2.294694}
          closeButton ={true}
          closeOnClick ={false}
          anchor = "left"
        >
          <div className='card'>
            <label>Place</label>
            <h4 className='place'>Eiffell Tower</h4>
            <label>Review</label>
            <p className='desc'>Beautiful Place</p>
            <label>Rating</label>
            <div className='stars'>
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
            </div>
            <label>Information</label>
            <span className='username'>Created by <b>Yuval</b></span>
            <span className='date'>1 Hour ago</span>
          </div>
        </Popup> */}
         

      </ReactMapGL>
    </div>
  );
}

export default App;
