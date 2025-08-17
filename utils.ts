

/**
 * Safely strips HTML tags from a string.
 * @param html The input string, which may contain HTML.
 * @returns The plain text content, or an empty string if the input is invalid.
 */
export const stripHtml = (html: string | null | undefined): string => {
    if (typeof html !== 'string' || !html) {
      return "";
    }
    try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    } catch (e) {
        console.error("Error stripping HTML:", e);
        return '';
    }
};
