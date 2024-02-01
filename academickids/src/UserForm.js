// UserForm.js
import React, { useState, useEffect } from "react";
import UserFormFields from "./UserFormFields";
import FormActions from "./FormActions";
import parameters from "./Parameters";
import { app, getDatabase, ref, push } from "./Server/Firebase";

function UserForm({ initialValues, onSubmit }) {
  const { formFields } = parameters;
  const [formValues, setFormValues] = useState(initialValues || {});
  
  useEffect(() => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      ...initialValues
    }));
  }, [initialValues]);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Initialize Firebase database
    const database = getDatabase(app);
    const formRef = ref(database, "formData"); // Replace "formData" with your desired database path

    // Push formValues to the database
    push(formRef, formValues)
      .then(() => {
        console.log("Form data submitted successfully!");
        console.log(formValues)
        // You can add additional logic after successful submission
        if (typeof onSubmit === "function") {
          onSubmit(formValues); // Call the parent component's onSubmit if it's a function
        }
      })
      .catch((error) => {
        console.error("Error submitting form data:", error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserFormFields fields={formFields} initialValues={formValues} />
      {/* Add other sections as needed */}
      <FormActions />
      {/* Removed onSubmit prop here */}
    </form>
  );
}

export default UserForm;
