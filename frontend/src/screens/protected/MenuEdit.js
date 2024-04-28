import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useUpdateItemMutation } from "../../slices/menuApiSlice";
import { useGetCategoryQuery } from "../../slices/categorySlice";
import { LinkContainer } from "react-router-bootstrap";
import {
  useUploadImageMutation,
  useGetItemByIdQuery,
} from "../../slices/menuApiSlice";
import { toast } from "react-toastify";
function MenuEdit() {
  const { id: itemId } = useParams();
  const [name, setName] = useState("");
  const [prices, setPrices] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [topping, setTopping] = useState("");
  const [option, setOption] = useState("");
  const [stock, setStock] = useState(0);
  const { data: item, refetch, isLoading, error } = useGetItemByIdQuery(itemId);
  const { data: categories } = useGetCategoryQuery();
  const [updateItem, { isLoading: loadingCreate }] = useUpdateItemMutation();
  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();
  const submitHandler = async (e) => {
    e.preventDefault();

    const price = prices.split(",").map((price) => Number(price.trim()));
    const options = option.split(",").map((o) => o.trim());
    const toppings = topping.split(",").map((t) => t.trim());
    if (price.length !== options.length) {
      toast.error("Size Options and Prices length must match");
    } else {
      try {
        await updateItem({
          itemId,
          name,
          price,
          description,
          stock,
          options,
          toppings,
          image,
          category,
        }).unwrap();
        refetch();
        toast.success("Item Updated");
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      window.alert(res.message);
      setImage(res.image);
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setCategory(item.category);
      setStock(item.stock);
      setImage(item.image);
      setPrices(item.price.join(","));
      setOption(item.options.join(","));
      setTopping(item.toppings.join(","));
    }
  }, [item]);

  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/board/menu">
          <Button className="btn-color mb-3" variant="light">
            {" "}
            Back
          </Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <div>
            <div className="login-container">
              <h2 className="textColor">Edit Menu Item</h2>
              <form onSubmit={submitHandler}>
                <div className="input-group">
                  <label htmlFor="firstname"> Name</label>
                  <input
                    type="text"
                    id="firstname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastname">Description</label>
                  <input
                    type="text"
                    id="lastname"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastname1">Image</label>
                  <input
                    type="text"
                    id="lastname1"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <input
                    type="file"
                    id="lastname22"
                    onChange={uploadFileHandler}
                  />
                  {loadingUpload && <p>Loading...</p>}
                </div>
                <div className="input-group">
                  <label htmlFor="pass">Size Options</label>
                  <input
                    type="text"
                    id="pass"
                    placeholder="Enter price with comma seperated values"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Price</label>
                  <input
                    type="text"
                    id="email"
                    value={prices}
                    placeholder="Enter price with comma seperated values"
                    onChange={(e) => setPrices(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="role" style={{ marginRight: "20px" }}>
                    {" "}
                    Category
                  </label>
                  <select
                    id="role"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {category === "65fae40de15679f80f2bc848" && (
                  <div className="input-group">
                    <label htmlFor="password">Toppings</label>
                    <input
                      type="text"
                      id="passwordc"
                      placeholder="Enter comma seperated values"
                      value={topping}
                      onChange={(e) => setTopping(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="input-group">
                  <label htmlFor="password">Stock</label>
                  <input
                    type="number"
                    id="passwordc"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Update</button>
                {isLoading && <p>Loading...</p>}
                {loadingCreate && <p>Loading...</p>}
              </form>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default MenuEdit;
