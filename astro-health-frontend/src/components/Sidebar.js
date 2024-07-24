import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const menuItems = [
  { text: 'Home', path: '/' },
  { text: 'Health Dashboard', path: '/health-dashboard' },
  { text: 'Visual Representation', path: '/visual-representation' } 
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Astro-Health</h2>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button component={Link} to={item.path} key={index}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;