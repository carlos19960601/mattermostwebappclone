import { latinise } from "./latinise";

export function cleanUpUrlable(input) {
  let cleaned = latinise(input);
  cleaned = cleaned
    .trim()
    .replace(/-/g, " ")
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .replace(/\s/g, "-");
  cleaned = cleaned.replace(/^-+/, "");
  cleaned = cleaned.replace(/-+$/, "");
  return cleaned;
}

export function getSiteURL() {
  return getSiteURLFromWindowObject(window);
}

export function getSiteURLFromWindowObject(obj) {
  let siteURL = "";
  if (obj.location.origin) {
    siteURL = obj.location.origin;
  } else {
    siteURL =
      obj.location.protocol +
      "//" +
      obj.location.hostname +
      (obj.location.port ? ":" + obj.location.port : "");
  }

  if (siteURL[siteURL.length - 1] === "/") {
    siteURL = siteURL.substring(0, siteURL.length - 1);
  }

  if (obj.basename) {
    siteURL += obj.basename;
  }

  if (siteURL[siteURL.length - 1] === "/") {
    siteURL = siteURL.substring(0, siteURL.length - 1);
  }

  return siteURL;
}
