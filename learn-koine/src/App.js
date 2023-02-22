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
        <h1>Practice Koine Greek</h1>
        <h3>Choose a Subject:</h3>
        <div className="links">
        <Link to={'vocabulary'}>Vocabulary</Link>
        <Link to={'articles'}>Articles</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
