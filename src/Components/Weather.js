import React from 'react';

const Weather = props =>(
    <div className="infoWeather">
        {props.city &&
            <div style={{textAlign:'center'}}>
                <h2>{props.city}, {props.country}</h2> 
                <p style={{marginBottom:-10}}>{props.weatherIcon}</p> 
                <h2>{props.temp}&deg;C</h2> 
                <p>{props.description}</p> 
                
            </div>
        }
            <p className="error">{props.error}</p>
    </div>
)

export default Weather;
