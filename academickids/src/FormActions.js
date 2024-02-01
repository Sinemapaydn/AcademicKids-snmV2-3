// FormActions.js
import React from 'react';

function FormActions({ onSubmit }) {
  return (
    <div>
      <button type="submit" onClick={onSubmit}>
        Gönder
      </button>
    </div>
  );
}

export default FormActions;
