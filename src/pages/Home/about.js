// import React, { Component } from "react";
// // import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import "./Home.css";
// import image4 from "../../images/image4.png";
// import image6 from "../../images/image6.png";
// import image5 from "../../images/image5.png";
// import { Link } from "react-router-dom";
// import logo from "../../images/logo-for-web.png";
// // import { AiFillCloseCircle } from 'react-icons';

// // import image7 from "../../images/image7.png";
// // import image41 from "../../images/image41.png";

// const products = [
//   {
//     image: image4,
//   },
//   {
//     image: image6,
//   },
//   {
//     image: image5,
//   },
// ];

// export class Products extends Component {
//   state = {
//     isAdmin: false,
//     showEdit: "hide-edit",
//     isOpen: false,
//   };

//   toggleEdit = () => {
//     if (this.state.isAdmin) {
//       this.setState({
//         showEdit: "show-edit",
//       });
//     } else {
//       this.setState({
//         showEdit: "hide-edit",
//       });
//     }
//   };

//   toggleModal = () => {
//     this.setState((prevState) => ({
//       isOpen: !prevState.isOpen,
//     }));
//   };

//   toggleOff = () => {
//     if (this.setState.isAdmin) {
//       this.setState({
//         showEdit: "show-edit",
//       });
//     } else {
//       this.setState({
//         showEdit: "hide-edit",
//       });
//     }
//   };
//   render() {
//     return (
//       <div className="home-page-about">
//         <section className="home-page-about-section" id="products">
//           <div className="home-page-about-content">
//             <h2>About Us</h2>
//             <div className="home-page-about-image-paragraph">
//               <div className="home-page-about-image">
//                 <img
//                   src={logo}
//                   width="100%"
//                   height="100%"
//                   style={{ objectFit: "cover" }}
//                 />
//               </div>
//               <p className="home-page-about-paragraph">
//                 RMZNA is a distinguished Palestinian Hand Embroidery Brand that
//                 proudly showcases the rich cultural heritage of Palestine
//                 through its personalized and modern designs. While keeping true
//                 to traditional embroidery techniques, RMZNA intertwines the
//                 struggles and identity of Palestine within each piece, creating
//                 a powerful narrative that pays homage to the past while
//                 propelling towards the future. Through cross-stitched motifs and
//                 intricate designs, RMZNA shares the compelling story of
//                 Palestinian culture and its deep-rooted connection to the land
//                 and people. With a focus on attention to detail and quality,
//                 each piece is lovingly crafted to tell a unique story. As a
//                 brand, RMZNA is committed to keeping Palestinian heritage alive
//                 by introducing it to the modern fashion world. Through the use
//                 of contemporary fashion styles and innovative design concepts,
//                 RMZNA invites people from all over the world to embrace and wear
//                 the Palestinian identity with pride. Overall, RMZNA's dedication
//                 to the preservation of Palestinian culture and identity through
//                 its hand-embroidered designs is a true testament to its
//                 commitment to excellence and creativity.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

// export default Products;
