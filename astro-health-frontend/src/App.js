import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import HealthDashboard from './components/HealthDashboard';
import VisualRepresentation from './components/VisualRepresentation'; // new component (dont forget)
import './App.css';

function App() {
 return (
   <Router>
     <div className="App">
       <Sidebar />
       <div className="content">
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/health-dashboard" element={<HealthDashboard />} />
           <Route path="/visual-representation" element={<VisualRepresentation />} /> {/* added route for visual representation */}
         </Routes>
       </div>
     </div>
   </Router>
 );
}

export default App;