// import { useGetPizzaByIDQuery } from "../slices/menuApiSlice";
// import { Link, useParams } from "react-router-dom";
// import { Row, Col, Image, Card, Badge, Form, ListGroup } from "react-bootstrap";
// import { useState } from "react";
// function PizzaScreen() {
//   const { id } = useParams();

//   const { data: pizza, isLoading, error } = useGetPizzaByIDQuery(id);
//   const [qty, setQty] = useState(1);
//   const [size, setSize] = useState("Medium");

//   return (
//     <>
//       <Link to="/" className="btn btn-light my-3 color text-light">
//         MENU
//       </Link>
//       {isLoading ? (
//         <p>loading...</p>
//       ) : error ? (
//         <p>{error?.message?.data || error?.error}</p>
//       ) : (
//         <>
//           <Row className="justify-content-center mt-4 text-primary">
//             <Col md={4}>
//               <Image
//                 src={pizza.image}
//                 alt={pizza.name}
//                 fluid
//                 className="rounded imageshadow"
//                 width={350}
//                 height={350}
//               />
//             </Col>
//             <Col md={6}>
//               <Card className="border-1 imageshadow">
//                 <Card.Body>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item>
//                       <Card.Title className="font-weight-bold text-center textColor">
//                         {pizza.name}
//                       </Card.Title>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                       <Card.Text>
//                         Description: <strong>{pizza.description}</strong>
//                       </Card.Text>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                       <Card.Text>
//                         Category: <strong>{pizza.category.name}</strong>
//                       </Card.Text>
//                     </ListGroup.Item>

//                     <ListGroup.Item>
//                       <Card.Text className="font-weight-bold">
//                         {" "}
//                         Price: <strong>${pizza.price}</strong>
//                       </Card.Text>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                       <Card.Text as="div">
//                         {" "}
//                         Toppings:
//                         {pizza?.toppings?.map((t) => (
//                           <Badge className="color mx-1 my-1" key={t}>
//                             {t}
//                           </Badge>
//                         ))}
//                       </Card.Text>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                       <Row style={{ width: "215px" }}>
//                         <Col>Size:</Col>
//                         <Col>
//                           <Form.Control
//                             as="select"
//                             value={size}
//                             onChange={(e) => setSize(e.target.value)}
//                           >
//                             <option key="small" value="Small">
//                               Small
//                             </option>
//                             <option key="medium" value="Medium">
//                               Medium
//                             </option>
//                             <option key="large" value="Large">
//                               Large
//                             </option>
//                           </Form.Control>
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                       <Row
//                         className="align-items-center justify-center"
//                         style={{ width: "200px" }}
//                       >
//                         <Col>
//                           <Card.Text as="div">Qty:</Card.Text>
//                         </Col>

//                         <Col>
//                           <button
//                             style={{
//                               border: "none",
//                             }}
//                             onClick={() => setQty((q) => q - 1)}
//                           >
//                             -
//                           </button>
//                         </Col>
//                         <Col>
//                           <p
//                             style={{
//                               fontSize: "15px",
//                               paddingTop: "5px",
//                               marginTop: "5px",
//                             }}
//                           >
//                             <strong>{qty}</strong>
//                           </p>
//                         </Col>
//                         <Col>
//                           <button
//                             style={{
//                               border: "none",
//                             }}
//                             onClick={() => setQty((q) => q + 1)}
//                           >
//                             +
//                           </button>
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="mx-auto">
//                       <button className="btn btn-light my-1 color text-light ">
//                         Add To Cart
//                       </button>
//                     </ListGroup.Item>
//                   </ListGroup>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       )}
//     </>
//   );
// }

// export default PizzaScreen;
