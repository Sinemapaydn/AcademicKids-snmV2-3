import React, { useState } from 'react';
import UserFormFields from './UserFormFields';
import FormActions from './FormActions';
import parameters from './Parameters';
import { app,getDatabase, ref, push } from "./Server/Firebase";

function UserFormAsPage() {
  const { formFields } = parameters;
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [showForm, setShowForm] = useState(false);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Initialize Firebase database
    const database = getDatabase(app);
    const formRef = ref(database, "formData"); // Replace "formData" with your desired database path
  
    // Push formValues to the database
    push(formRef, formValues)
      .then(() => {
        console.log("Form data submitted successfully!");
        // You can add additional logic after successful submission
      })
      .catch((error) => {
        console.error("Error submitting form data:", error.message);
      });
  };

  const handleToggleForm = () => {
    // If showing form, update form values
    if (!showForm) {
      const enteredValues = {};
      formFields.forEach((field) => {
        enteredValues[field.id] = document.getElementById(field.id)?.value || '';
      });
      setFormValues(enteredValues);
    }

    // Toggle the form visibility
    setShowForm(!showForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, index) => (
        <div key={field.id} style={{ display: currentPage === index + 1 ? 'block' : 'none' }}>
          <UserFormFields fields={[field]} />
          {currentPage === formFields.length && (
            <div>
              <button type="button" onClick={handleToggleForm}>
                {showForm ? 'Hide Form' : 'See Form'}
              </button>
            </div>
          )}
        </div>
      ))}

      {showForm && Object.keys(formValues).length > 0 && (
        <div>
          <h2>Entered Values:</h2>
          <ul>
            {Object.entries(formValues).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        {currentPage < formFields.length && (
          <button type="button" onClick={nextPage}>
            Next Page
          </button>
        )}

        {currentPage === formFields.length && (
          <div>
            <FormActions onSubmit={handleSubmit} />
            {currentPage > 1 && (
              <button type="button" onClick={previousPage}>
                Previous Page
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default UserFormAsPage;
