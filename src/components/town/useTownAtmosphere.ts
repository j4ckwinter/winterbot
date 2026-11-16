import { useEffect } from "preact/hooks";
import { applyTownAtmosphere } from "./townAtmosphere";

const ATMOSPHERE_REFRESH_MS = 60_000;

export function useTownAtmosphere() {
  useEffect(() => {
    applyTownAtmosphere();
    const timer = window.setInterval(
      applyTownAtmosphere,
      ATMOSPHERE_REFRESH_MS,
    );
    return () => window.clearInterval(timer);
  }, []);
}
