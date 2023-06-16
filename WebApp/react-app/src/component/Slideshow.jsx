import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Fallingwater_House from "C:/Users/10353/Documents/GitHub/Capstone-2021/WebApp/react-app/src/component/imgs/Fallingwater_House.jpg"
//import Fallingwater_Floorplan from "C:/Users/10353/Documents/GitHub/Capstone-2021/WebApp/react-app/src/component/imgs/Fallingwater_Floorplan.jpg"
function importAll(r) {
  return r.keys().map(r);
}
class Slideshow extends React.Component {
    constructor(props){
      super(props)

      const list={
        "Ark Nova":importAll(require.context(`./imgs/Ark Nova`, false)),
        "Baker House":importAll(require.context(`./imgs/Baker House`, false)),
        "Bilbao Guggenheim Museum":importAll(require.context(`./imgs/Bilbao Guggenheim Museum`, false)),
        "Biomuseo":importAll(require.context(`./imgs/Biomuseo`, false)),
        "Capitol Complex":importAll(require.context(`./imgs/Capitol Complex`, false)),
        "Castelvecchio Museum":importAll(require.context(`./imgs/Castelvecchio Museum`, false)),
        "Chapel on Mt. Rokko":importAll(require.context(`./imgs/Chapel on Mt. Rokko`, false)),
        "Chee Tong Temple":importAll(require.context(`./imgs/Chee Tong Temple`, false)),
        "Darwin D. Martin House and Estate":importAll(require.context(`./imgs/Darwin D. Martin House and Estate`, false)),
        "Denver Airport":importAll(require.context(`./imgs/Denver Airport`, false)),
        "Falling Water":importAll(require.context(`./imgs/Falling Water`, false)),
        "Freitag Tower":importAll(require.context(`./imgs/Freitag Tower`, false)),
        "Friedman House":importAll(require.context(`./imgs/Friedman House`, false)),
        "Gamble House":importAll(require.context(`./imgs/Gamble House`, false)),
        "Heydar Aliyev Centre":importAll(require.context(`./imgs/Heydar Aliyev Centre`, false)),
        "Hotel de Beauvais":importAll(require.context(`./imgs/Hotel de Beauvais`, false)),
        "Hunter Point Library":importAll(require.context(`./imgs/Hunter Point Library`, false)),
        "Investcorp Building":importAll(require.context(`./imgs/Investcorp Building`, false)),
        "Jewel Changi Airport":importAll(require.context(`./imgs/Jewel Changi Airport`, false)),
        "Katsura Imperial Villa":importAll(require.context(`./imgs/Katsura Imperial Villa`, false)),
        "Kaufmann House":importAll(require.context(`./imgs/Kaufmann House`, false)),
        "Koshino House":importAll(require.context(`./imgs/Koshino House`, false)),
        "LEGO House":importAll(require.context(`./imgs/LEGO House`, false)),
        "Library of Mount Angel":importAll(require.context(`./imgs/Library of Mount Angel`, false)),
        "Maison des Fondateurs":importAll(require.context(`./imgs/Maison des Fondateurs`, false)),
        "Marika-Alderton House":importAll(require.context(`./imgs/Marika-Alderton House`, false)),
        "Marques de Riscal Hotel":importAll(require.context(`./imgs/Marques de Riscal Hotel`, false)),
        "Monticello":importAll(require.context(`./imgs/Monticello`, false)),
        "Montreal Biosphere":importAll(require.context(`./imgs/Montreal Biosphere`, false)),
        "MoPOP":importAll(require.context(`./imgs/MoPOP`, false)),
        "Munich Olympic Stadium":importAll(require.context(`./imgs/Munich Olympic Stadium`, false)),
        "National Aquatics Center Beijing":importAll(require.context(`./imgs/National Aquatics Center Beijing`, false)),
        "National Museum of Qatar":importAll(require.context(`./imgs/National Museum of Qatar`, false)),
        "New Museum":importAll(require.context(`./imgs/New Museum`, false)),
        "Palace of Assembly":importAll(require.context(`./imgs/Palace of Assembly`, false)),
        "Phillips Exeter Academy Library":importAll(require.context(`./imgs/Phillips Exeter Academy Library`, false)),
        "Philips Pavilion":importAll(require.context(`./imgs/Philips Pavilion`, false)),
        "Poly Grand Theatre":importAll(require.context(`./imgs/Poly Grand Theatre`, false)),
        "Punta Della Dogana":importAll(require.context(`./imgs/Punta Della Dogana`, false)),
        "Rietveld-Schroeder House":importAll(require.context(`./imgs/Rietveld-Schroeder House`, false)),
        "Sainsbury Center":importAll(require.context(`./imgs/Sainsbury Center`, false)),
        "Samuel Freeman House":importAll(require.context(`./imgs/Samuel Freeman House`, false)),
        "Säynätsalo Town Hall":importAll(require.context(`./imgs/Säynätsalo Town Hall`, false)),
        "Sharp Centre for Design":importAll(require.context(`./imgs/Sharp Centre for Design`, false)),
        "Sher-e bangla Nagar":importAll(require.context(`./imgs/Sher-e bangla Nagar`, false)),
        "Social Science Research Centre, Germany":importAll(require.context(`./imgs/Social Science Research Centre, Germany`, false)),
        "Starhill Gallery":importAll(require.context(`./imgs/Starhill Gallery`, false)),
        "Stockholm Public Library":importAll(require.context(`./imgs/Stockholm Public Library`, false)),
        "Swatch Headquarters":importAll(require.context(`./imgs/Swatch Headquarters`, false)),
        "T3":importAll(require.context(`./imgs/T3`, false)),
        "Tetris Hotel":importAll(require.context(`./imgs/Tetris Hotel`, false)),
        "The Centre Pompidou":importAll(require.context(`./imgs/The Centre Pompidou`, false)),
        "The Interlace":importAll(require.context(`./imgs/The Interlace`, false)),
        "The Millennium Dome":importAll(require.context(`./imgs/The Millennium Dome`, false)),
        "UFA Cinema":importAll(require.context(`./imgs/UFA Cinema`, false)),
        "UMass Design Building":importAll(require.context(`./imgs/UMass Design Building`, false)),
        "Unité d_Habitation":importAll(require.context(`./imgs/Unité d_Habitation`, false)),
        "V_A Spiral":importAll(require.context(`./imgs/V_A Spiral`, false)),
        "Venice Hospital, Le Corbusier":importAll(require.context(`./imgs/Venice Hospital, Le Corbusier`, false)),
        "Villa Savoye":importAll(require.context(`./imgs/Villa Savoye`, false)),
        "Villa Shodhan":importAll(require.context(`./imgs/Villa Shodhan`, false)),
        "Vitra Fire Station":importAll(require.context(`./imgs/Vitra Fire Station`, false)),
        "Vouksenniska Church":importAll(require.context(`./imgs/Vouksenniska Church`, false)),
        "W. A. Glasner House":importAll(require.context(`./imgs/W. A. Glasner House`, false)),
        "Walt Disney Concert Hall":importAll(require.context(`./imgs/Walt Disney Concert Hall`, false)),
        "Wingspread":importAll(require.context(`./imgs/Wingspread`, false))
      }

      console.log(list)
      this.images = []
      
      
      
      for(var i in list[props.precedence])
        this.images.push(list[props.precedence][i].default)
      this.state = {
        currentIndex: 0,
      }
      this.goToPrevSlide = this.goToPrevSlide.bind(this);
      this.goToNextSlide = this.goToNextSlide.bind(this);
      
    }
  
    goToPrevSlide () {
      const {currentIndex} = this.state;
      const newPointer = currentIndex === 0 ? this.images.length -1 : currentIndex - 1;
      this.setState({currentIndex: newPointer});
    }
    
    goToNextSlide ()  {
      const {currentIndex} = this.state;
      const newPointer = currentIndex === this.images.length - 1 ? 0 : currentIndex + 1;
      this.setState({currentIndex: newPointer});
    }

    


    render(){
      if (window.innerWidth>400){      return(
        <div className="Slideshow" float="center" marginLeft="50" width="100%" style={{textAlign:"center"}}>
         
          <button class = "prev" onClick={this.goToPrevSlide}>&#10094;</button>
          
          <img src={this.images[this.state.currentIndex]} width="400" class="img"/>
          
          <button class = "next" onClick={this.goToNextSlide}>&#10095;</button>
          <br/>
        </div>

    );}
    else{return(
      <div className="Slideshow" float="center" marginLeft="50" width="100%">
      <img src={this.images[this.state.currentIndex]} width="400" class="img"/>
      <div style={{textAlign:"center"}} >
      <button class = "prev" onClick={this.goToPrevSlide} style={{zIndex:1}}>&#10094;</button>
      <button class = "next" onClick={this.goToNextSlide} style={{zIndex:1}}>&#10095;</button>
      
      </div>

    </div>
    )
    }

      
  }
  
  }
export default Slideshow;