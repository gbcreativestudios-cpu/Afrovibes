// Minimal monochrome icons (currentColor) for the footer's social row.
// Add a new `case` here whenever a new platform option is added to
// Decap's socialLinks select field.
export default function SocialIcon({ platform }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };

  switch (platform) {
    case "facebook":
      return (
        <svg {...common}>
          <path
            d="M15 8.5h2V5.6c-.35-.05-1.54-.15-2.94-.15-2.9 0-4.89 1.78-4.89 5.06v2.7H6.5v3.4h2.67V21h3.5v-4.4h2.56l.41-3.4h-2.97v-2.35c0-.98.27-1.65 1.68-1.65Z"
            fill="currentColor"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path
            d="M14.5 3.5c.4 2.2 1.9 3.7 4.2 3.9v2.9c-1.5 0-2.9-.45-4.1-1.3v6.1c0 3.1-2.4 5.4-5.3 5.4-2.9 0-5.3-2.3-5.3-5.4 0-3 2.5-5.4 5.5-5.3v3c-1.3-.1-2.5.9-2.5 2.3 0 1.3 1.1 2.4 2.4 2.4 1.4 0 2.6-1.1 2.6-2.6V3.5h2.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path
            d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.5-1.2A8.4 8.4 0 1 0 12 3.5Zm4.9 11.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.6-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.2.3-.3.5l-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.8 2.1 1.2 1 2.2 1.4 2.6 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1l1.7.8c.2.1.4.2.5.3.1.2.1.7-.1 1.3Z"
            fill="currentColor"
          />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4l7 8.4L4.4 20H6l5.9-6.5L16.2 20H20l-7.4-8.9L19.7 4H18l-5.4 6L8 4H4Z" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" fill="currentColor" />
        </svg>
      );
    case "threads":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3.5c-4.5 0-7.5 2.9-7.5 8.4s3 8.6 7.5 8.6c4 0 6.4-2 6.7-5.3.3-3-1.4-4.6-4.3-4.9-2.2-.2-3.6.6-3.6 2 0 1 .9 1.7 2.2 1.7 1.6 0 2.6-1 2.8-2.6" />
        </svg>
      );
    case "snapchat":
      return (
        <svg {...common}>
          <path
            d="M12 3.5c2.6 0 4.3 2 4.4 4.4.05.9 0 1.7 0 2.3.6.4 1.3.5 1.9.4.4-.1.8.2.7.6-.1.5-.7.9-1.5 1.2.1.4.3.7.7 1.1.6.6 1.5.9 1.4 1.4-.1.5-1 .7-1.7.8-.1.3-.1.6-.3.9-.3.5-1 .4-1.8.5-.7.1-1.1.7-2.2 1.1-1 .4-1.9-.1-2.6-.1-.7 0-1.6.5-2.6.1-1.1-.4-1.5-1-2.2-1.1-.8-.1-1.5 0-1.8-.5-.2-.3-.2-.6-.3-.9-.7-.1-1.6-.3-1.7-.8-.1-.5.8-.8 1.4-1.4.4-.4.6-.7.7-1.1-.8-.3-1.4-.7-1.5-1.2-.1-.4.3-.7.7-.6.6.1 1.3 0 1.9-.4 0-.6-.05-1.4 0-2.3.1-2.4 1.8-4.4 4.4-4.4Z"
            fill="currentColor"
          />
        </svg>
      );
    case "email":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="M4.5 7l7.5 6 7.5-6" />
        </svg>
      );
    default:
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path d="M10 14a4.5 4.5 0 0 0 6.4.3l2-2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1" />
          <path d="M14 10a4.5 4.5 0 0 0-6.4-.3l-2 2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1" />
        </svg>
      );
  }
}
