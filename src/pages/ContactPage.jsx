import { useState } from "react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section className="contact-page">
      <p className="post-category">GET IN TOUCH</p>

      <h1>Contact Me</h1>

      <p>
        Have a favorite horror movie or a thought about The October Blog?
        Send me a message!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSubmitted(false);
          }}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSubmitted(false);
          }}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="5"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setSubmitted(false);
          }}
          required
        />

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      {submitted && (
        <p className="success-message">
          Thank you! Your message has been submitted.
        </p>
      )}
    </section>
  );
}

export default ContactPage;