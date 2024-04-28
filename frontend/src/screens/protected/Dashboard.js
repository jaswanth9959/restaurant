import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <main className="py-3">
        <Container>
          <Row className="m-4 justify-content-md-center">
            <>
              {(userInfo.role === "delivery" || userInfo.role === "admin") && (
                <LinkContainer to="/board/ready">
                  <Col md={2}>
                    <Button
                      className="mx-2 btn-color"
                      style={{ width: "200px" }}
                    >
                      {" "}
                      Ready Orders
                    </Button>
                  </Col>
                </LinkContainer>
              )}
              {userInfo.role === "staff" ||
                (userInfo.role === "admin" && (
                  <>
                    <LinkContainer to="/">
                      <Col md={2}>
                        <Button
                          className="mx-2 btn-color"
                          style={{ width: "200px" }}
                        >
                          {" "}
                          Take Orders
                        </Button>
                      </Col>
                    </LinkContainer>
                    <LinkContainer to="/board/online">
                      <Col md={2}>
                        <Button
                          className="mx-2 btn-color"
                          style={{ width: "200px" }}
                        >
                          {" "}
                          Online Orders
                        </Button>
                      </Col>
                    </LinkContainer>
                    <LinkContainer to="/board/counter">
                      <Col md={2}>
                        <Button
                          className="mx-2 btn-color"
                          style={{ width: "200px" }}
                        >
                          {" "}
                          Counter Orders
                        </Button>
                      </Col>
                    </LinkContainer>
                  </>
                ))}
            </>
          </Row>
          {userInfo.role === "admin" && (
            <Row className="m-4 justify-content-md-center">
              <LinkContainer to="/board/menu">
                <Col md={2}>
                  <Button className="mx-2 btn-color" style={{ width: "200px" }}>
                    {" "}
                    Menu
                  </Button>
                </Col>
              </LinkContainer>
              <LinkContainer to="/board/staff">
                <Col md={2}>
                  <Button className="mx-2 btn-color" style={{ width: "200px" }}>
                    Staff
                  </Button>
                </Col>
              </LinkContainer>
              <LinkContainer to="/board/staff/add">
                <Col md={2}>
                  <Button className="mx-2 btn-color" style={{ width: "200px" }}>
                    {" "}
                    Create Staff Account
                  </Button>
                </Col>
              </LinkContainer>
              <LinkContainer to="/board/users">
                <Col md={2}>
                  <Button className="mx-2 btn-color" style={{ width: "200px" }}>
                    {" "}
                    Customers
                  </Button>
                </Col>
              </LinkContainer>
              <LinkContainer to="/board/menu/add">
                <Col md={2}>
                  <Button className="mx-2 btn-color" style={{ width: "200px" }}>
                    {" "}
                    Add Menu Items
                  </Button>
                </Col>
              </LinkContainer>
            </Row>
          )}
          <hr />
          <Row>
            <Col md={12}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
