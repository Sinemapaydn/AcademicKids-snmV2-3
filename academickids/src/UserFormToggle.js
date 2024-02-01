import React, { useState } from 'react';
import UserForm from './UserForm';
import UserFormAsPage from './UserFormAsPage';

function UserFormToggle() {
  const [showFormOne, setShowFormOne] = useState(true);
  const [formValues, setFormValues] = useState({});

  const handleToggleForm = () => {
    setShowFormOne((prevShowFormOne) => !prevShowFormOne);
  };

  const handleFormChange = (values) => {
    setFormValues(values);
  };

  return (
    <div>
      {showFormOne ? (
        <UserForm initialValues={formValues} onSubmit={handleFormChange} />
      ) : (
        <UserFormAsPage initialValues={formValues} onSubmit={handleFormChange} />
      )}
      <button onClick={handleToggleForm}>Toggle Form</button>
    </div>
  );
}

export default UserFormToggle;
