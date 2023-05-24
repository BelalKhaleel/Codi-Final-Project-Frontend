import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import "./DashboardDonations.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextField from "../../components/text-field/text-field";
import MainButton from "../../components/button/button";
import Swal from "sweetalert2";
import DashboardHeroSection from "../../components/DashboardHeroSection/DashboardHeroSection";
import DashboardPopUp from "../../components/DashboardPopUp/DashboardPopUp";

function DashboardDonations() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [donationAddData, setDonationAddData] = useState({
    book: "",
    donor: "",
    recipient: "",
    date: "",
    status: "",
  });

  const [donationEditData, setDonationEditData] = useState({
    book: "",
    donor: "",
    recipient: "",
    date: "",
    status: "",
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
    { field: "book", headerName: "Book", width: 260 },
    { field: "donor", headerName: "Donor", width: 400 },
    { field: "recipient", headerName: "Recipient", width: 400 },
    { field: "date", headerName: "Date", width: 300 },
    { field: "status", headerName: "Status", width: 300 },
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
            onClick={() => deleteDonation(params.id)}
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

  const getDonations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/donation?page=${page}&limit=${perPage}`
      );
      console.log(response);
      setData(response.data.donations);
      setTotalItems(response.data.totalItems);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDonations();
  }, [page, perPage]);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setDonationAddData({ ...donationAddData, [event.target.name]: value });
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setDonationEditData({ ...donationEditData, [event.target.name]: value });
    console.log(donationEditData);
  };

  const addDonation = async (e) => {
    e.preventDefault();
    const donationAddForm = {
      book: donationAddData.fullName,
      donor: donationAddData.donor,
      recipient: donationAddData.recipient,
      date: donationAddData.date,
      status: donationAddData.status,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/donation`,
        donationAddForm
      );

      console.log(response);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Donation Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setDonationAddData({
        book: "",
        donor: "",
        recipient: "",
        date: "",
        status: "",
      });
      setError(response.data.message);
      getDonations();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  };

  const editDonation = async (e) => {
    e.preventDefault();

    const donationEditForm = {
      book: donationEditData.book,
      donor: donationEditData.donor,
      recipient: donationEditData.recipient,
      date: donationEditData.date,
      status: donationEditData.status,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/donation/${editId}`,
        donationEditForm
      );

      console.log(response);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Donation Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setDonationEditData({
        book: "",
        donor: "",
        recipient: "",
        date: "",
        status: "",
      });
      setError(response.data.message);
      getDonations();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  };

  const deleteDonation = async (id) => {
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
            .delete(`${process.env.REACT_APP_API_URL}/api/donation/${id}`)
            .then((response) => {
              console.log(response.data);
              getDonations();
            });
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Deleted!", "Your donation has been deleted.", "success");
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
    <div className="dashboard-donations onLoad">
      <DashboardHeroSection title="Donations" />
      {openPopup && (
        <DashboardPopUp
          title={isEdit ? "Edit Donation" : "Add Donation"}
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
          onSubmit={isEdit ? editDonation : addDonation}
        >
          <div style={{ color: "var(--accent-color)" }}>{error}</div>
          <div>
            <TextField
              label="Book"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="book"
              autoFocus={isEdit ? true : false}
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? donationEditData.book : donationAddData.book}
            />
          </div>
          <div>
            <TextField
              label="Donor"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="donor"
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? donationEditData.donor : donationAddData.donor}
            />
          </div>
          <div>
            <TextField
              label="Recipient"
              type="recipient"
              style={{ width: "100%", fontSize: "1rem" }}
              name="recipient"
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? donationEditData.recipient : donationAddData.recipient}
            />
          </div>
          <div>
            <TextField
              label="Date"
              type="date"
              style={{ width: "100%", fontSize: "1rem" }}
              name="date"
              required={true}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={
                isEdit ? donationEditData.date : donationAddData.date
              }
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px", fontSize: "1rem" }}>
              Status
            </span>
            <input
              type="checkbox"
              name="status"
              onChange={isEdit ? handleEditChange : handleFormChange}
              checked={isEdit ? donationEditData.status : donationAddData.status}
            />
            <span style={{ marginLeft: "4px", fontSize: "1rem" }}>Delivered</span>
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
        className="dashboard-donation-data-grid"
        style={{ width: "100%", overflow: "hidden" }}
      >
        <div className="dashboard-donation-add-button">
          <MainButton
            name="Add Donation"
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

export default DashboardDonations;