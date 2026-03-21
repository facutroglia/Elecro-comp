import { createContext, useState, useContext, useEffect } from "react";

const MobileContext = createContext();

export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "mobile",
      ];
      const isMobileUA = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword),
      );
      // Combine both checks - prioritize media query but consider user agent
      const isMobileDevice =
        mediaQuery.matches || (isMobileUA && window.innerWidth <= 768);
      setIsMobile(isMobileDevice);
    };
    checkIsMobile();
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => checkIsMobile();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    window.addEventListener("resize", checkIsMobile);
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => useContext(MobileContext);
