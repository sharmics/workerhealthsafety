import React, { useState } from "react";
import { useParams } from "react-router";
import "../IncidentDetails/IncidentDetailsEdit.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import data_set from "../../Services/DataService";
// import { useParams } from "react-router-dom";
import BreadcrumbsContainer from "../BreadcrumbsContainer/BreadcrumbsContainer";

export default function IncidentDetailsEdit() {
  // const [formData, setFormData] = useState({
  //   case: "",
  //   priority: "",
  //   status: "",
  //   subject: "",
  //   description: "",
  //   productFamily: "",
  //   product: "",
  //   caseOwner: "",
  //   contactEmail: "",
  // });

  // const { incident_id } = useParams();

  const [emailError, setEmailError] = useState("");
  const [caseError, setCaseError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [prodFamilyError, setProdFamilyError] = useState("");
  const [productError, setProductError] = useState("");
  const [caseOwnerError, setCaseOwnerError] = useState("");
  const { incidentId } = useParams();
  const breadcrumbsData = [
    { breadcrumbOption: "Dashboard", route: "/dashboard" },
    { breadcrumbOption: "Incidents", route: "/dashboard/incidents" },
    {
      breadcrumbOption: "Incidents Details",
      route: `/dashboard/incidents/${incidentId}`,
    },
    {
      breadcrumbOption: "Edit",
      route: `/dashboard/incidents/${incidentId}/edit`,
    },
  ];

  const navigate = useNavigate();

  const dataToEdit = data_set().incidents.filter(
    (incident) => incident.incident_id === incidentId
  );
  // const dataToEdit = data_set().incidents.filter(incident => {
  //   return incident.incident_id === incidentId
  // })[0];

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validateInputData = (value) => {
    let error;
    if (!value) {
      error = "required *";
    } else if (value.length < 2) {
      error = "At least 2 characters long";
    }
    return error;
  };

  const handleCaseChange = (e) => {
    const { name, value } = e.target;
    setCaseError(validateInputData(value));
  };

  const handlePriorityChange = (e) => {
    const { name, value } = e.target;
    setPriorityError(validateInputData(value));
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusError(validateInputData(value));
  };

  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setSubjectError(validateInputData(value));
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setDescriptionError(validateInputData(value));
  };

  const handleProdFamilyChange = (e) => {
    const { name, value } = e.target;
    setProdFamilyError(validateInputData(value));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductError(validateInputData(value));
  };

  const handleCaseOwnerChange = (e) => {
    const { name, value } = e.target;
    setCaseOwnerError(validateInputData(value));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailError(validateEmail(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or further validation
  };

  // const pathSegments = ["Dashboard", "Incidents", "Incident Details", "Edit"];

  // const handleBreadcrumbClick = (index) => {
  //   const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
  //   if(pathSegments[index]=='Incident Details')
  //   {
  //     const path="/dashboard/incident-details/wfwg53t-fggdgeg-34ebdbdbdb-dfbefbdccs";
  //     navigate(path.toLowerCase());
  //   }
  //   else{
  //   navigate(path.toLowerCase());
  //   }
  // };

  return (
    <div className="edit-board">
      <div className="edit-container">
        <div className="incident-routing-text">
          <BreadcrumbsContainer BreadcrumbsData={breadcrumbsData} />
        </div>
        <div className="edit-box">
          <div className="edit-box-head">
            <div
              style={{
                color: "white",
                width: "28%",
                textAlign: "center",
                fontSize: "1em",
              }}
            >
              Incident
            </div>
            <div
              style={{
                color: "white",
                width: "70%",
                fontSize: ".85em",
                marginLeft: "3em",
              }}
            >
              {dataToEdit[0].incident}
            </div>
          </div>
          <div className="edit-box-body">
            <div className="field-box" style={{ marginTop: "4em" }}>
              <label htmlFor="case" className="field-label">
                Case
              </label>
              <div
                style={{
                  width: "73%",
                  height: "2.5em",
                }}
              >
                <TextField
                  type="text"
                  name="case"
                  value={dataToEdit[0].case_no}
                  className="field-input"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "5px",
                    paddingLeft: "2em",
                    border: "1px solid #7f7f7f",
                  }}
                  required
                  helperText={caseError}
                  error={!!caseError}
                  onChange={handleCaseChange}
                />
              </div>
            </div>
            <div className="field-box" id="priorityAndStatusBox">
              <div className="priority-box">
                <label
                  htmlFor="case"
                  className="field-label"
                  id="priority-label"
                >
                  Priority
                </label>
                <div className="priority-textfield" id="priority-input">
                  <TextField
                    type="text"
                    name="priority"
                    value={dataToEdit[0].priority}
                    className="field-input"
                    required
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                    }}
                    helperText={priorityError}
                    error={!!priorityError}
                    onChange={handlePriorityChange}
                  />
                </div>
              </div>
              <div className="priority-box" id="status-box">
                <label htmlFor="case" className="field-label" id="status-label">
                  Status
                </label>
                <div className="priority-textfield" id="status-input">
                  <TextField
                    type="text"
                    name="status"
                    value={dataToEdit[0].status}
                    className="field-input"
                    required
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                    }}
                    helperText={statusError}
                    error={!!statusError}
                    onChange={handleStatusChange}
                  />
                </div>
              </div>
            </div>
            <div className="field-box">
              <label htmlFor="case" className="field-label">
                Subject
              </label>
              <div
                style={{
                  width: "73%",
                  height: "2.5em",
                }}
              >
                <TextField
                  type="text"
                  name="subject"
                  value={dataToEdit[0].subject}
                  className="field-input"
                  required
                  helperText={subjectError}
                  error={!!subjectError}
                  onChange={handleSubjectChange}
                />
              </div>
            </div>
            <div className="field-box" style={{ height: "12em" }}>
              <label htmlFor="case" className="field-label">
                Description
              </label>
              <div
                style={{
                  width: "73%",
                  height: "85%",
                }}
              >
                <textarea
                  type="text"
                  value={dataToEdit[0].description}
                  className="field-input"
                  style={{
                    resize: "none",
                    height: "100%",
                    paddingTop: "1em",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    outline: "none",
                  }}
                  required
                  helperText={descriptionError}
                  error={!!descriptionError}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div className="field-box">
              <label htmlFor="case" className="field-label">
                Product Family
              </label>
              <div
                style={{
                  width: "73%",
                  height: "2.5em",
                }}
              >
                <TextField
                  type="text"
                  name="productFamily"
                  value={dataToEdit[0].product_family}
                  className="field-input"
                  required
                  helperText={prodFamilyError}
                  error={!!prodFamilyError}
                  onChange={handleProdFamilyChange}
                />
              </div>
            </div>
            <div className="field-box">
              <label htmlFor="case" className="field-label">
                Product
              </label>
              <div
                style={{
                  width: "73%",
                  height: "2.5em",
                }}
              >
                <TextField
                  type="text"
                  name="product"
                  value={dataToEdit[0].product}
                  className="field-input"
                  required
                  helperText={productError}
                  error={!!productError}
                  onChange={handleProductChange}
                />
              </div>
            </div>
            <div className="field-box">
              <label htmlFor="case" className="field-label">
                Case Owner
              </label>
              <div
                style={{
                  width: "73%",
                  height: "2.5em",
                }}
              >
                <TextField
                  type="text"
                  name="case Owner"
                  value={dataToEdit[0].case_owner}
                  className="field-input"
                  required
                  helperText={caseOwnerError}
                  error={!!caseOwnerError}
                  onChange={handleCaseOwnerChange}
                />
              </div>
            </div>
            <div className="field-box">
              <label htmlFor="case" className="field-label">
                Contact Email
              </label>
              <div style={{ width: "73%", height: "2.5em" }}>
                <TextField
                  type="email"
                  name="email"
                  value={dataToEdit[0].contact_email}
                  className="field-input"
                  required
                  helperText={emailError}
                  error={!!emailError}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="submit-button-div">
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
