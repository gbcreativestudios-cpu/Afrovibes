// A gently "breathing" downward arrow anchored to the bottom of the hero,
// hinting there's more to scroll to. Toggled on/off from Decap. Clicking it
// smooth-scrolls to whatever section immediately follows the hero.
export default function ScrollIndicator({ enabled }) {
  if (!enabled) return null;

  const handleClick = () => {
    const hero = document.querySelector(".hero");
    const next = hero?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      className="scroll-indicator"
      onClick={handleClick}
      aria-label="Scroll down"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 9L12 16L19 9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
