import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ open }: { open: boolean }) => {
  return (
    <>
      {open && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" size={70} />
        </div>
      )}
    </>
  );
};

export default Loader;
