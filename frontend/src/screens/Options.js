import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
function Options() {
  const navigate = useNavigate();

  const deliveryHandler = () => {
    navigate("/delivery");
  };
  const pickupHandler = () => {
    navigate("/pickup");
  };
  return (
    <div className="justify-content-md-center my-4">
      <h1>Choose Method</h1>
      <Row>
        <Col md={{ offset: 2, span: 2 }}>
          {" "}
          <Button
            onClick={deliveryHandler}
            className="m-3  btn btn-block color text-light"
          >
            Delivery
          </Button>
        </Col>
        <Col md={{ offset: 2, span: 2 }}>
          <Button
            onClick={pickupHandler}
            className="m-3  btn btn-block color text-light"
          >
            Pick Up
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Options;
