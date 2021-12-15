import {latinise} from './latinise';

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
