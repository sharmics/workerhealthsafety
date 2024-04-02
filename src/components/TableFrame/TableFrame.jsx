import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./TableFrame.css";
import { Table } from "antd";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BreadcrumbsContainer from "../BreadcrumbsContainer/BreadcrumbsContainer.js";

export default function TableFrame(props) {
  const { column, data, tableType } = props;
  const navigate = useNavigate();
  var breadcrumbsData;

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const handleOpen = (user) => {
    setUser(user);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (value) => {
    setSearchText(value);
    const filteredDataSource = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filteredDataSource);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [limit, setLimit] = useState(pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    console.log("Previous Page");
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    console.log("Next Page");
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / pageSize))
    );
  };

  useEffect(() => {
    endIndex > data.length ? setLimit(data.length) : setLimit(endIndex);
  });

  const onChange = (sorter, filters) => {
    console.log("params", sorter, filters);
  };

  data.map((user) => {
    tableType === "Zone" &&
      (user.action = (
        <button
          className="trackingbutton"
          onClick={() => navigate(`/dashboard/zone/${user.zone_id}`)}
        >
          View Monitor
        </button>
      )
      ) && (breadcrumbsData = [
        { breadcrumbOption: "Dashboard", route: "/dashboard" },
        { breadcrumbOption: "Zones", route: "/dashboard/zones" },
      ]);
    tableType === "Workforce" &&
      (user.action = (
        <button
          className="trackingbutton"
          onClick={() => navigate(`/dashboard/workforce/${user.worker_id}`)}
        >
          View Tracking
        </button>
      )) &&
      (user.name = (
        <div style={{ cursor: "pointer" }} onClick={() => handleOpen(user)}>
          {user.name}
        </div>
      )) && (breadcrumbsData = [
        { breadcrumbOption: "Dashboard", route: "/dashboard" },
        { breadcrumbOption: "Workforce", route: "/dashboard/workforce" },
      ]);
    tableType === "Incident" &&
      (user.action = (
        <button
          className="trackingbutton"
          onClick={() => navigate(`/dashboard/incidents/${user.incident_id}`)}
        >
          View Details
        </button>
      )) && (breadcrumbsData = [
        { breadcrumbOption: "Dashboard", route: "/dashboard" },
        { breadcrumbOption: "Incidents", route: "/dashboard/incidents" },
      ]);
  });

  return (
    <div className="container">

      <div style={{ height: '1.3em' }}>
        <BreadcrumbsContainer BreadcrumbsData={breadcrumbsData} />
      </div>

      {/* Search & Pagination  */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
          width:'98%'
        }}
      >
        {/* search-icon  */}
        <div className="search">
          <SearchIcon className="search-icon"></SearchIcon>
          <input
            className="search-input"
            placeholder="Search"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </div>

        {/* pagination  */}
        <span
            // style={{
            //   display: "flex",
            //   alignItems: "center",
            // }}
          className="pagination"
        >
          <div style={{ marginRight: ".5em" }}>
            {startIndex + 1}-{limit} of {data.length}
          </div>
          <div style={{ display:'flex'}}> 
          <ArrowBackIosNewIcon
            className="pagination-icon"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{  width:'60%'}}
          />
          <ArrowForwardIosIcon
            className="pagination-icon"
            onClick={handleNextPage}
            style={{  width:'60%'}}
            disabled={currentPage === Math.ceil(data.length / pageSize)}
          />
          </div>
        </span>
      </div>

      {/* Table-Container  */}
      <div style={{'width': '98%'}}>
        <Table
          columns={column}
          dataSource={currentData}
          onChange={onChange}
          pagination={false}
        />
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="profile-pop-up">
            <div className="modal-header">
              <div className="profile-name">{user.name}</div>
              <div
                className="close-container"
                onClick={handleClose}
                style={{ cursor: "pointer" }}
              >
                <CloseRoundedIcon />
              </div>
            </div>
            <div className="modal-body">
              <div className="profile-details">
                <div className="table-fields">
                  <label htmlFor="" className="email">
                    Email
                  </label>
                  <div className="field-value">{user.email}</div>
                </div>
                <div className="table-fields">
                  <label htmlFor="" className="gender">
                    Gender
                  </label>
                  <div className="field-value">{user.gender}</div>
                </div>
                <div className="table-fields">
                  <label htmlFor="" className="phoneNumber">
                    Phone No.
                  </label>
                  <div className="field-value">{user.phoneNo}</div>
                </div>
                <div className="table-fields">
                  <label htmlFor="" className="location">
                    Location
                  </label>
                  <div className="field-value">{user.location}</div>
                </div>
              </div>
              <div className="profile-description">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas vitae congue nulla. Donec at metus eros. Vestibulum
                  in ipsum a mi tempor accumsan. Praesent ultricies mauris eu ex
                  consectetur maximus. Integer id lacus eu sem auctor
                  condimentum eget ac lectus. Suspendisse hendrerit fermentum
                  risus semper luctus. Phasellus at mauris velit. Curabitur
                  fermentum lobortis tellus, sed venenatis neque aliquet ac.
                  Vivamus maximus odio lorem, vel vehicula nulla eleifend quis.
                  Fusce tristique turpis non turpis elementum feugiat. Aliquam
                  eget consequat ipsum. Phasellus rutrum, enim ut egestas
                  molestie, orci diam efficitur est, sed bibendum ipsum dui a
                  lorem. Vestibulum in nunc ac mi scelerisque iaculis.
                </p>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
