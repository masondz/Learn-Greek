import { useRouteError } from "react-router";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page" style={{ margin: "16px" }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>You may have tried to go to a page that doesn't exist.</i>
      </p>
      <u>
        <Link to="/">Back to Home</Link>
      </u>
    </div>
  );
}
