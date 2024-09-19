import React from "react";
import Loader from "../components/Loader";
import { getAnswer } from "../services/questionServices";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ResponsePage = () => {
  const [answer, setAnswer] = React.useState<boolean>();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>();
  const { id } = useParams();

  const yesSrc =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTloc2VwNTB1cmZuNHg5Ynp5M3o4bzJhamlrZG91ZGQ5NGpjd2hjbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dWNfzXkrMjau2Vu2LN/giphy.webp";

  const getAnswerData = async (id: string) => {
    const response = await getAnswer(id);
    if (response) {
      setData(response);
      setAnswer(response?.answer);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    getAnswerData(id || "0");
  }, [id]);

  return (
    <div className="wrapper">
      <Loader open={loading} />
      {!answer ? (
        <h2>Your crush hasn't responded yet</h2>
      ) : (
        <>
          <div>
            <Typography variant="h4">Your Crush has responded</Typography>
            <Typography variant="h6">
              <strong>Your Question</strong>: {data?.question}
            </Typography>
            <Typography variant="h6">
              <strong>Their answer is</strong> : {data?.answer && "Yes"}
            </Typography>
            <Typography variant="h6">
              <strong>No. of times they tried saying "No"</strong> :{" "}
              {data?.hoverOnNo}
            </Typography>
          </div>
          <div>
            <img src={yesSrc} alt="bear" />
          </div>
        </>
      )}
    </div>
  );
};

export default ResponsePage;
