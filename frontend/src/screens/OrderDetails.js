import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearcart } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
function OrderDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const cart = useSelector((state) => state.cart);

  const handleClick = async () => {
    try {
      const res = await createOrder({
        token: userInfo.token,
        orderItems: cart.cartItems,
        deliveryAddress: cart.deliveryAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        deliveryPrice: cart.deliveryAddress ? cart.shippingPrice : 0,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        pickup: cart.deliveryAddress ? "" : cart.pickup.val,
      }).unwrap();
      dispatch(clearcart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data.message);
    }
  };
  return (
    <>
      <h2 className="py-4">Your Order Details</h2>

      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <ListGroup>
            {cart.cartItems.map((item) => (
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
                    <strong>${item.price[item.selectedId]}</strong>
                  </Col>
                  <Col md={1}>
                    <strong>{item.qty}</strong>
                  </Col>
                  <Col md={2}>
                    <strong>{item.size}</strong>
                  </Col>
                  <Col md={3}>
                    <strong>
                      ${item.price[item.selectedId]}X{item.qty}=$
                      {item.price[item.selectedId] * item.qty}
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
                  {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                <Row className="py-2">
                  <Col>Items Price ${cart.itemsPrice}</Col>
                  <Col>Delivery Charge ${cart.shippingPrice}</Col>
                  <Col>Tax Price ${cart.taxPrice}</Col>
                  <Col>
                    <h4>
                      <strong> Total: ${cart.totalPrice}</strong>
                    </h4>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Button
            type="button"
            className="btn btn-light my-1 color text-light"
            onClick={handleClick}
          >
            Continue to payment
          </Button>
          {isLoading && <p>Loading...</p>}
        </Col>
      </Row>
    </>
  );
}

export default OrderDetails;
