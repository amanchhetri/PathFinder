import './App.css';
import Map from "./components/Map/Map"
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [clicked, setButtonClicked]= useState(false)
  const [clearclicked, setclearclicked]= useState(false)



  return (
    <div className="App">
      <Map 
      ></Map>
      <div>
     {/* <button style={{height:"50px", width:"100px", background:"skyblue"}}
      onClick={()=>{
        setButtonClicked(true)
      }}
      >makeroute</button>
      <button style={{height:"50px", width:"100px", background:"red"}}
      onClick={()=>{
        setclearclicked(true)
      }}
    >clear</button>*/}
      </div>
    </div>
  );
}

export default App;
