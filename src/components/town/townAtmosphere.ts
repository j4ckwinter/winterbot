export type Light = "day" | "night";
export type Weather = "clear" | "snow" | "heavy";
export type Atmosphere = { light: Light; weather: Weather };

// Serialised into the page by index.astro so the first paint is already correct; it must stay free of imports and outer references.
export function townAtmosphere(now: Date, search = ""): Atmosphere {
  const londonSunByMonthUtc = [
    [8, 16.3],
    [7.25, 17.2],
    [6.25, 18],
    [5.1, 18.9],
    [4.2, 19.7],
    [3.75, 20.3],
    [4, 20.2],
    [4.75, 19.3],
    [5.6, 18.25],
    [6.4, 17.1],
    [7.25, 16.2],
    [8, 15.9],
  ];
  const hour = now.getUTCHours() + now.getUTCMinutes() / 60;
  const [sunrise, sunset] = londonSunByMonthUtc[now.getUTCMonth()];
  const threeHourBlock = Math.floor(now.getTime() / 10800000);
  const roll = ((Math.imul(threeHourBlock, 2654435761) >>> 0) >>> 8) % 10;
  const params = new URLSearchParams(search);
  const time = params.get("time");
  const sky = params.get("weather");
  return {
    light:
      time === "day" || time === "night"
        ? time
        : hour >= sunrise && hour < sunset
          ? "day"
          : "night",
    weather:
      sky === "clear" || sky === "snow" || sky === "heavy"
        ? sky
        : roll < 4
          ? "clear"
          : roll < 8
            ? "snow"
            : "heavy",
  };
}

export function applyTownAtmosphere() {
  const { light, weather } = townAtmosphere(new Date(), window.location.search);
  document.documentElement.dataset.light = light;
  document.documentElement.dataset.weather = weather;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", light === "night" ? "#121927" : "#eef2f5");
}
