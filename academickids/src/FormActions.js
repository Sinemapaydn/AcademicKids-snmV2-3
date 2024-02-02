// FormActions.js
import React from "react";

function FormActions({ onSubmit }) {
  return (
    <div>
      <button
        type="submit"
        onClick={onSubmit}
        style={{
          marginBottom: "13px",
          width: "auto",
          height: "45px",
        }}
      >
        Gönder
      </button>
    </div>
  );
}

export default FormActions;
