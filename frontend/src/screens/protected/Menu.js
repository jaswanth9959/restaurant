import React from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetMenuQuery,
  useDeleteItemMutation,
} from "../../slices/menuApiSlice";
import { toast } from "react-toastify";
function Menu() {
  const { data: items, refetch, isLoading, error } = useGetMenuQuery();
  const [deleteItem, { isLoading: loadingDelete }] = useDeleteItemMutation();
  const deleteHandler = async (id) => {
    try {
      await deleteItem(id);
      toast.warning("Item Deleted!");
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
      <h1 className="text-center py-3">Menu Items</h1>
      <LinkContainer to="/board/menu/add">
        <Col md={2} className="mx-auto">
          <Button className="m-2 btn-color" style={{ width: "200px" }}>
            {" "}
            Add Menu Items
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
                <Col md={3}>
                  <strong>ID</strong>
                </Col>
                <Col md={2}>
                  <strong>Name</strong>
                </Col>
                <Col md={2}>
                  <strong>Category</strong>
                </Col>

                <Col md={3}></Col>
              </Row>
            </ListGroup.Item>
            {items.map((item) => (
              <ListGroup.Item
                key={item._id}
                style={{ borderBottom: "1px solid orange" }}
              >
                <Row>
                  <Col md={3}>{item._id}</Col>
                  <Col md={2}>{item.name}</Col>
                  <Col md={2}>{item.category.name}</Col>
                  <Col md={3}>
                    <Link to={`/board/item/${item._id}`}>
                      <Button className="btn-sm btn-color mx-2" variant="light">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      className="btn-sm btn-color"
                      variant="light"
                      onClick={() => deleteHandler(item._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            {loadingDelete && <p>Loading...</p>}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}

export default Menu;
