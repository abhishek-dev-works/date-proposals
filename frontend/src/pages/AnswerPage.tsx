/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { addNewAnswer, getAnswer } from "../services/questionServices";
import Loader from "../components/Loader";

const useStyles = makeStyles()({
  wrapper: {
    display: "grid",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    gap: "20px",
  },
  button: {
    margin: "10px",
    backgroundColor: "#ff4587",
  },
  image: {
    width: "100%",
    margin: "20px",
  },
});

const AnswerPage = () => {
  const SAFE_DISTANCE = 400;
  const { id } = useParams(); // Get the question ID from the URL
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<boolean>();
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hoverCount, setHoverCount] = useState<number>(0);
  const { classes } = useStyles();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const noBtnRef = React.useRef<HTMLButtonElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const yesSrc =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTloc2VwNTB1cmZuNHg5Ynp5M3o4bzJhamlrZG91ZGQ5NGpjd2hjbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dWNfzXkrMjau2Vu2LN/giphy.webp";

  const pendingSrc =
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2RxMTFiNmM4dXYzMnd6bTR5Y2VldWljdzlmZjB0bHFhNXY3Y3VraSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VcBBHbL7thOY9ecL80/giphy.webp";

  const getQuestionData = async () => {
    setLoading(true);
    const response = await getAnswer(id || "0");
    if (response) {
      setQuestion(response.question);
      setAnswerSubmitted(!!response?.answer);
      setUserName(response.name);
    } else {
      alert("There was an error fetching the question!");
      navigate("/");
    }
    setLoading(false);
  };
  useEffect(() => {
    // Fetch the question from the backend
    getQuestionData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (noBtnRef.current) {
      noBtnRef.current.style.position = "absolute";
      noBtnRef.current.style.left = "";
      noBtnRef.current.style.top = "";
    }
    const response = addNewAnswer(id || "0", true, hoverCount);
    if (!response) {
      alert("There was an error submitting the answer!");
      return;
    } else {
      setDisableButton(true);
      setAnswer(true);
      setLoading(false);
      setTimeout(() => {
        alert("Your answer has been submitted!");
      }, 500);
    }
  };

  const isPositionCloseToCursor = (x: number, y: number) => {
    const deltaX = Math.abs(cursorPosition.x - x);
    const deltaY = Math.abs(cursorPosition.y - y);
    return deltaX < SAFE_DISTANCE && deltaY < SAFE_DISTANCE;
  };

  const onHover = () => {
    setHoverCount((prev) => prev + 1);

    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    const noBtnRect = noBtnRef.current?.getBoundingClientRect();

    const maxX = (wrapperRect?.width ?? 0) - (noBtnRect?.width ?? 0);
    const maxY = (wrapperRect?.height ?? 0) - (noBtnRect?.height ?? 0);

    let randomX, randomY;

    do {
      // Generate random positions
      randomX = Math.floor(Math.random() * maxX) / 1.3;
      randomY = Math.floor(Math.random() * maxY);
    } while (isPositionCloseToCursor(randomX, randomY)); // Ensure position is far from cursor

    // Move the button to the new random position
    if (noBtnRef.current) {
      noBtnRef.current.style.position = "absolute";
      noBtnRef.current.style.left = `${randomX}px`;
      noBtnRef.current.style.top = `${randomY}px`;
    }
  };

  const onTouchMove = (event) => {
    setHoverCount((prev) => prev + 1);

    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    const noBtnRect = noBtnRef.current?.getBoundingClientRect();

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    // Calculate the safe distance from the current touch position
    const safeDistance = 50; // Adjust this value as needed

    let randomX, randomY;
    do {
      // Random position within the wrapper
      randomX = Math.floor(
        (Math.random() *
          ((wrapperRect?.width ?? 0) - (noBtnRect?.width ?? 0))) /
          1.3
      );
      randomY = Math.floor(
        Math.random() * ((wrapperRect?.height ?? 0) - (noBtnRect?.height ?? 0))
      );
    } while (
      Math.abs(randomX - touchX) < safeDistance ||
      Math.abs(randomY - touchY) < safeDistance
    );

    // Move the button
    if (noBtnRef.current) {
      noBtnRef.current.style.position = "absolute";
      noBtnRef.current.style.left = `${randomX}px`;
      noBtnRef.current.style.top = `${randomY}px`;
    }
  };

  return (
    <div className={classes.wrapper} id="container" ref={wrapperRef}>
      {<Loader open={loading} relative/>}
      {!answerSubmitted ? (
        <>
          <div
            style={{
              padding: "2em 0",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "10px",
              boxShadow: "3px 3px rgba(0, 0, 0, 0.2)",
              color: "slategray",
            }}
          >
            <Typography variant="h3" fontSize={"2.6vmax"}>
              {userName} would like to ask you something
            </Typography>
            <strong>
              <Typography fontSize={"2vmax"} color="#ec10a0">{question}</Typography>
            </strong>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div
                style={{
                  width: "100%",
                  margin: "20px",
                  height: 0,
                }}
              >
                <img src={!answer ? pendingSrc : yesSrc} alt="bear" />
              </div>

              <div className="actionButton">
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.button}
                  disabled={disableButton}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  onMouseOver={onHover}
                  disabled={disableButton}
                  onTouchMove={onTouchMove}
                  onClick={(e) => {
                    e.preventDefault();
                    onHover();
                  }}
                  ref={noBtnRef}
                >
                  No
                </Button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h2>You have already submitted the answer</h2>
        </div>
      )}
    </div>
  );
};

export default AnswerPage;
