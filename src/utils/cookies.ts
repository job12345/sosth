import Cookies from 'js-cookie';

export type CookieConsent = {
  analytics: boolean;
  necessary: boolean;
  preferences: boolean;
};

export const getCookieConsent = (): CookieConsent | null => {
  const consent = Cookies.get('cookie-consent');
  if (!consent) return null;

  return {
    analytics: consent === 'true',
    necessary: true, // คุกกี้จำเป็นจะเปิดใช้งานเสมอ
    preferences: consent === 'true',
  };
};

export const setAnalyticsCookies = () => {
  const consent = getCookieConsent();
  if (consent?.analytics) {
    // TODO: เพิ่มการตั้งค่า analytics cookies เมื่อมีการใช้งานจริง
  }
};

export const clearAnalyticsCookies = () => {
  // TODO: เพิ่มการลบ analytics cookies เมื่อมีการใช้งานจริง
};

export const setPreferenceCookies = (preferences: Record<string, string>) => {
  const consent = getCookieConsent();
  if (consent?.preferences) {
    Object.entries(preferences).forEach(([key, value]) => {
      Cookies.set(`pref_${key}`, value, { expires: 365 });
    });
  }
};

export const getPreferenceCookies = (key: string): string | undefined => {
  const consent = getCookieConsent();
  if (consent?.preferences) {
    return Cookies.get(`pref_${key}`);
  }
  return undefined;
};