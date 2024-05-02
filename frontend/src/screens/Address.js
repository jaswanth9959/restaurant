import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveDeliveryAddress } from "../slices/cartSlice";
import { clearcart } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
const Address = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { deliveryAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(deliveryAddress?.address || "");
  const [city, setCity] = useState(deliveryAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    deliveryAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(deliveryAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postalCode, country }));
    toast.success("Delivery address Saved");
  };

  const placeorder = async () => {
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
    <Row className="justify-content-md-center">
      <Col md={10}>
        <h1 className="text-center py-4">Order Delivery Address</h1>
        <Form
          style={{
            border: "1px solid orange",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <Form.Group className="my-2" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {deliveryAddress ? (
            <Button
              type="button"
              className="btn btn-light my-1 color text-light "
              onClick={placeorder}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              className="btn btn-light my-1 color text-light "
              onClick={submitHandler}
            >
              Save Address
            </Button>
          )}
        </Form>
        {isLoading && <p>Loading...</p>}
      </Col>
    </Row>
  );
};

export default Address;
