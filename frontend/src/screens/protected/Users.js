import React from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../slices/userSlice";
function Users() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  return (
    <Row>
      <Link to="/board">
        <Button className="btn-color">Back</Button>
      </Link>
      <h1 className="text-center py-3">Customers</h1>
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
                  <strong>ID</strong>
                </Col>
                <Col md={2}>
                  <strong>First Name</strong>
                </Col>
                <Col md={2}>
                  <strong>Last Name</strong>
                </Col>
                <Col md={2}>
                  <strong>Email</strong>
                </Col>

                <Col md={3}></Col>
              </Row>
            </ListGroup.Item>
            {users.map((user) => (
              <ListGroup.Item
                key={user._id}
                style={{ borderBottom: "1px solid orange" }}
              >
                <Row>
                  <Col md={3}>{user._id}</Col>
                  <Col md={2}>{user.firstName}</Col>
                  <Col md={2}>{user.lastName}</Col>
                  <Col md={2}>{user.email}</Col>
                  <Col md={3}>
                    <Link to={`/board/user/${user._id}`}>
                      <Button className="btn-sm btn-color" variant="light">
                        View Details
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

export default Users;
