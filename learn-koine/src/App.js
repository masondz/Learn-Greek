import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(randomVerse());
  // }, [dispatch]);

  // const verse = useSelector(selectVerseSlice);
  return (
    <div className="App">
      <div className="App-header">
        <div className="logo-container">
          <h3 id="delta">δ</h3>
          <div className="key-bar"></div>
          <h3 id="kappa">κ</h3>
          <h2 id="didakey">DidaKey</h2>
        </div>
        <h2>
          <i>Practicing Koine Greek</i>
        </h2>
        <h3>Choose a Subject:</h3>
        <div className="links">
          <Link className="home-links" to={"about"}>
            About
          </Link>
          <Link className="home-links" to={"vocabulary"}>
            Vocabulary
          </Link>
          <Link className="home-links" to={"parsing-verse"}>
            Parsing Practice
          </Link>
          <Link className="home-links" to={"verb"}>
            Verbs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
