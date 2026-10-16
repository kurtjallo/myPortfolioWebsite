import { LINKS, SITE } from '@/data';

/** Copies the address, or opens the mail app when the clipboard is unavailable. Resolves whether it copied. */
export async function copyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(SITE.email);
    return true;
  } catch {
    location.href = LINKS.email.href;
    return false;
  }
}
