import { useState, useEffect } from "react";

const Loading = () => {
  const [loadingLayout, setLoadingLayout] = useState("");
  let currentURL = window.location.pathname;

  useEffect(() => {
    const vocabularyLayout = (
      <div className="vocab-component">
        <div className="vocab-container">
          <div className="card-container">
            <div className="card-front">Wait...</div>
          </div>
          <div className="card-buttons">
            <button className="button-vocabulary">{"<"}</button>
            <button className="button-vocabulary">Learnt</button>
            <button className="button-vocabulary">Retry</button>
            <button className="button-vocabulary">{">"}</button>
          </div>
          <div>
            <p>...</p>
          </div>
        </div>
      </div>
    );

    const parseVerseLayout = (
      <div className="verse-sentence">
        <div
          style={{
            width: "800px",
            height: "200px",
            backgroundColor: "#14171b",
            margin: "auto",
            marginTop: "200px",
          }}
        >
          <h2 style={{ padding: "15px", color: "gray" }}>loading...</h2>
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
