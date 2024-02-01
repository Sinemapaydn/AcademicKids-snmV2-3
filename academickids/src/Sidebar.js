// Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'; // Import the CSS file

const Sidebar = ({ selectedTab, setSelectedTab, toggleSidebar, isOpen }) => {
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    toggleSidebar();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-close">
        <FontAwesomeIcon icon={faTimes} size="lg" onClick={toggleSidebar} />
      </div>
      <div>
        <div
          className={selectedTab === 'FoodSearch' ? 'active' : ''}
          onClick={() => handleTabClick('FoodSearch')}
        >
          FoodSearch
        </div>
        <div
          className={selectedTab === 'UserFormAsPage' ? 'active' : ''}
          onClick={() => handleTabClick('UserFormAsPage')}
        >
          UserFormAsPage
        </div>
        <div
          className={selectedTab === 'UserForm' ? 'active' : ''}
          onClick={() => handleTabClick('UserForm')}
        >
          UserForm
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
