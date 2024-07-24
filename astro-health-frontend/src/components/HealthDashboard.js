import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HealthDashboard.css';

const HealthDashboard = () => {
   const [data, setData] = useState(null);
   const [prompt, setPrompt] = useState('');
   const [recommendation, setRecommendation] = useState('');
   const [error, setError] = useState('');
   const [showRecommendation, setShowRecommendation] = useState(false); 

   useEffect(() => {
       axios.get('http://localhost:5002/api/health-data')
           .then(response => {
               setData(response.data[0]);  // only take the first item
           })
           .catch(error => {
               console.error('Error fetching health data:', error);
           });
   }, []);

   const handleRecommendationRequest = () => {
       axios.post('http://localhost:5002/api/recommendations', { prompt })
           .then(response => {
               setRecommendation(response.data.choices[0].text);
               setShowRecommendation(true); // will accc show recommendation
           })
           .catch(error => {
               setError('Error fetching recommendations: ' + (error.response ? error.response.data.error : error.message));
               console.error('Error fetching recommendations:', error);
           });
   };

   return (
       <div className="health-dashboard">
           <h1>Health Metrics Dashboard</h1>
           <div className="apple-watch-status">Apple Watch is connected</div>
           {data && (
               <div className="metric">
                   <p><strong>Date:</strong> {new Date(data.timestamp).toLocaleDateString()}</p>
                   <p><strong>Heart Rate:</strong> {data.heartRate} bpm</p>
                   <p><strong>Oxygen Level:</strong> {data.oxygenLevel}%</p>
                   <p><strong>Steps:</strong> {data.steps}</p>
                   <p><strong>Calories Burned:</strong> {data.caloriesBurned}</p>
               </div>
           )}
           <div className="recommendation-section">
               <h2>Get Personalized Recommendations</h2>
               <textarea
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   placeholder="Enter a prompt for personalized health recommendations"
               />
               <button onClick={handleRecommendationRequest}>Get Recommendations</button>
               {error && <p className="error">{error}</p>}
               {showRecommendation && (
                   <div className="recommendation-result">
                       <button className="close-button" onClick={() => setShowRecommendation(false)}>X</button>
                       <h3>Recommendation:</h3>
                       <p>{recommendation}</p>
                   </div>
               )}
           </div>
       </div>
   );
};

export default HealthDashboard;