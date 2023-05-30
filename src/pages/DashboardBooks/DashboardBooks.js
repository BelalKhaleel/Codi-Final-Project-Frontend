import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextField from "../../components/text-field/text-field";
import MainButton from "../../components/button/button";
import Swal from "sweetalert2";
import DashboardHeroSection from "../../components/DashboardHeroSection/DashboardHeroSection";
import DashboardPopUp from "../../components/DashboardPopUp/DashboardPopUp";
import "./DashboardBooks.css";
import Spinner from "../../components/spinner/spinner";
// import { Form } from "antd";

function DashboardBooks() {
  const [cookies] = useCookies();
  const token = cookies["user-token"];
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [bookAddData, setBookAddData] = useState({
    title: "",
    author: "",
    course: "",
    description: "",
    university: "",
    donor: "",
    recipient: "",
    image: null,
    isDeleted: false,
    condition: "",
    status: "",
  });

  const [bookEditData, setBookEditData] = useState({
    title: "",
    author: "",
    course: "",
    description: "",
    university: "",
    donor: "",
    recipient: "",
    image: null,
    isDeleted: false,
    condition: "",
    status: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerEdit = () => {
    setIsEdit(true);
  };

  const getRowId = (row) => {
    return row._id;
  };

  const columns = [
    // { field: "_id", headerName: "ID", width: 220 },
    {
      field: "image",
      headerName: "Image",
      width: 260,
      renderCell: (params) => (
        <div
          style={{
            width: "120px",
            height: "100%",
            padding: "5px",
          }}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/${params.value}`}
            alt="Book"
            width="100%"
            height="100%"
            style={{ borderRadius: "5px", objectFit: "contain" }}
          />
        </div>
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "course", headerName: "Course", width: 100 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "university",
      headerName: "University",
      width: 200,
      valueGetter: (params) => {
        return params.row.university.name;
      },
    },
    { field: "donor.fullName", headerName: "Donor full name", width: 200, valueGetter: (params) => {
      return params.row.donor.fullName;
    },},
    { field: "donor.address", headerName: "Donor Address", width: 200, valueGetter: (params) => {
      return params.row.donor.address.city;
    },},
    { field: "recipient", headerName: "Recipient", width: 200,  valueGetter: (params) => {
      return params.row.recipient && params.row.recipient.name ? params.row.recipient.name : "None";
    },},
    { field: "condition", headerName: "Condition", width: 200 },
    { field: "status", headerName: "Status", width: 200 },

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
            onClick={() => deleteBook(params.id)}
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

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/book?limit=${25}`
      );
      console.log(response);
      setData(response.data.items);
      setTotalItems(response.data.totalItems);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleFormChange = (event) => {
    const value = event.target.value;
    setBookAddData({ ...bookAddData, [event.target.name]: value });
    console.log(bookAddData);
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    setBookEditData({ ...bookEditData, [event.target.name]: value });
  };

  const handleAddImageChange = (e) => {
    setBookAddData({ ...bookAddData, image: e.target.files[0] });
  };

  const handleEditImageChange = (e) => {
    setBookEditData({ ...bookEditData, image: e.target.files[0] });
  };

  const [university, setUniversity] = useState("");
  const [universityList, setUniversityList] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/university`
        );
        const universities = response.data;
        setUniversityList(universities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUniversities();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const bookAddForm = new FormData();
    bookAddForm.append("title", bookAddData.title);
    bookAddForm.append("author", bookAddData.author);
    bookAddForm.append("course", bookAddData.course);
    bookAddForm.append("description", bookAddData.description);
    bookAddForm.append("university", bookAddData.university);
    bookAddForm.append("image", bookAddData.image);
    bookAddForm.append("condition", bookAddData.condition);
    bookAddForm.append("status", bookAddData.status);
    bookAddForm.append("donor", bookAddData.user);
    bookAddForm.append("recipient", bookAddData.recipient._id);

    const token = cookies["user-token"];
    const secretKey = process.env.REACT_APP_JWT_SECRET;
    const decodedToken = jwt_decode(token, secretKey);
    const donorId = decodedToken.id;

    bookAddData.append("donor", donorId);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/book`,
        bookAddForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "user-token": token,
          },
        }
      );

      setIsSubmitting(false);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setBookAddData({
        fullName: "",
        email: "",
        password: "",
      });
      setError(response.data.message);
      getBooks();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const editBook = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const bookEditForm = new FormData();
    bookEditForm.append("title", bookEditData.title);
    bookEditForm.append("author", bookEditData.author);
    bookEditForm.append("course", bookEditData.course);
    bookEditForm.append("description", bookEditData.description);
    bookEditForm.append("university", bookAddData.university);
    bookEditForm.append("image", bookEditData.image);
    bookEditForm.append("condition", bookEditData.condition);
    bookEditForm.append("status", bookEditData.status);
    bookEditForm.append("donor", bookEditData.donor._id);
    bookEditForm.append("recipient", bookEditData.recipient._id);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/book/${editId}`,
        bookEditForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitting(true);
      setOpenPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setBookEditData({
        title: "",
        author: "",
        course: "",
        description: "",
        university: "",
        image: "",
        condition: "",
        status: "",
        donor: "",
        recipient: "",
      });
      setError(response.data.message);
      getBooks();
      // getUsers();
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setIsSubmitting(false);
    }
  };

  const deleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color2)",
      cancelButtonColor: "var(--accent-color)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      const token = cookies["user-token"];

      if (result.isConfirmed) {
        try {
          await axios
            .delete(`${process.env.REACT_APP_API_URL}/api/book/${id}`, {
              headers: {
                "user-token": token,
              },
            })
            .then((response) => {
              console.log(response.data);
              getBooks();
              Swal.fire("Deleted!", "Your book has been deleted.", "success");
              // getUsers();
            });
        } catch (error) {
          console.log(error);
          Swal.fire("Failed!", "Your book has not been deleted.", "error");
        }
      }
    });
  };

  const handlePageChange = (params) => {
    setPage(params.page);
    console.log(page);
  };

  const handlePageSizeChange = (params) => {
    setPerPage(params.perPage);
  };

  // const getUsers = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/category`
  //     );
  //     console.log(response.data);
  //     setCategories(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className="dashboard-admins onLoad">
      {console.log(data)}
      <DashboardHeroSection title="Books" />
      {openPopup && (
        <DashboardPopUp
          title={isEdit ? "Edit Book" : "Add Book"}
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
          onSubmit={isEdit ? editBook : addBook}
        >
          <div style={{ color: "var(--accent-color)", display: "flex" }}>
            {error}
          </div>
          <div>
            <TextField
              label="Title"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="title"
              autoFocus={isEdit ? true : false}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? bookEditData.title : bookAddData.title}
            />
          </div>
          <div>
            <TextField
              label="Author"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="author"
              autoFocus={isEdit ? true : false}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? bookEditData.author : bookAddData.author}
            />
          </div>
          <div>
            <TextField
              label="Course"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="course"
              autoFocus={isEdit ? true : false}
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={isEdit ? bookEditData.course : bookAddData.course}
            />
          </div>
          <div>
            <TextField
              label="Description"
              type="text"
              style={{ width: "100%", fontSize: "1rem" }}
              name="description"
              onChange={isEdit ? handleEditChange : handleFormChange}
              value={
                isEdit ? bookEditData.description : bookAddData.description
              }
            />
          </div>
          <label className="book-donation-page-label" htmlFor="university">
            University:
          </label>
          <select
            id="university"
            name="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          >
            <option value="" valuedisabled="true">
              Select the university
            </option>

            {universityList.map((university) => (
              <option key={university._id} value={university._id}>
                {university.name}
              </option>
            ))}
          </select>
          <label htmlFor="condition">Condition:</label>
          <select id="condition" name="condition">
            <option value="" disabled selected>
              Select the condition
            </option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Acceptable">Acceptable</option>
          </select>

          <label htmlFor="status">Status:</label>
          <select id="status" name="status">
            <option value="" disabled selected>
              Select the status
            </option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
          <div>
            <input
              type="file"
              name="image"
              id="file-input"
              onChange={isEdit ? handleEditImageChange : handleAddImageChange}
              value={isEdit ? bookEditData.image : bookAddData.image}
              className="file-input__input"
            />
            <label className="file-input__label" htmlFor="file-input">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                class="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
              <span>Upload image</span>
            </label>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <MainButton
              name={isEdit ? "Edit" : "Add"}
              style={{ width: "100%", padding: "1rem 0" }}
              type="submit"
            />
            {isSubmitting && (
              <Spinner
                style={{ width: "20px", height: "20px", marginTop: "10px" }}
              />
            )}
          </div>
        </DashboardPopUp>
      )}
      <div
        className="dashboard-admin-data-grid"
        style={{ width: "100%", overflow: "hidden" }}
      >
        <div className="dashboard-admin-add-button">
          <MainButton
            name="Add Book"
            style={{ padding: "1rem 2rem" }}
            onClick={async () => {
              // await getUsers();
              setOpenPopup(true);
            }}
          />
        </div>
        <DataGrid
          sx={{ width: "100%" }}
          rows={data}
          columns={columns}
          getRowId={getRowId}
          pagination
          pageSize={25}
          rowCount={totalItems}
          // onPageChange={handlePageChange}
          // onPageSizeChange={handlePageSizeChange}
          rowSelection={false}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default DashboardBooks;
