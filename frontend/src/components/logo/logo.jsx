import { Link } from "react-router-dom";
import "./logo.scss";

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Go to home page">
      <span className="logo__mark">A</span>

      <span className="logo__text">
        ALPHA
      </span>
    </Link>
  );
}

export default Logo;