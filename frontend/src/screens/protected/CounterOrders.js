import React from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetCounterOrdersQuery } from "../../slices/ordersApiSlice";
function CounterOrders() {
  const { data: orders, isLoading, error } = useGetCounterOrdersQuery();

  return (
    <Row>
      <Link to="/board">
        <Button className="btn-color">Back</Button>
      </Link>
      <h1 className="text-center py-3">Counter Orders</h1>
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
                  <strong>Order Status</strong>
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
                  <Col md={2}>{order.orderStatus}</Col>
                  <Col md={1}>
                    <Link to={`/board/order/${order._id}`}>
                      <Button className="btn-sm btn-color" variant="light">
                        View Order
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

export default CounterOrders;
