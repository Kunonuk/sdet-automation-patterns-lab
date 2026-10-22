export interface Environment {
  readonly uiBaseUrl: string;
  readonly apiBaseUrl: string;
}

export function loadEnvironment(values: Readonly<Record<string, string | undefined>>): Environment {
  return {
    uiBaseUrl: baseUrl(
      'TOOLSHOP_UI_BASE_URL',
      values.TOOLSHOP_UI_BASE_URL ?? 'https://practicesoftwaretesting.com/',
    ),
    apiBaseUrl: baseUrl(
      'TOOLSHOP_API_BASE_URL',
      values.TOOLSHOP_API_BASE_URL ?? 'https://api.practicesoftwaretesting.com/',
    ),
  };
}

function baseUrl(setting: string, value: string): string {
  const invalid = (): Error =>
    new Error(`${setting} must be an HTTP(S) base URL without credentials, query or fragment`);
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw invalid();
  }
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.href.includes('?') ||
    url.href.includes('#')
  ) {
    throw invalid();
  }
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url.href;
}
