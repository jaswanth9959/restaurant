import React, { useState } from "react";
import { savePickup } from "../slices/cartSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function PickUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const schedule = [
    "10:00AM",
    "11:00AM",
    "12:00AM",
    "01:00PM",
    "02:00PM",
    "03:00PM",
    "04:00PM",
  ];
  const clickHandler = () => {
    dispatch(savePickup({ val }));
    navigate("/paymentmethod");
  };
  return (
    <div className="justify-content-md-center">
      <h1>Choose Pick up time</h1>

      <div className="rSelectRooms">
        {schedule.map((slot) => (
          <>
            <div className="room" key={slot.slot}>
              <>
                <input
                  style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                  value={slot}
                  onChange={(e) => setVal(e.target.value)}
                />
                <label> {slot} </label>
              </>
            </div>
          </>
        ))}

        {/* {test.schedule.map((slot) => (
                        <div className="room" key={slot.slot}>
                          {isAvailable(slot) && (
                            <>
                              <input
                                style={{ width: "20px", height: "20px" }}
                                type="checkbox"
                                value={slot._id}
                                onChange={handleSelect}
                                disabled={!isAvailable(slot)}
                              />
                              <label>{slot.slot} </label>
                            </>
                          )}
                        </div>
                      ))} */}
      </div>
      {/* <Form.Control
        as="select"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      >
        <option>Select</option>
        <option key={1} value="10:00AM">
          {"10:00AM"}
        </option>
        <option key={1} value="10:30AM">
          {"10:30AM"}
        </option>
        <option key={1} value="11:00AM">
          {"11:00AM"}
        </option>
        <option key={1} value="11:30AM">
          {"11:30AM"}
        </option>
      </Form.Control> */}
      <Button onClick={clickHandler} className="m-3">
        Continue
      </Button>
    </div>
  );
}

export default PickUp;
