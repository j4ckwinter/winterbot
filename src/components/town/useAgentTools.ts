import { useEffect, useRef } from "preact/hooks";
import { createTownTools, type TownDriver, type TownView } from "./agentTools";
import type { Landmark, Point } from "./world";

type ModelContext = {
  registerTool?: (tool: object, options?: { signal: AbortSignal }) => unknown;
};
type Waiter = {
  since: number;
  arrived: (view: TownView) => boolean;
  finish: (arrived: boolean) => void;
};
type Controls = {
  exit: Landmark;
  reduced: boolean;
  closeContent: () => void;
  walkTo: (point: Point, instant: boolean) => boolean;
  travel: (landmark: Landmark, instant: boolean) => boolean;
  stop: () => void;
};

const WALK_TIMEOUT = 20000;

export function useAgentTools(view: TownView, controls: Controls) {
  const latest = useRef({ view, controls });
  latest.current = { view, controls };
  const waiter = useRef<Waiter | null>(null);
  const renders = useRef(0);
  const render = ++renders.current;

  useEffect(() => {
    const pending = waiter.current;
    if (!pending || render <= pending.since) return;
    if (pending.arrived(view)) pending.finish(true);
    else if (!view.walking) pending.finish(false);
  });

  useEffect(() => {
    const instant = () => latest.current.controls.reduced || document.hidden;
    const driver: TownDriver = {
      view: () => latest.current.view,
      exit: controls.exit,
      closeReading: () => {
        if (latest.current.view.reading) latest.current.controls.closeContent();
      },
      walk: (point) => latest.current.controls.walkTo(point, instant()),
      travel: (landmark) => latest.current.controls.travel(landmark, instant()),
      settle: (arrived) =>
        new Promise((resolve) => {
          waiter.current?.finish(false);
          const timer = window.setTimeout(() => {
            latest.current.controls.stop();
            finish(false);
          }, WALK_TIMEOUT);
          const finish = (result: boolean) => {
            window.clearTimeout(timer);
            if (waiter.current?.finish === finish) waiter.current = null;
            resolve(result);
          };
          waiter.current = { since: renders.current, arrived, finish };
        }),
    };
    const tools = createTownTools(driver);
    const registration = new AbortController();
    // WebMCP moved from navigator to document in May 2026; origin-trial builds before that only have the former.
    // https://webmachinelearning.github.io/webmcp/
    const modelContext: ModelContext | undefined =
      (document as { modelContext?: ModelContext }).modelContext ??
      (navigator as { modelContext?: ModelContext }).modelContext;
    if (typeof modelContext?.registerTool === "function")
      for (const { readOnly, ...tool } of tools)
        Promise.resolve()
          .then(() =>
            modelContext.registerTool!(
              { ...tool, annotations: { readOnlyHint: readOnly } },
              { signal: registration.signal },
            ),
          )
          .catch(() => {});
    let removePanel = () => {};
    if (import.meta.env.DEV)
      import("./agentPanel").then(({ mountAgentPanel }) => {
        if (!registration.signal.aborted) removePanel = mountAgentPanel(tools);
      });
    return () => {
      registration.abort();
      waiter.current?.finish(false);
      removePanel();
    };
  }, []);
}
