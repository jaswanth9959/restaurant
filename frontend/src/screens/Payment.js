import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useSelector } from "react-redux";
const Payment = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [paymentMethod, setPaymentMethod] = useState("Card");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    if (userInfo.role === "user") {
      navigate("/delivery");
    } else {
      navigate("/userdetails");
    }
  };

  return (
    <Row className="justify-content-md-center py-4">
      <Col md={10}>
        <h1 className="text-center">Payment Method</h1>
        <Form
          onSubmit={submitHandler}
          style={{
            border: "1px solid orange",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button
            type="submit"
            className="btn btn-light my-1 color text-light "
          >
            Continue
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Payment;
