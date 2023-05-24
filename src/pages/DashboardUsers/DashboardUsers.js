import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import "./DashboardUsers.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextField from "../../components/text-field/text-field";
import MainButton from "../../components/button/button";
import Swal from "sweetalert2";
import DashboardHeroSection from "../../components/DashboardHeroSection/DashboardHeroSection";
import DashboardPopUp from "../../components/DashboardPopUp/DashboardPopUp";

function DashboardUsers() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [userAddData, setUserAddData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    isAdmin: false,
  });

  const [userEditData, setUserEditData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const triggerEdit = () => {
    setIsEdit(true);
  };

  const getRowId = (row) => {
    return row._id;
  };

  const columns = [
    // { field: "_id", headerName: "ID", width: 420 },
    { field: "fullName", headerName: "Full name", width: 260 },
    { field: "email", headerName: "Email", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() => deleteUser(params.id)}
          >
            <DeleteIcon style={{ color: "var(--accent-color)" }} />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => {
              triggerEdit();
              setOpenPopup(true);
              setEditId(params.id);
            }}
          >
            <EditIcon style={{ color: "var(--accent-color)" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user?page=${page}&limit=${perPage}`
      );
      console.log(response);
      setData(response.data.users);
      setTotalItems(response.data.totalItems);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page, perPage]);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setUserAddData({ ...userAddData, [event.target.name]: value });
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setUserEditData({ ...userEditData, [event.target.name]: value });
    console.log(userEditData);
  };

  const addUser = async (e) => {
    e.preventDefault();
    const userAddForm = {
      full_name: userAddData.fullName,
      email: userAddData.email,
      password: userAddData.password,
      phoneNumber: userAddData.phoneNumber,
      address: userAddData.address,
      isAdmin: userAddData.isAdmin,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        userAddForm
      );

      console.log(response);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setUserAddData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        isAdmin: false,
      });
      setError(response.data.message);
      getUsers();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();

    const userEditForm = {
      fullName: userEditData.fullName,
      email: userEditData.email,
      password: userEditData.password,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/${editId}`,
        userEditForm
      );

      console.log(response);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setUserEditData({
        fullName: "",
        email: "",
        password: "",
      });
      setError(response.data.message);
      getUsers();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--secondary-color)",
      cancelButtonColor: "var(--accent-color)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios
            .delete(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
            .then((response) => {
              console.log(response.data);
              getUsers();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your user has been deleted.", "success");
      }
    });
  };

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPerPage(params.perPage);
  };

  return (
    <div className="dashboard-users onLoad">
      <DashboardHeroSection title="Users" />
      {openPopup && (
        <DashboardPopUp
          title={isEdit ? "Edit User" : "Add User"}
          onClick={
            isEdit
              ? () => {
                  setOpenPopup(false);
                  setIsEdit(false);
                }
              : () => {
                  setOpenPopup(false);
                }
          }
          onSubmit={isEdit ? editUser : addUser}
        >
          <div style={{ color: "var(--accent-color)" }}>{error}</div>
          <div>
            <TextField
              label="Full Name"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="fullName"
              autoFocus={isEdit ? true : false}
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? userEditData.fullName : userAddData.fullName}
            />
          </div>
          <div>
            <TextField
              label="Email"
              type="email"
              style={{ width: "100%", fontSize: "1rem" }}
              name="email"
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? userEditData.email : userAddData.email}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              style={{ width: "100%", fontSize: "1rem" }}
              name="password"
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? userEditData.password : userAddData.password}
            />
          </div>
          <div>
            <TextField
              label="Phone Number"
              type="phone"
              style={{ width: "100%", fontSize: "1rem" }}
              name="phoneNumber"
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={
                isEdit ? userEditData.phoneNumber : userAddData.phoneNumber
              }
            />
          </div>
          <div>
            <TextField
              label="Address"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="address"
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? userEditData.address : userAddData.address}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px", fontSize: "1rem" }}>
              Is Admin?
            </span>
            <input
              type="checkbox"
              name="isAdmin"
              onChange={isEdit ? handleEditChange : handleFormChange}
              checked={isEdit ? userEditData.isAdmin : userAddData.isAdmin}
            />
            <span style={{ marginLeft: "4px", fontSize: "1rem" }}>true</span>
          </div>
          <div>
            <MainButton
              name={isEdit ? "Edit" : "Add"}
              style={{ width: "100%", padding: "1rem 0" }}
              type="submit"
            />
          </div>
        </DashboardPopUp>
      )}
      <div
        className="dashboard-user-data-grid"
        style={{ width: "100%", overflow: "hidden" }}
      >
        <div className="dashboard-user-add-button">
          <MainButton
            name="Add User"
            style={{ padding: "1rem 2rem" }}
            onClick={() => setOpenPopup(true)}
          />
        </div>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={getRowId}
          pagination
          pageSize={perPage}
          rowCount={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          rowSelection={false}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default DashboardUsers;
