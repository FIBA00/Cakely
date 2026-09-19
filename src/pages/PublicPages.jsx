// Patisserie Postcard: public pages extend the bakery’s personal counter voice into practical next steps.
import {
  ArrowRight,
  CakeSlice,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { assetUrls } from "../data/mockData";

export function AboutPage() {
  return (
    <>
      <section className="about-hero page-width">
        <div>
          <p className="section-kicker">The Cakely kitchen</p>
          <h1>
            The good part
            <br />
            is in the <em>details.</em>
          </h1>
          <p>
            We believe a cake should feel considered before the first candle is
            lit: thoughtful ingredients, a steady hand, and a lot of attention
            to who it is for.
          </p>
        </div>
        <div className="about-image">
          <img
            src={assetUrls.hero}
            alt="Cake displayed on a pale stone stand"
          />
        </div>
      </section>
      <section className="about-story">
        <div className="page-width about-story-grid">
          <div>
            <p className="section-kicker">A small-batch promise</p>
            <h2>
              We make fewer cakes
              <br />
              so every one feels <em>like yours.</em>
            </h2>
          </div>
          <div className="about-notes">
            <p>
              <strong>Made to order.</strong> Your cake is baked fresh for the
              day it is meant to be eaten.
            </p>
            <p>
              <strong>Made with feeling.</strong> A good cake needs great
              ingredients, but it also needs a little patience.
            </p>
            <p>
              <strong>Made around you.</strong> Our guided custom counter makes
              the important details simple to share.
            </p>
          </div>
        </div>
      </section>
      <section className="kitchen-values page-width">
        <div>
          <CakeSlice />
          <h2>
            “Every celebration is already a story.
            <br />
            We are just lucky enough to make the dessert.”
          </h2>
          <Link className="btn-berry" to="/custom-cake">
            Tell us your story <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  topic: z.string().min(1, "Choose a topic."),
  message: z.string().min(10, "Tell us a little more so we can help."),
});
export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });
  async function submit() {
    await new Promise(resolve => setTimeout(resolve, 300));
    toast.success("Your note is on its way to our kitchen.");
    reset();
  }
  return (
    <section className="contact-page page-width">
      <div className="contact-intro">
        <p className="section-kicker">Say hello</p>
        <h1>
          Let us talk
          <br />
          about <em>cake.</em>
        </h1>
        <p>
          Planning something sizeable, wondering about an ingredient, or want a
          second baker’s opinion? Send a note.
        </p>
        <div className="contact-details">
          <a href="mailto:hello@cakely.example">
            <Mail size={18} /> hello@cakely.example
          </a>
          <a href="tel:+251911234567">
            <Phone size={18} /> +251 91 123 4567
          </a>
          <span>
            <MapPin size={18} /> Bole, Addis Ababa
          </span>
          <span>
            <Clock3 size={18} /> Tue–Sun, 9:00 AM–6:00 PM
          </span>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit(submit)}>
        <h2>Leave a note.</h2>
        <label className="field">
          <span className="form-label">Name</span>
          <input className="form-input" {...register("name")} />
          {errors.name && (
            <span className="field-error">{errors.name.message}</span>
          )}
        </label>
        <label className="field">
          <span className="form-label">Email</span>
          <input className="form-input" type="email" {...register("email")} />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
          )}
        </label>
        <label className="field">
          <span className="form-label">What can we help with?</span>
          <select className="form-select" {...register("topic")}>
            <option value="">Choose a topic</option>
            <option>Custom cake</option>
            <option>Event or group order</option>
            <option>Ingredients or allergens</option>
            <option>Existing order</option>
          </select>
          {errors.topic && (
            <span className="field-error">{errors.topic.message}</span>
          )}
        </label>
        <label className="field">
          <span className="form-label">Your message</span>
          <textarea className="form-textarea" {...register("message")} />
          {errors.message && (
            <span className="field-error">{errors.message.message}</span>
          )}
        </label>
        <button className="btn-berry mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send a note"} <Send size={16} />
        </button>
      </form>
    </section>
  );
}
