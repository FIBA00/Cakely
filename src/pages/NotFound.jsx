// Patisserie Postcard: a missing route is a gentle detour, never a blank or browser-default dead end.
import { ArrowRight, CakeSlice } from "lucide-react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="not-found page-width">
      <div className="not-found-icon">
        <CakeSlice />
      </div>
      <p className="section-kicker justify-center">404</p>
      <h1>
        Looks like this cake
        <br />
        went <em>missing.</em>
      </h1>
      <p>Let us get you back to the counter before the good ones are gone.</p>
      <Link className="btn-berry" to="/shop">
        Back to shop <ArrowRight size={17} />
      </Link>
    </section>
  );
}
