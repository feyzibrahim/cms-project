import React, { useState, useEffect } from "react";
import img from "../../img/noCollegeData.png";
import Loader from "../../globalClasses/Loader";
import MeetingRows from "../componants/MeetingRows";
import MeetingForm from "../componants/MeetingForm";
import { useAuthContext } from "../../Hook/contextHooks/useAuthContext";
import { useMeetingContext } from "../../Hook/contextHooks/useMeetingContext";

const Meatings = () => {
  var today = new Date(),
    date = today.toTimeString();

  const { user } = useAuthContext();
  const { meetings, dispatch } = useMeetingContext();
  const [isPending, setIsPending] = useState(true);
  const [isNotForm, setIsNotForm] = useState(true);

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/api/meetings", {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MEETING", payload: json });
        console.log(json);
        setIsPending(false);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };

    fetchData();
    return () => abortConst.abort();
  }, []);

  return (
    <div className="Meatingshome addSomeMargin">
      <div className="dHome">
        <div className="dHomeNav">
          <div className="dHomeNavLeft">
            <h1>Meatings</h1>
            <p>{date}</p>
          </div>
          <div className="depHomeNavRight">
            <button
              className="fullColeredButton"
              onClick={() => {
                const isForm = !isNotForm;
                setIsNotForm(isForm);
              }}
            >
              {isNotForm ? "Add New Department" : "Go back"}
            </button>
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
        <div className="meetingsContainer">
          {isPending && <Loader />}

          {isNotForm ? (
            meetings != null && meetings.length > 0 ? (
              <div>
                <div className="meetingRows">
                  <div>
                    <p>Meeting Name</p>
                  </div>
                  <div>
                    <p>Organized By</p>
                  </div>
                  <div>
                    <p>Location</p>
                  </div>
                  <div>
                    <p>Time and Date</p>
                  </div>
                  <div>
                    <p>Status</p>
                  </div>
                  <div>
                    <p>Update</p>
                  </div>
                </div>
                {meetings.map((meeting) => (
                  <MeetingRows meeting={meeting} key={meeting._id} />
                ))}
              </div>
            ) : (
              <div className="collegeDataNotFound">
                <div className="collegeDataNotFoundContainer">
                  <img src={img} alt="No data found" />
                  <h2>No Meetings are Created</h2>
                  <h5>
                    Be the first to add one to create a meeting... Click below
                    button to add one
                  </h5>
                  <button
                    className="fullColeredButton"
                    onClick={() => setIsNotForm(false)}
                  >
                    Click Here
                  </button>
                </div>
              </div>
            )
          ) : (
            <MeetingForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default Meatings;
