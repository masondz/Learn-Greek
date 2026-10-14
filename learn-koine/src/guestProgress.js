import { AUTH_ENABLED } from "./authConfig";

export const GUEST_RESUME_KEY = "didakey.guest.resumeLocation";
export const GUEST_VERB_OPTIONS_KEY = "didakey.guest.verbOptions";
export const GUEST_VERB_AUTO_ADVANCE_KEY = "didakey.guest.verbAutoAdvance";

const isGuest = () => {
  try {
    return !AUTH_ENABLED || !localStorage.getItem("token");
  } catch {
    return !AUTH_ENABLED;
  }
};

const isStudyLocation = (location) =>
  location === "/verb" ||
  location === "/vocabulary" ||
  location === "/parsing-verse/" ||
  location.startsWith("/parsing-verse/");

export const saveGuestResumeLocation = (location) => {
  if (!isGuest() || !isStudyLocation(location)) return;
  try {
    localStorage.setItem(GUEST_RESUME_KEY, location);
  } catch (error) {
    console.error("Unable to save guest progress:", error);
  }
};

export const getGuestResumeLocation = () => {
  if (!isGuest()) return null;
  try {
    const location = localStorage.getItem(GUEST_RESUME_KEY);
    return location && isStudyLocation(location) ? location : null;
  } catch (error) {
    console.error("Unable to read guest progress:", error);
    return null;
  }
};

export const saveGuestVerbOptions = (options) => {
  if (!isGuest()) return;
  try {
    localStorage.setItem(GUEST_VERB_OPTIONS_KEY, JSON.stringify(options));
  } catch (error) {
    console.error("Unable to save guest verb options:", error);
  }
};

export const getGuestVerbOptions = () => {
  if (!isGuest()) return null;
  try {
    const options = localStorage.getItem(GUEST_VERB_OPTIONS_KEY);
    if (!options) return null;
    const parsedOptions = JSON.parse(options);
    return parsedOptions && typeof parsedOptions === "object" && !Array.isArray(parsedOptions)
      ? parsedOptions
      : null;
  } catch (error) {
    console.error("Unable to read guest verb options:", error);
    return null;
  }
};

export const saveGuestVerbAutoAdvance = (enabled) => {
  if (!isGuest()) return;
  try {
    localStorage.setItem(GUEST_VERB_AUTO_ADVANCE_KEY, String(enabled));
  } catch (error) {
    console.error("Unable to save guest auto advance setting:", error);
  }
};

export const getGuestVerbAutoAdvance = () => {
  if (!isGuest()) return true;
  try {
    const enabled = localStorage.getItem(GUEST_VERB_AUTO_ADVANCE_KEY);
    return enabled === null ? true : enabled === "true";
  } catch (error) {
    console.error("Unable to read guest auto advance setting:", error);
    return true;
  }
};
