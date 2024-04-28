import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  useGetCounterOrdersQuery,
  useGetOnlineOrdersQuery,
} from "../../slices/ordersApiSlice";
function Analytics() {
  const { data: orders, isLoading, error } = useGetCounterOrdersQuery();
  const { data: online, isLoading: loadingOnline } = useGetOnlineOrdersQuery();
  // const counterOrders = counter.length;
  // const OnlineOrders = online.length;
  // console.log(online);
  // const counterTotal = counter.reduce((acc, o) => acc + o.totalPrice, 0);
  // const onlineTotal = online.reduce((acc, o) => acc + o.totalPrice, 0);

  return (
    <Row className="justify-content-md-center">
      <h1 className="text-center py-3">Counter Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <Col md={{ span: 3 }} className="m-2">
            <Card border="warning">
              <Card.Body className="text-center">
                <Card.Title
                  as="h1"
                  className="textColor"
                  style={{ fontSize: "80px" }}
                >
                  {isLoading ? <span>Loading..</span> : online?.length}
                </Card.Title>
                <Card.Text>Online Orders</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 3 }} className="m-2">
            <Card border="warning">
              <Card.Body className="text-center">
                <Card.Title
                  as="h1"
                  className="textColor"
                  style={{ fontSize: "80px" }}
                >
                  {loadingOnline ? <span>Loading..</span> : orders?.length}
                </Card.Title>
                <Card.Text>Counter Orders</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 3 }} className="m-2">
            <Card border="warning">
              <Card.Body className="text-center">
                <Card.Title
                  as="h1"
                  className="textColor"
                  style={{ fontSize: "80px" }}
                >
                  {loadingOnline ? (
                    <span>Loading..</span>
                  ) : isLoading ? (
                    <span>Loading..</span>
                  ) : (
                    <span>
                      $
                      {Math.round(
                        orders?.reduce((acc, o) => acc + o.totalPrice, 0) +
                          online?.reduce((acc, o) => acc + o.totalPrice, 0)
                      ).toFixed(0)}
                    </span>
                  )}
                </Card.Title>
                <Card.Text> Total Sales</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
}

export default Analytics;
