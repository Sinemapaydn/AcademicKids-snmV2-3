// App.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import FoodSearch from './FoodSearch';
import Sidebar from './Sidebar';
import './Sidebar.css';
import UserFormAsPage from './UserFormAsPage';
import UserForm from './UserForm';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('FoodSearch');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'FoodSearch':
        return <FoodSearch />;
      case 'UserFormAsPage':
        return <UserFormAsPage />;
      case 'UserForm':
        return <UserForm />;
      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {!sidebarOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, padding: '10px', zIndex: 1 }}>
          <FontAwesomeIcon icon={faBars} size="lg" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
        </div>
      )}
      <Sidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        toggleSidebar={toggleSidebar}
        isOpen={sidebarOpen}
      />
      <div style={{ marginLeft: sidebarOpen ? '200px' : '0', padding: '20px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
