import { site } from "../data/content";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="fab-wa"
      aria-label="Talk to us on WhatsApp"
    >
      <span>Talk</span>
      <span>to us</span>
    </a>
  );
}
