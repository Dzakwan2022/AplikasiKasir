import axios from 'axios';
import { useState } from 'react';
    
export const Cuaca = () => {

    const [hasil, setHasil] = useState('');
    

    const url = `https://api.openweathermap.org/data/2.5/weather?q=Bandung&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

    axios.get(url).then((respon) => {
    setHasil(respon.data);
      }).catch((error) => {
        console.error('Data Hilang:', error);
    });
 

    return(
        <>
            <div>
                <b>{hasil ? <p>{hasil.main.temp.toFixed()}°C,{hasil.name}</p> : null}</b>
            </div>
        </>
    )
}
