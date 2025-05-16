import * as sanitizeHtml from 'sanitize-html';

export const getRedirectUrl = (role: 'user' | 'admin'): string => {
  return `${process.env.FRONTEND_URL}/${role === 'admin' ? 'dashboard' : ''}`;
};

export function sanitizeInput(
  value: string,
  options?: sanitizeHtml.IOptions,
): string {
  if (typeof value !== 'string') {
    return value;
  }

  const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
  };

  return sanitizeHtml(value, options || defaultOptions);
}
