import './App.css';
import {useEffect, useState} from "react"

import Image from 'material-ui-image';
import amazon from './images/amazon.png'
import alibaba from './images/alibaba.png'
import gmarket from './images/gmarket.png'
import Carousel from 'react-material-ui-carousel'
const { Button } = require('@material-ui/core');


function App() {
  const [posiciones, setPosiciones] = useState([])


   useEffect( () => {
     async function setupearWebGazer(){
      const webGazer = window.webgazer
      const webgazerInstance = await webGazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('TFFacemesh')
        .begin();
        
    webGazer.pause();
      
      webgazerInstance.showVideoPreview(true) /* shows all video previews */
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
        .applyKalmanFilter(true); // Kalman Filter defaults to on.
  
      webGazer.setGazeListener((data, clock) =>{
        // console.log(data, clock)
        if(data != null){
          posiciones.push(data)
          setPosiciones(posiciones)
        }
       
      })
     }
     setupearWebGazer()
   
    
  }, [])

  function guardar(){
    const webgazer = window.webgazer
    webgazer.pause();
    console.log(posiciones)
  }
  function empezar(nombre){
    const webgazer = window.webgazer
    webgazer.resume();
    console.log(nombre)
    console.log(posiciones)
  }
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
  <Carousel swipe={false} autoPlay={false}>
      <Image
        src={amazon}
        onClick={()=>{empezar("primer")}}
        aspectRatio={(16/9)}
        disableSpinner
      />

    <Image
        src={alibaba}
        onClick={()=>{empezar("segundo")}}
        aspectRatio={(16/9)}
        disableSpinner
      />

<Image
        src={gmarket}
        onClick={()=>{empezar("segundo")}}
        aspectRatio={(16/9)}
        disableSpinner
      />
  </Carousel>
  

      <Button  onClick={guardar}>
        finalizar
      </Button>


    </div>
  );
}

export default App;
