import { CircularProgress } from "@mui/material";
import { relative } from "path";
import React from "react";

const Loader = ({ open, relative }: { open: boolean, relative?: boolean }) => {
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
            position: relative? "relative": "fixed",
            zIndex: 1000,
          }}
          id="loader"
        >
          <CircularProgress color="secondary" size={70} />
        </div>
      )}
    </>
  );
};

export default Loader;
