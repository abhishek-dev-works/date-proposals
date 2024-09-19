import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { createNew } from "typescript";
import { addNewQuestion } from "../services/questionServices";
import Loader from "../components/Loader";

const Dialogue = ({
  open,
  urls,
  onClose,
}: {
  open: boolean;
  urls: string[];
  onClose: () => void;
}) => {
  const handleClose = (e) => {
    if (e.reason !== "backdropClick") {
      onClose();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(urls.join("\n"));
    onClose();
  };
  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">{"Save these links"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>
            Send this link to your crush:{" "}
            <a href={urls[0]} target="_blank" rel="noreferrer">
              {urls[0]}
            </a>
          </Typography>
          <Typography>
            Check their response here:{" "}
            <a href={urls[1]} target="_blank" rel="noreferrer">
              {urls[1]}
            </a>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleCopy} autoFocus>
          Copy to Clipboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const QuestionPage = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [userId, setUserId] = useState("");
  const [urls, setUrls] = useState<Array<string>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await addNewQuestion(name, question);
    if (response) {
      setUserId(response._id);
      setUrls([
        `${window.location.origin}/${response._id}`,
        `${window.location.origin}/response/${response._id}`,
      ]);
    } else {
      alert("There was an error creating the question!");
    }
    setLoading(false);
    setOpen(true);
  };

  return (
    <div className="wrapper">
      <Box>
        <Loader open={loading} />
        <Typography variant="h3" margin={2}>
          Ask Out is a free website for everyone to ask their crush on a date in
          a cute way.
        </Typography>
        <Typography variant="h4">Here's just a few details we need</Typography>
        <Box
          sx={{
            width: "100vw",
            padding: 3,
            display: "-webkit-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", width: "50vw" }}
          >
            <TextField
              label="Name"
              placeholder="Enter your name"
              sx={{ margin: "5px" }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              label="Question"
              placeholder="Enter your question"
              sx={{ margin: "5px" }}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
            <Button type="submit" sx={{ margin: "5px" }} variant="contained">
              Generate Link
            </Button>
          </form>
        </Box>
      </Box>
      <Dialogue open={open} onClose={() => setOpen(false)} urls={urls} />
    </div>
  );
};

export default QuestionPage;
