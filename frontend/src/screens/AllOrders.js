import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

function AllOrders() {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery(userInfo._id);

  return (
    <Row>
      <h1 className="text-center py-3">My Orders</h1>
      <Col md={{ span: 10, offset: 1 }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <ListGroup
            className="text-center"
            style={{ border: "1px solid orange" }}
          >
            <ListGroup.Item
              style={{
                borderBottom: "1px solid orange",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Row>
                <Col md={3}>
                  <strong>Order ID</strong>
                </Col>
                <Col md={2}>
                  <strong>Order Total</strong>
                </Col>
                <Col md={2}>
                  <strong>Order Date</strong>
                </Col>
                <Col md={2}>
                  <strong>Payment Status</strong>
                </Col>
                <Col md={2}>
                  <strong>Delivery Status</strong>
                </Col>
                <Col md={1}></Col>
              </Row>
            </ListGroup.Item>
            {orders.map((order) => (
              <ListGroup.Item
                key={order._id}
                style={{ borderBottom: "1px solid orange" }}
              >
                <Row>
                  <Col md={3}>{order._id}</Col>
                  <Col md={2}>${order.totalPrice}</Col>
                  <Col md={2}>{order.createdAt?.substring(0, 10)}</Col>
                  <Col md={2}>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <p>Pending</p>
                    )}
                  </Col>
                  <Col md={2}>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <p>Pending</p>
                    )}
                  </Col>
                  <Col md={1}>
                    <Link to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}

export default AllOrders;

// <Table>
//   <thead>
//     <tr
//       style={{
//         border: "1px solid orange",
//         marginBottom: "10px",
//       }}
//     >
//       <th>Order ID</th>
//       <th>Order Date</th>
//       <th>Order Total</th>
//       <th>Payment Status</th>
//       <th>Delivery Status</th>
//       <th></th>
//     </tr>
//   </thead>
//   <tbody>
//     {orders.map((order) => (
//       <tr
//         key={order._id}
//         style={{
//           border: "1px solid orange",
//           marginBottom: "10px",
//         }}
//       >
//         <td>{order._id}</td>
//         <td>{order.createdAt.substring(0, 10)}</td>
//         <td>${order.totalPrice}</td>
//         <td>
//           {order.isPaid ? (
//             order.paidAt.substring(0, 10)
//           ) : (
//             <p>Pending</p>
//           )}
//         </td>
//         <td>
//           {order.isDelivered ? (
//             order.deliveredAt.substring(0, 10)
//           ) : (
//             <p>pending</p>
//           )}
//         </td>
//         <td>
//           <Link to={`/order/${order._id}`}>
//             <Button className="btn-sm" variant="light">
//               Details
//             </Button>
//           </Link>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </Table>
