import React from 'react';
import Info from './Components/Info';
import Form from './Components/Form';
import Weather from './Components/Weather';

const API_KEY = "20eff796751be7c7aeca74e6c6d6522d"

class App extends React.Component{
    state={
        temp:undefined,
        city:undefined,
        country:undefined,
        description:undefined,
        error:undefined
    }

   weatherIcon = {
      Thunderstorm: "http://openweathermap.org/img/wn/11d@2x.png",
      Drizzle: "http://openweathermap.org/img/wn/09d@2x.png",
      Rain: "http://openweathermap.org/img/wn/10d@2x.png",
      Snow: "http://openweathermap.org/img/wn/13d@2x.png",
      Atmosphere: "http://openweathermap.org/img/wn/50d@2x.png",
      Clear: "http://openweathermap.org/img/wn/01d@2x.png",
      Clouds: "http://openweathermap.org/img/wn/02d@2x.png"
    }


  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }


    calCelsius(temp) {
        var cell = Math.floor(temp);
        return cell;
    }


    getWeather = async (e) =>{
        e.preventDefault();
        var city = e.target.elements.city.value;
        
        if(city){
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        
        
            
        this.setState({
            temp:this.calCelsius(data.main.temp),
            city:data.name,
            country:data.sys.country, 
            description: data.weather[0].description,
           
            error: undefined
            
        });
            this.get_WeatherIcon(this.weatherIcon,data.weather[0].id)
            
      }else{
        this.setState({
          temp:undefined,
          city:undefined,
          country:undefined,
          description:undefined,
          error: 'Enter the name of the city'
        });
      }
    }
    
  
    
    render(){
        return(
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.getWeather} />
                                    <Weather
                                        temp={this.state.temp}
                                        city={this.state.city}
                                        country={this.state.country}
                                        description={this.state.description}
                                        error={this.state.error}
                                        weatherIcon=<img src={this.state.icon} />
                                    />
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
};

export default App;
