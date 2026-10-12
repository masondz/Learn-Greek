// Keep authentication disabled by default for the guest-only release.
// Set VITE_AUTH_ENABLED=true in a local or staging environment to re-enable it.
export const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";
