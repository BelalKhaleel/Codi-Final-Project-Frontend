import React from "react";

const DashboardBooks = () => {
  return (
    <div>
      <h1>dashboard books</h1>
    </div>
  )
}

export default DashboardBooks;
// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import TextField from "../../components/text-field/text-field";
// import MainButton from "../../components/button/button";
// import Swal from "sweetalert2";
// import DashboardHeroSection from "../../components/DashboardHeroSection/DashboardHeroSection";
// import DashboardPopUp from "../../components/DashboardPopUp/DashboardPopUp";
// import "./DashboardBooks.css";
// import Spinner from "../../components/spinner/spinner";

// function DashboardBooks() {
//   const [data, setData] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [page, setPage] = useState(0);
//   const [perPage, setPerPage] = useState(25);
//   const [isLoading, setIsLoading] = useState(false);
//   const [bookAddData, setBookAddData] = useState({
//     title: "",
//     description: "",
//     image: null,
//     price: "",
//     category: [],
//   });

//   const [bookEditData, setBookEditData] = useState({
//     title: "",
//     description: "",
//     image: null,
//     price: "",
//     category: "",
//   });
//   const [isEdit, setIsEdit] = useState(false);

//   const [error, setError] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const triggerEdit = () => {
//     setIsEdit(true);
//   };

//   const getRowId = (row) => {
//     return row._id;
//   };

//   const columns = [
//     { field: "_id", headerName: "ID", width: 220 },
//     {
//       field: "image",
//       headerName: "Image",
//       width: 260,
//       renderCell: (params) => (
//         <div
//           style={{
//             width: "120px",
//             height: "100%",
//             padding: "5px",
//           }}
//         >
//           <img
//             src={`${process.env.REACT_APP_API_URL}/${params.value}`}
//             alt="Book"
//             width="100%"
//             height="100%"
//             style={{ borderRadius: "5px", objectFit: "contain" }}
//           />
//         </div>
//       ),
//     },
//     { field: "title", headerName: "Title", width: 200 },
//     { field: "description", headerName: "Description", width: 300 },
//     { field: "price", headerName: "Price", width: 60 },
//     {
//       field: "category",
//       headerName: "Category",
//       width: 260,
//       valueGetter: (params) => {
//         return params.row.category.map((cat) => cat.name).join(", ");
//       },
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 200,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton
//             color="secondary"
//             aria-label="delete"
//             onClick={() => deleteBook(params.id)}
//           >
//             <DeleteIcon style={{ color: "var(--accent-color)" }} />
//           </IconButton>
//           <IconButton
//             color="primary"
//             aria-label="edit"
//             onClick={() => {
//               triggerEdit();
//               setOpenPopup(true);
//               setEditId(params.id);
//             }}
//           >
//             <EditIcon style={{ color: "var(--accent-color)" }} />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   const getBooks = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/api/book?limit=${25}`
//       );
//       console.log(response);
//       setData(response.data.items);
//       setTotalItems(response.data.totalItems);
//       setIsLoading(false);
//     } catch (e) {
//       console.log(e);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBooks();
//     getCategories();
//   }, []);

//   const handleFormChange = (event) => {
//     const value = event.target.value;
//     setBookAddData({ ...bookAddData, [event.target.name]: value });
//     console.log(bookAddData);
//   };

//   const handleEditChange = (event) => {
//     const value = event.target.value;
//     setBookEditData({ ...bookEditData, [event.target.name]: value });
//   };

//   const handleAddImageChange = (e) => {
//     setBookAddData({ ...bookAddData, image: e.target.files[0] });
//   };

//   const handleEditImageChange = (e) => {
//     setBookEditData({ ...bookEditData, image: e.target.files[0] });
//   };

//   const addBook = async (e) => {
//     e.preventDefault();

//     setIsSubmitting(true);
//     const bookAddForm = new FormData();
//     bookAddForm.append("title", bookAddData.title);
//     bookAddForm.append("description", bookAddData.description);
//     bookAddForm.append("price", bookAddData.price);
//     bookAddForm.append("image", bookAddData.image);
//     bookAddForm.append("category", bookAddData.category._id);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/book`,
//         bookAddForm,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setIsSubmitting(false);
//       setOpenPopup(false);
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Book Added Successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setBookAddData({
//         fullName: "",
//         email: "",
//         password: "",
//       });
//       setError(response.data.message);
//       getBooks();
//       getCategories();
//     } catch (e) {
//       console.log(e);
//       setError(e.response.data);
//       setIsSubmitting(false);
//     }
//   };

//   const editBook = async (e) => {
//     e.preventDefault();

//     setIsSubmitting(true);
//     const bookEditForm = new FormData();
//     bookEditForm.append("title", bookEditData.title);
//     bookEditForm.append("description", bookEditData.description);
//     bookEditForm.append("price", bookEditData.price);
//     bookEditForm.append("image", bookEditData.image);
//     bookEditForm.append("category", bookEditData.category._id);

//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_API_URL}/api/book/${editId}`,
//         bookEditForm,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setIsSubmitting(true);
//       setOpenPopup(false);
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Book Updated Successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setBookEditData({
//         fullName: "",
//         email: "",
//         password: "",
//       });
//       setError(response.data.message);
//       getBooks();
//       getCategories();
//     } catch (e) {
//       console.log(e);
//       setError(e.response.data);
//       setIsSubmitting(false);
//     }
//   };

//   const deleteBook = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "var(--secondary-color)",
//       cancelButtonColor: "var(--accent-color)",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios
//             .delete(`${process.env.REACT_APP_API_URL}/api/book/${id}`)
//             .then((response) => {
//               console.log(response.data);
//               getBooks();
//               getCategories();
//             });
//         } catch (error) {
//           console.log(error);
//         }
//         Swal.fire("Deleted!", "Your book has been deleted.", "success");
//       }
//     });
//   };

//   const handlePageChange = (params) => {
//     setPage(params.page);
//     console.log(page);
//   };

//   const handlePageSizeChange = (params) => {
//     setPerPage(params.perPage);
//   };

//   const getCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/api/category`
//       );
//       console.log(response.data);
//       setCategories(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <div className="dashboard-admins onLoad">
//       <DashboardHeroSection title="Books" />
//       {openPopup && (
//         <DashboardPopUp
//           title={isEdit ? "Edit Book" : "Add Book"}
//           onClick={
//             isEdit
//               ? () => {
//                   setOpenPopup(false);
//                   setIsEdit(false);
//                 }
//               : () => {
//                   setOpenPopup(false);
//                 }
//           }
//           onSubmit={isEdit ? editBook : addBook}
//         >
//           <div style={{ color: "var(--accent-color)" }}>{error}</div>
//           <div>
//             <TextField
//               label="Title"
//               type="text"
//               style={{ width: "100%", fontSize: "1rem" }}
//               name="title"
//               autoFocus={isEdit ? true : false}
//               onChange={isEdit ? handleEditChange : handleFormChange}
//               value={isEdit ? bookEditData.title : bookAddData.title}
//             />
//           </div>
//           <div>
//             <TextField
//               label="Description"
//               type="text"
//               style={{ width: "100%", fontSize: "1rem" }}
//               name="description"
//               onChange={isEdit ? handleEditChange : handleFormChange}
//               value={
//                 isEdit
//                   ? bookEditData.description
//                   : bookAddData.description
//               }
//             />
//           </div>
//           <div>
//             <TextField
//               label="price"
//               type="number"
//               style={{ width: "100%", fontSize: "1rem" }}
//               name="price"
//               onChange={isEdit ? handleEditChange : handleFormChange}
//               value={isEdit ? bookEditData.price : bookAddData.price}
//             />
//           </div>
//           <div>
//             <label>
//               Category
//               <select
//                 className="dashboard-admin-select"
//                 name="category"
//                 value={
//                   isEdit
//                     ? bookEditData.category.name
//                     : bookAddData.category.name
//                 } // or formData.category.name
//                 onChange={
//                   isEdit
//                     ? (e) =>
//                         setBookEditData({
//                           ...bookEditData,
//                           category: { _id: e.target.value },
//                         })
//                     : (e) =>
//                         setBookAddData({
//                           ...bookAddData,
//                           category: { _id: e.target.value },
//                         })
//                 }
//               >
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div>
//             <input
//               type="file"
//               name="image"
//               id="file-input"
//               onChange={isEdit ? handleEditImageChange : handleAddImageChange}
//               // value={isEdit ? bookEditData.image : bookAddData.image}
//               className="file-input__input"
//             />
//             <label className="file-input__label" htmlFor="file-input">
//               <svg
//                 aria-hidden="true"
//                 focusable="false"
//                 data-prefix="fas"
//                 data-icon="upload"
//                 class="svg-inline--fa fa-upload fa-w-16"
//                 role="img"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 512 512"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
//                 ></path>
//               </svg>
//               <span>Upload image</span>
//             </label>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "column",
//             }}
//           >
//             <MainButton
//               name={isEdit ? "Edit" : "Add"}
//               style={{ width: "100%", padding: "1rem 0" }}
//               type="submit"
//             />
//             {isSubmitting && (
//               <Spinner
//                 style={{ width: "20px", height: "20px", marginTop: "10px" }}
//               />
//             )}
//           </div>
//         </DashboardPopUp>
//       )}
//       <div
//         className="dashboard-admin-data-grid"
//         style={{ width: "100%", overflow: "hidden" }}
//       >
//         <div className="dashboard-admin-add-button">
//           <MainButton
//             name="Add Book"
//             style={{ padding: "1rem 2rem" }}
//             onClick={async () => {
//               await getCategories();
//               setOpenPopup(true);
//             }}
//           />
//         </div>
//         <DataGrid
//           sx={{ width: "100%" }}
//           rows={data}
//           columns={columns}
//           getRowId={getRowId}
//           pagination
//           pageSize={25}
//           rowCount={totalItems}
//           // onPageChange={handlePageChange}
//           // onPageSizeChange={handlePageSizeChange}
//           rowSelection={false}
//           loading={isLoading}
//         />
//       </div>
//     </div>
//   );
// }

// export default DashboardBooks;
