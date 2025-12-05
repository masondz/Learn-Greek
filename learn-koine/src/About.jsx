import { Link } from "react-router-dom";
import "./App.css";

const About = () => {
  return (
    <div>
      <section className="App">
        <h1>Welcome to Dida Key</h1>
        <p className="about-paragraph">
          Dida Key is for students, pastors, and the lay person desiring to
          master the language of the New Testament: Koine Greek.
        </p>
        <p className="about-paragraph">
          This app is a powerful tool to help further one’s study of this
          ancient language. This site focuses on vocabulary and paradigms. Users
          can memorize common words using digital flash cards, focus on learning
          patterns based on parts of speech, and best of all, can dive right
          into scripture with an interactive parsing tool.{" "}
          <i>
            The reader can begin studying scripture while strengthening their
            translation skills.
          </i>
        </p>
        {/* <p className="about-paragraph">
          Each page has a (?) button with instructions on how to use the
          specific module.
        </p> */}
        <p className="about-paragraph">
          This site is created by Zach Mason with greek expertise provided by
          Bryan Cirlot, pastor of Church at the Square in Gautier, MS.
        </p>
        <h2>Attribution:</h2>
        <p className="about-paragraph">
          <b>The Base Greek Text</b> - Witness SR Produced by the Center for New
          Testament Restoration (CNTR) 11/30/22 Copyright © 2022 by Alan Bunning
          released under Creative Commons Attribution 4.0 International License
          (CC BY-SA 4.0)
        </p>
        <p className="about-paragraph">
          <b>Lexicon</b> -{" "}
          <a
            href={"https://github.com/eliranwong/OpenGNT/tree/master/Lexicons"}
          >
            <u>Click Here for Source</u>
          </a>
        </p>
        <br></br>
        <Link className="home-links" to={"/"}>
          Return Home
        </Link>
      </section>
      <br></br>
    </div>
  );
};

export default About;
