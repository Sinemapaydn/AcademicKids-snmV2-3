// UserFormFields.js
import React, { useEffect, useState } from "react";
import "./UserFormFields.css";

const UserFormFields = ({ fields, initialValues }) => {
  const [allergyInputValue, setAllergyInputValue] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [chronicDiseaseInputValue, setChronicDiseaseInputValue] = useState("");
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [medicationInputValue, setMedicationInputValue] = useState("");
  const [medications, setMedications] = useState([]);
  const [bloodIndicatorsInputValue, setBloodIndicatorsInputValue] =
    useState("");
  const [bloodIndicators, setBloodIndicators] = useState([]);

  const [selectedBloodIndicator, setSelectedBloodIndicator] = useState("");
  const [bloodIndicatorNumericValue, setBloodIndicatorNumericValue] =
    useState("");

  useEffect(() => {
    if (initialValues) {
      fields.forEach((field) => {
        const element = document.getElementById(field.id);
        if (element) {
          switch (field.id) {
            case "alergies":
              element.value = initialValues[field.id] || "";
              setAllergies(initialValues[field.id + "Items"] || []);
              break;
            case "chronicDiseases":
              element.value = initialValues[field.id] || "";
              setChronicDiseases(initialValues[field.id + "Items"] || []);
              break;
            case "medications":
              element.value = initialValues[field.id] || "";
              setMedications(initialValues[field.id + "Items"] || []);
              break;
            case "bloodIndicators":
              element.value = initialValues[field.id] || "";
              setBloodIndicators(initialValues[field.id + "Items"] || []);
              break;
            default:
              element.value = initialValues[field.id] || "";
              break;
          }
        }
      });
    }
  }, [fields, initialValues]);

  const handleInputChange = (fieldId, e) => {
    switch (fieldId) {
      case "alergies":
        setAllergyInputValue(e.target.value);
        break;
      case "chronicDiseases":
        setChronicDiseaseInputValue(e.target.value);
        break;
      case "medications":
        setMedicationInputValue(e.target.value);
        break;
      case "bloodIndicators":
        setBloodIndicatorsInputValue(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (fieldId) => {
    switch (fieldId) {
      case "alergies":
        handleAddItem(allergies, setAllergies, allergyInputValue);
        setAllergyInputValue("");
        break;
      case "chronicDiseases":
        handleAddItem(
          chronicDiseases,
          setChronicDiseases,
          chronicDiseaseInputValue
        );
        setChronicDiseaseInputValue("");
        break;
      case "medications":
        handleAddItem(medications, setMedications, medicationInputValue);
        setMedicationInputValue("");
        break;
      case "bloodIndicators":
        handleAddItem(
          bloodIndicators,
          setBloodIndicators,
          bloodIndicatorsInputValue
        );
        setBloodIndicatorsInputValue("");
        break;
      default:
        break;
    }
  };

  const handleDeleteButtonClick = (index, fieldId) => {
    switch (fieldId) {
      case "alergies":
        handleDeleteItem(allergies, setAllergies, index);
        break;
      case "chronicDiseases":
        handleDeleteItem(chronicDiseases, setChronicDiseases, index);
        break;
      case "medications":
        handleDeleteItem(medications, setMedications, index);
        break;
      case "bloodIndicators":
        handleDeleteItem(bloodIndicators, setBloodIndicators, index);
        break;
      default:
        break;
    }
  };

  const handleAddItem = (list, setList, item) => {
    const trimmedItem = item.trim();
    if (trimmedItem !== "") {
      setList([...list, trimmedItem]);
    }
  };

  const handleDeleteItem = (list, setList, index) => {
    const updatedList = list.filter((item, i) => i !== index);
    setList(updatedList);
  };

  const handleBloodIndicatorChange = (e) => {
    setSelectedBloodIndicator(e.target.value);
  };

  const handleBloodIndicatorNumericChange = (e) => {
    setBloodIndicatorNumericValue(e.target.value);
  };

  const handleBloodIndicatorButtonClick = () => {
    if (selectedBloodIndicator && bloodIndicatorNumericValue) {
      const newBloodIndicator = `${selectedBloodIndicator}: ${bloodIndicatorNumericValue}`;
      handleAddItem(bloodIndicators, setBloodIndicators, newBloodIndicator);
      setSelectedBloodIndicator("");
      setBloodIndicatorNumericValue("");
    }
  };

  return (
    <div>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}:</label>
          {field.type === "select" ? (
            <select id={field.id} name={field.id}>
              <option value="" disabled selected>
                {field.placeholder || "Select..."}
              </option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.id === "alergies" ||
            field.id === "chronicDiseases" ||
            field.id === "bloodIndicators" ||
            field.id === "medications" ? (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  value={
                    field.id === "alergies"
                      ? allergyInputValue
                      : field.id === "chronicDiseases"
                      ? chronicDiseaseInputValue
                      : field.id === "medications"
                      ? medicationInputValue
                      : bloodIndicatorsInputValue
                  }
                  onChange={(e) => handleInputChange(field.id, e)}
                  style={{ marginRight: "5px" }}
                />
                {field.id === "bloodIndicators" && (
                  <>
                    <select
                      value={selectedBloodIndicator}
                      onChange={handleBloodIndicatorChange}
                    >
                      <option value="" disabled>
                        {field.placeholder || "Seçiniz..."}
                      </option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Değer giriniz..."
                      value={bloodIndicatorNumericValue}
                      onChange={handleBloodIndicatorNumericChange}
                      style={{ marginRight: "5px" }}
                    />
                    <button
                      type="button"
                      onClick={handleBloodIndicatorButtonClick}
                    >
                      Ekle
                    </button>
                  </>
                )}
                <button
                  type="button"
                  style={{
                    marginBottom: "13px",
                    width: "auto",
                    height: "45px",
                  }}
                  onClick={() => handleButtonClick(field.id)}
                >
                  Ekle
                </button>
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {field.id === "alergies"
                  ? allergies.map((element, index) => (
                      <li
                        key={index}
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#e1e8ec",
                            borderRadius: "30px",
                            padding: "6px",
                            margin: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <label
                            style={{
                              marginRight: "5px",
                              fontSize: "12px",
                              marginBottom: 0,
                            }}
                          >
                            {element}
                          </label>
                          <button
                            type="button"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "auto",
                              height: "20px",
                              textAlign: "center",
                              verticalAlign: "middle",
                              backgroundColor: "#e1e8ec",
                            }}
                            onClick={() =>
                              handleDeleteButtonClick(index, field.id)
                            }
                          >
                            X
                          </button>
                        </div>
                      </li>
                    ))
                  : field.id === "chronicDiseases"
                  ? chronicDiseases.map((element, index) => (
                      <li
                        key={index}
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#e1e8ec",
                            borderRadius: "30px",
                            padding: "6px",
                            margin: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <label
                            style={{
                              marginRight: "5px",
                              fontSize: "12px",
                              marginBottom: 0,
                            }}
                          >
                            {element}
                          </label>
                          <button
                            type="button"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "auto",
                              height: "20px",
                              textAlign: "center",
                              verticalAlign: "middle",
                              backgroundColor: "#e1e8ec",
                            }}
                            onClick={() =>
                              handleDeleteButtonClick(index, field.id)
                            }
                          >
                            X
                          </button>
                        </div>
                      </li>
                    ))
                  : field.id === "bloodIndicators"
                  ? bloodIndicators.map((element, index) => (
                      <li
                        key={index}
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#e1e8ec",
                            borderRadius: "30px",
                            padding: "6px",
                            margin: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <label
                            style={{
                              marginRight: "5px",
                              fontSize: "12px",
                              marginBottom: 0,
                            }}
                          >
                            {element}
                          </label>
                          <button
                            type="button"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "auto",
                              height: "20px",
                              textAlign: "center",
                              verticalAlign: "middle",
                              backgroundColor: "#e1e8ec",
                            }}
                            onClick={() =>
                              handleDeleteButtonClick(index, field.id)
                            }
                          >
                            X
                          </button>
                        </div>
                      </li>
                    ))
                  : medications.map((element, index) => (
                      <li
                        key={index}
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#e1e8ec",
                            borderRadius: "30px",
                            padding: "6px",
                            margin: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <label
                            style={{
                              marginRight: "5px",
                              fontSize: "12px",
                              marginBottom: 0,
                            }}
                          >
                            {element}
                          </label>
                          <button
                            type="button"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "auto",
                              height: "20px",
                              textAlign: "center",
                              verticalAlign: "middle",
                              backgroundColor: "#e1e8ec",
                            }}
                            onClick={() =>
                              handleDeleteButtonClick(index, field.id)
                            }
                          >
                            X
                          </button>
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          ) : (
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserFormFields;
