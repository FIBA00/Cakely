// Patisserie Postcard: the home page is an asymmetric digital counter, led by real cake imagery and editorial rhythm.
import {
  ArrowRight,
  ArrowUpRight,
  CakeSlice,
  CalendarHeart,
  Check,
  ChevronRight,
  Gift,
  HeartHandshake,
  Mail,
  Palette,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CakeCard from "../components/CakeCard";
import { assetUrls, cakes, categories } from "../data/mockData";

const process = [
  { step: "01", title: "Choose", text: "Start with a cake you already love." },
  {
    step: "02",
    title: "Make it yours",
    text: "Choose flavour, size, finish, and message.",
  },
  {
    step: "03",
    title: "Set the moment",
    text: "Pick a date, time, and way to receive it.",
  },
  { step: "04", title: "Celebrate", text: "We bake it fresh for your table." },
];

export default function Home() {
  function subscribe(event) {
    event.preventDefault();
    toast.success("You are on the guest list for fresh ideas.");
    event.currentTarget.reset();
  }
  return (
    <>
      <section className="hero">
        <div className="hero-text page-width">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="section-kicker"
          >
            Small-batch celebration cakes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06 }}
          >
            <em>Beautiful cakes.</em>
            <br />
            Made for your moments.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12 }}
          >
            Handcrafted cakes for the big milestones, the quiet wins, and every
            reason in between.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.18 }}
          >
            <Link className="btn-berry" to="/shop">
              Shop cakes <ArrowRight size={17} />
            </Link>
            <Link className="hero-text-link" to="/custom-cake">
              Create your cake <span>↗</span>
            </Link>
          </motion.div>
        </div>
        <div className="hero-image">
          <img
            src={assetUrls.hero}
            alt="Raspberry and vanilla celebration cake on a cake stand"
          />
          <div className="hero-image-caption">
            <span>Made with attention</span>
            <strong>to every last layer.</strong>
          </div>
          <div className="hero-order-card">
            <span className="eyebrow">Counter note · 04</span>
            <strong>
              Vanilla, raspberry,
              <br />
              and a bright little cherry.
            </strong>
            <small>Made to be remembered.</small>
          </div>
        </div>
        <div className="hero-stamp">
          <CakeSlice size={25} />
          <span>
            made
            <br />
            by hand
          </span>
        </div>
      </section>

      <section className="featured-section page-width">
        <div className="section-heading">
          <div>
            <p className="section-kicker">From the counter</p>
            <h2>
              Familiar favourites,
              <br />
              <em>finished with feeling.</em>
            </h2>
          </div>
          <Link to="/shop" className="text-link">
            See all cakes <ArrowRight size={17} />
          </Link>
        </div>
        <div className="featured-grid">
          {cakes.slice(0, 4).map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ delay: index * 0.05 }}
            >
              <CakeCard cake={cake} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="occasion-section">
        <div className="page-width">
          <div className="occasion-intro">
            <div>
              <p className="section-kicker">Find the feeling</p>
              <h2>
                Every occasion
                <br />
                has a <em>flavour.</em>
              </h2>
            </div>
            <p>
              Some days call for candles, some for a little ceremony. Start with
              the kind of moment you are making.
            </p>
          </div>
          <div className="occasion-grid">
            {categories.map((category, index) => (
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className={`occasion-card occasion-${category.tone}`}
                key={category.id}
              >
                <span className="occasion-number">0{index + 1}</span>
                <span className="occasion-icon">
                  {
                    [
                      <Gift />,
                      <HeartHandshake />,
                      <Star />,
                      <CakeSlice />,
                      <Sparkles />,
                      <Palette />,
                    ][index]
                  }
                </span>
                <h3>{category.name}</h3>
                <p>{category.note}</p>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="custom-splash page-width">
        <div className="custom-image">
          <img
            loading="lazy"
            src={assetUrls.custom}
            alt="Baker finishing a refined custom cake"
          />
        </div>
        <div className="custom-copy">
          <p className="section-kicker">The custom counter</p>
          <h2>
            Your idea.
            <br />
            <em>Our kitchen.</em>
          </h2>
          <p>
            Bring a colour, a sketch, a favourite flavour, or simply a feeling.
            We will help turn it into a cake worth gathering around.
          </p>
          <div className="custom-mini-list">
            <span>
              <Check size={15} /> Guided, easy choices
            </span>
            <span>
              <Check size={15} /> Add a reference photo
            </span>
            <span>
              <Check size={15} /> Clear price estimate
            </span>
          </div>
          <Link to="/custom-cake" className="btn-berry">
            Design your cake <Palette size={17} />
          </Link>
        </div>
      </section>

      <section className="how-section">
        <div className="page-width">
          <div className="how-top">
            <p className="section-kicker">The simple part</p>
            <h2>
              A good cake should
              <br />
              not be hard to <em>order.</em>
            </h2>
          </div>
          <div className="process-list">
            {process.map(item => (
              <div className="process-item" key={item.step}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <ChevronRight aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="events-section page-width">
        <div className="events-image">
          <img
            loading="lazy"
            src={assetUrls.event}
            alt="Elegant event cake laid out for a garden celebration"
          />
        </div>
        <div className="events-copy">
          <span className="eyebrow">For a table full of people</span>
          <h2>More to celebrate?</h2>
          <p>
            From a small team lunch to the day you say “I do,” Cakely can make
            the centrepiece feel personal.
          </p>
          <div className="event-tags">
            <span>
              <CalendarHeart size={16} /> Weddings
            </span>
            <span>
              <CakeSlice size={16} /> Birthdays
            </span>
            <span>
              <UtensilsCrossed size={16} /> Events
            </span>
          </div>
          <Link to="/contact" className="btn-cream">
            Plan an event <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="newsletter">
        <div className="page-width newsletter-inner">
          <div>
            <Mail size={25} />
            <p className="section-kicker">A little something sweet</p>
            <h2>
              Fresh from the oven,
              <br />
              <em>once in a while.</em>
            </h2>
          </div>
          <form onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              required
            />
            <button aria-label="Subscribe" type="submit">
              <ArrowRight />
            </button>
            <p>
              Seasonal flavours, thoughtful cake ideas, never too much inbox.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
