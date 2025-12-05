import { useState, useEffect } from "react";

const Loading = () => {
  const [loadingLayout, setLoadingLayout] = useState("");
  let currentURL = window.location.pathname;

  useEffect(() => {
    const vocabularyLayout = (
      <div className="verse-sentence">
        <div
          style={{
            width: "80%",
            height: "200px",
            backgroundColor: "#14171b",
            margin: "auto",
            marginTop: "200px",
          }}
        >
          <h2 style={{ padding: "15px", color: "gray", paddingTop: "25px" }}>
            loading...
          </h2>
        </div>
      </div>
    );

    const parseVerseLayout = (
      <div className="verse-sentence">
        <div
          style={{
            width: "80%",
            height: "200px",
            backgroundColor: "#14171b",
            margin: "auto",
            marginTop: "200px",
          }}
        >
          <h2 style={{ padding: "15px", color: "gray", paddingTop: "25px" }}>
            loading...
          </h2>
        </div>
      </div>
    );

    if (currentURL === "/vocabulary") {
      setLoadingLayout(vocabularyLayout);
    } else {
      setLoadingLayout(parseVerseLayout);
    }
  }, [currentURL]);

  return <div>{loadingLayout}</div>;
};

export default Loading;
