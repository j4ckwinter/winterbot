import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "preact/hooks";
import { places, type Place } from "./world";

type Season = "leaf" | "fire";
type Progress = { version: 1; season: Season; visited: Place[] };

export const PROGRESS_KEY = "winter-town:progress:v1";

const emptyProgress = (): Progress => ({
  version: 1,
  season: "leaf",
  visited: [],
});

function isPlace(value: unknown): value is Place {
  return places.some((place) => place.id === value);
}

export function parseProgress(value: string | null): Progress {
  if (value === null) return emptyProgress();
  try {
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed) ||
      !("version" in parsed) ||
      parsed.version !== 1 ||
      !("season" in parsed) ||
      (parsed.season !== "leaf" && parsed.season !== "fire") ||
      !("visited" in parsed) ||
      !Array.isArray(parsed.visited)
    ) {
      return emptyProgress();
    }
    return {
      version: 1,
      season: parsed.season,
      visited: [...new Set(parsed.visited.filter(isPlace))],
    };
  } catch {
    return emptyProgress();
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [loaded, setLoaded] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    try {
      const saved = parseProgress(window.localStorage.getItem(PROGRESS_KEY));
      setProgress((current) => ({
        ...saved,
        visited: [...new Set([...saved.visited, ...current.visited])],
      }));
    } catch {
      setStorageAvailable(false);
    }
    setLoaded(true);
  }, []);

  useLayoutEffect(() => {
    if (!loaded || !storageAvailable) return;
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      setStorageAvailable(false);
    }
  }, [loaded, progress, storageAvailable]);

  const setSeason = useCallback(
    (next: Season | ((previous: Season) => Season)) => {
      setProgress((current) => ({
        ...current,
        season: typeof next === "function" ? next(current.season) : next,
      }));
    },
    [],
  );

  const markVisited = useCallback((place: Place) => {
    setProgress((current) =>
      current.visited.includes(place)
        ? current
        : { ...current, visited: [...current.visited, place] },
    );
  }, []);

  const resetExploration = useCallback(() => {
    setProgress((current) => ({ ...current, visited: [] }));
  }, []);

  return {
    season: progress.season,
    setSeason,
    visited: progress.visited,
    markVisited,
    resetExploration,
    storageAvailable,
  };
}
