import React from 'react';
import './HomePage.css'; // add styles for the homepage


const HomePage = () => {
 return (
   <div className="home-page">
     <header className="header">
       <h1>Welcome to Astro-Health</h1>
       <p className="subtitle">"we know space is tough, but your health is important too."</p>
     </header>
     <div className="content">
       <p className="message">
         staying healthy in space is crucial for your mission. Astro will provide personalized health
         metrics, continuous data collection, and critical alerts to ensure you stay in top shape.
       </p>
     </div>
   </div>
 );
};


export default HomePage;