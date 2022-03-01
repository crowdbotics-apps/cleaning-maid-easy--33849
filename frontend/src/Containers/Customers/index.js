/*!

=========================================================
* Paper Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const Customers = () => {

  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div className="content">
             <img
                 style={{ paddingBottom: 56, width:'100%', height:'100%' }}
                 alt="..."
                 src={require("assets/images/customers_img.png")}
             />
       </div>
    // <div className="content "
    //   style={{
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //     backgroundImage: `url(${require("assets/images/bg_content.png")})`,
    //     flex: 1
    //   }}
    // >
    //   <Modal
    //     isOpen={modal}
    //     toggle={toggle}
    //   >
    //     <div style={{height:600}}>
    //     <div className="modal-header border-bottom-0">
    //       <button
    //         aria-hidden={true}
    //         className="close"
    //         data-dismiss="modal"
    //         type="button"
    //         onClick={toggle}
    //       >
    //          <i style={{color:'linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF'}} className="nc-icon nc-simple-remove" />
    //       </button>
    //       <div>
    //       <label className="mt-5" style={{ fontSize: 24, fontWeight: "600" ,display: 'grid'}} >Add Service</label>
    //       </div>
    //     </div>
    //     <div className="modal-body ">

    //     <label style={{ fontSize: 14, fontWeight: '500' }}>Service Name</label>
    //       <Input className="border-top-0 border-right-0 border-left-0 pl-0" />

    //       <div className="mt-4">
    //       <label style={{ fontSize: 14, fontWeight: '500' }}>Service Description</label>
    //       <Input className="border-top-0 border-right-0 border-left-0 pl-0" />
    //       </div>

    //       <div className="mt-4">
    //       <label style={{ fontSize: 14, fontWeight: '500' }}>Service Price</label>
    //       <Input className="border-top-0 border-right-0 border-left-0 pl-0" ></Input>
    //       </div>
    //     </div>
    //     </div>
    //     <div className="modal-footer border-top-0  justify-content-center">
    //        <Button 
    //         className="mb-3"
    //         style={{ background: "linear-gradient(155.56deg, #E6DE18 -55%, #438B44 127.5%), linear-gradient(0deg, #4A8E44, #4A8E44), #DFDFDF", fontWeight: 'bold', fontSize: 14, paddingLeft: 50, paddingRight: 50 }}
    //         onClick={toggle}
    //       >
    //         Add Customer
    //       </Button>
    //     </div>
    //   </Modal>
    //   <Row>
    //     <Col md="12">
    //       <Card style={{ marginTop: 54, marginLeft: 54, marginRight: 54, opacity: 0.94 }}>
    //         <CardBody>
    //         <div className="d-flex justify-content-end">
    //             <Button
    //               className="mb-3 "
    //               style={{ background: "linear-gradient(97.75deg, #00B9F1 -11.55%, #034EA2 111.02%)", fontWeight: 'bold', fontSize: 17, }}
    //               onClick={toggle}
    //             >
    //               Add Service
    //             </Button>
    //           </div>
    //           <Table responsive >
    //             <thead style={{ opacity: 0.5 }}>
    //               <tr>
    //                 <th style={{paddingTo:20, paddingBottom:30}}>Client Information</th>
    //                 <th style={{paddingTo:20, paddingBottom:30}}>Service History</th>
    //                 <th style={{paddingTo:20, paddingBottom:30}}>Preferred Services</th>
    //                 <th style={{paddingTo:20, paddingBottom:30}}>Other</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td style={{ fontSize: 12 }}>
    //                   1.Full Name
    //                   <br></br>
    //                   Email
    //                   <br></br>
    //                   jennuwilson@email.com
    //                 </td>
    //                 <td style={{ fontSize: 12 }}>
    //                 09/09/2021 - Basic Cleaning
    //                 ($40)
    //                 <br></br>
    //                 09/09/2021 - Windows Inside
    //                 ($85)
    //                 <br></br>
    //                 27/08/2021 - Windows Outside
    //                 ($159)
    //                 <br></br>
    //                 20/08/2021 - Basic Cleaning
    //                 ($229)
    //                 </td>
    //                 <td style={{ fontSize: 12, fontWeight: '500' }}>
                     
    //                 -Basic Cleaning<br></br>
    //                 -Windows Inside<br></br>
    //                 -Windows Outside
    //                   </td>
    //                 <td style={{ fontSize: 12, fontWeight: '500' }}>$220.00</td>
    //                 <td className="text-right">
    //                   <Button
    //                     className="btn-icon btn-neutral"
    //                     size="sm"
    //                     type="button"
    //                   >
    //                     <img
    //                       alt="..."
    //                       src={require("assets/images/delete_btn.png")}
    //                     />
    //                   </Button>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <td style={{ fontSize: 14, fontWeight: '500' }}>6.</td>
    //                 <td style={{ fontSize: 14, fontWeight: '600' }}>Basic Cleaning</td>
    //                 <td style={{ fontSize: 12, fontWeight: '500' }}>Top to bottom dusting/cleaning of surfaces and all floors throughout the home</td>
    //                 <td style={{ fontSize: 12, fontWeight: '500' }}>$220.00</td>
    //                 <td className="text-right">
    //                   <Button
    //                     className="btn-icon btn-neutral"
    //                     size="sm"
    //                     type="button"
    //                   >
    //                     <img
    //                       alt="..."
    //                       src={require("assets/images/delete_btn.png")}
    //                     />
    //                   </Button>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           </Table>
    //         </CardBody>
    //       </Card>
    //     </Col>
    //   </Row>
    // </div>
  );

}

export default Customers;
