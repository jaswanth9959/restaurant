import { useGetMenuQuery } from "../slices/menuApiSlice";
import { useGetCategoryQuery } from "../slices/categorySlice";
import { Row, Col, Form } from "react-bootstrap";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
const HomeScreen = () => {
  const { data: menu, isLoading, error } = useGetMenuQuery();
  const { data: category, loading, err } = useGetCategoryQuery();

  const [filterBy, setFilterBy] = useState("pizza");
  let filteredItems;
  if (filterBy === "all") filteredItems = menu;
  else {
    filteredItems = menu?.filter((x) => x.category.name === filterBy);
  }
  return (
    <>
      <h1 className="textColor text-center">OUR MENU</h1>
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error?.message?.data || error?.error}</p>
      ) : (
        <>
          {loading ? (
            <p>loading...</p>
          ) : err ? (
            <p>{error?.message?.data || error?.error}</p>
          ) : (
            <Row className="mt-4 mb-4 justify-content-md-center">
              <Col md={3}>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      <strong>View:</strong>
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="select"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                      >
                        {category?.map((x) => (
                          <option key={x._id} value={x.name}>
                            {x.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}
          <Row className="text-primary">
            {filteredItems.map((item) => (
              <Col key={item._id} xs={12} md={6} lg={4} className="mb-4">
                <MenuItem item={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
