interface NetlifyIdentityUser {
  email: string;
  id: string;
}

interface NetlifyIdentityError {
  message?: string;
}

interface NetlifyIdentity {
  init: () => void;
  currentUser: () => NetlifyIdentityUser | null;
  open: (modal?: "login" | "signup" | "invite") => void;
  logout: () => void;
  close: () => void;
  on: (
    event: "init" | "login" | "logout" | "error" | "open" | "close",
    callback: (user?: NetlifyIdentityUser | NetlifyIdentityError) => void
  ) => void;
  isOpen: () => boolean;
}

declare global {
  interface Window {
    netlifyIdentity?: NetlifyIdentity;
  }
}

export {};

