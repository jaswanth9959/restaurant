import React from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetStaffQuery,
  useDeleteStaffMutation,
} from "../../slices/staffApiSlice";
function Staff() {
  const { data: users, refetch, isLoading, error } = useGetStaffQuery();
  const [deleteStaff, { isLoading: loadingDelete }] = useDeleteStaffMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteStaff(id);
      refetch();
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };
  return (
    <Row>
      <Link to="/board">
        <Button className="btn-color">Back</Button>
      </Link>

      <h1 className="text-center py-3">Staff</h1>
      <LinkContainer to="/board/staff/add">
        <Col md={2} className="mx-auto">
          <Button className="m-2 btn-color" style={{ width: "200px" }}>
            {" "}
            Create Staff Account
          </Button>
        </Col>
      </LinkContainer>
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
                <Col md={2}>
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
                <Col md={1}>
                  <strong>SSN</strong>
                </Col>
                <Col md={1}>
                  <strong>Role</strong>
                </Col>

                <Col md={2}></Col>
              </Row>
            </ListGroup.Item>
            {users.map((user) => (
              <ListGroup.Item
                key={user._id}
                style={{ borderBottom: "1px solid orange" }}
              >
                <Row>
                  <Col md={2}>{user._id}</Col>
                  <Col md={2}>{user.firstName}</Col>
                  <Col md={2}>{user.lastName}</Col>
                  <Col md={2}>{user.email}</Col>
                  <Col md={1}>{user.ssn}</Col>
                  <Col md={1}>{user.role}</Col>
                  <Col md={2}>
                    <Link to={`/board/staff/${user._id}`}>
                      <Button className="btn-sm btn-color m-1" variant="light">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      className="btn-sm btn-color"
                      variant="light"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            {loadingDelete && <p>loadingDelete...</p>}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}

export default Staff;
