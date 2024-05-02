import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdateOrderMutation,
} from "../slices/ordersApiSlice";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
function PayOrder() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder] = usePayOrderMutation();
  const [updateOrder, { isLoading: loadingUpdate }] = useUpdateOrderMutation();
  const stripePromise = loadStripe("");
  const makePayment = async () => {
    await payOrder(orderId);
    const stripe = await stripePromise;

    const body = { products: order };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${BASE_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error);
    }

    refetch();
    toast.success("payment successful");
  };

  const handleupdate = async () => {
    await updateOrder(orderId);
    refetch();
    toast.success(` order status is updated to ${order.orderStatus}`);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error?.data?.message}</p>
      ) : (
        <>
          {userInfo.role === "user" && order.isPaid && (
            <LinkContainer to="/myorders">
              <Button className="btn-color">Back</Button>
            </LinkContainer>
          )}
          {userInfo.role !== "user" && order.orderType === "Online" && (
            <LinkContainer to="/board/online">
              <Button className="btn-color">Back</Button>
            </LinkContainer>
          )}
          {userInfo.role !== "user" && order.orderType === "Counter" && (
            <LinkContainer to="/board/counter">
              <Button className="btn-color">Back</Button>
            </LinkContainer>
          )}
          <h2 className="py-4">Your OrderID: {order._id}</h2>
          {order.isPaid && (
            <>
              <h3 className="pb-4">
                Order Status-{" "}
                <span style={{ color: "green" }}>{order.orderStatus}</span>
              </h3>
              {order.orderStatus === "Preparing" &&
                userInfo.role === "admin" && (
                  <Button className="btn-color" onClick={handleupdate}>
                    Mark as Ready
                  </Button>
                )}
              {loadingUpdate && <p>loading..</p>}
            </>
          )}
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <ListGroup>
                {order.orderItems.map((item) => (
                  <ListGroup.Item
                    key={item._id}
                    style={{ border: "1px solid orange", marginBottom: "10px" }}
                  >
                    <Row className="py-auto d-flex align-items-center justify-content-center">
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={2} className="textColor">
                        {item.name}
                      </Col>
                      <Col md={2}>
                        <strong>${item.price}</strong>
                      </Col>
                      <Col md={1}>
                        <strong>{item.qty}</strong>
                      </Col>
                      <Col md={2}>
                        <strong>{item.size}</strong>
                      </Col>
                      <Col md={3}>
                        <strong>
                          ${item.price}X{item.qty}=${order.itemsPrice}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Card border="warning">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>
                      Subtotal (
                      {order.orderItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}
                      ) items
                    </h2>
                    <Row className="py-2">
                      <Col>Items Price ${order.itemsPrice}</Col>
                      <Col>Delivery Charge ${order.deliveryPrice}</Col>
                      <Col>Tax Price ${order.taxPrice}</Col>
                      <Col>
                        <h4>
                          <strong> Total: ${order.totalPrice}</strong>
                        </h4>
                      </Col>
                      {!order.isPaid && (
                        <Col>
                          <Button
                            type="button"
                            className=" btn btn-block color text-light"
                            style={{ border: "none" }}
                            disabled={order.orderitems?.length === 0}
                            onClick={makePayment}
                          >
                            Pay ${order.totalPrice}
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            {order.isPaid && (
              <Col md={{ span: 10, offset: 1 }}>
                <Card border="warning">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Payent Details</h2>
                      <Row className="py-2">
                        <Col md={3}>Payment Mode:</Col>
                        <Col md={3}>{order.paymentMethod}</Col>
                      </Row>
                      <Row className="py-2">
                        <Col md={3}>Payment Reference:</Col>
                        <Col md={4}>{order.paymentID}</Col>
                      </Row>
                      <Row className="py-2">
                        <Col md={3}>Payment Status: </Col>
                        <Col md={3}>
                          {order.isPaid && (
                            <Badge bg="success">
                              <h6>Payment Successful</h6>
                            </Badge>
                          )}
                        </Col>
                      </Row>
                      <Row className="py-2">
                        <Col md={3}>Paid On:</Col>
                        <Col md={3}>{order.paidAt.substring(0, 10)}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )}
            {order.orderType === "Counter" && (
              <Col md={{ span: 10, offset: 1 }}>
                <Card border="warning" className="mt-3">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Customer Name</h2>
                      <Row className="py-2">
                        <Col>
                          Name: {order.user.firstName} {order.user.lastName}
                        </Col>
                        <Col>Email: {order.user.email}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )}
            {order.pickup && (
              <Row className="py-2">
                <Col md={{ span: 10, offset: 1 }}>
                  <ListGroup>
                    <ListGroup.Item
                      style={{
                        border: "1px solid orange",
                        marginBottom: "10px",
                      }}
                    >
                      <Row className="py-2">
                        <h2>Order PickUp Details</h2>
                        <Col md={3}>PickUp Time: </Col>
                        <Col md={9}>{order.pickup}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            )}
            {order.orderType !== "Counter" && order.deliveryAddress && (
              <Col md={{ span: 10, offset: 1 }}>
                <Card border="warning" className="mt-3">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Delivery Address</h2>
                      <Row className="py-2">
                        <Col md={3}>Address:</Col>
                        <Col md={3}>{order.deliveryAddress.address}</Col>
                      </Row>
                      <Row className="py-2">
                        <Col md={3}>City:</Col>
                        <Col md={3}>{order.deliveryAddress.city}</Col>
                      </Row>
                      <Row className="py-2">
                        <Col md={3}>PostalCode:</Col>
                        <Col md={3}>{order.deliveryAddress.postalCode}</Col>
                      </Row>
                      <Row className="py-2">
                        <Col md={3}>Country:</Col>
                        <Col md={3}>{order.deliveryAddress.country}</Col>
                      </Row>
                      {userInfo.role === "delivery" ||
                        (userInfo.role === "admin" &&
                          order.orderStatus === "Ready" && (
                            <Row>
                              <Col>
                                <Button
                                  className="btn-color"
                                  onClick={handleupdate}
                                >
                                  Mark as Delivered
                                </Button>
                              </Col>
                            </Row>
                          ))}
                      {order.deliveredAt && (
                        <Row className="py-2">
                          <Col md={3}>Delivered On:</Col>
                          <Col md={3}>{order.deliveredAt.substring(0, 10)}</Col>
                        </Row>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )}
          </Row>
        </>
      )}
    </>
  );
}

export default PayOrder;
