import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import LookoutScene from "./LookoutScene";
import LookoutWalk from "./LookoutWalk";

type Trip = "closed" | "riding" | "lookout";

export default function StationTrip({
  unlocked,
  reduced,
  onStart,
}: {
  unlocked: boolean;
  reduced: boolean;
  onStart: () => void;
}) {
  const [ticket, setTicket] = useState(false);
  const [trip, setTrip] = useState<Trip>("closed");
  const dialog = useRef<HTMLDialogElement>(null);
  const depart = useRef<HTMLButtonElement>(null);
  const close = () => {
    setTrip("closed");
    dialog.current?.close();
    depart.current?.focus();
  };
  useLayoutEffect(() => {
    if (ticket) depart.current?.focus();
  }, [ticket]);
  useLayoutEffect(() => {
    if (trip !== "closed" && !dialog.current?.open) dialog.current?.showModal();
  }, [trip]);
  useEffect(() => {
    if (trip !== "riding") return;
    if (reduced) {
      setTrip("lookout");
      return;
    }
    const timer = window.setTimeout(() => setTrip("lookout"), 1800);
    return () => window.clearTimeout(timer);
  }, [trip, reduced]);
  return (
    <aside class="station-trip" aria-label="Optional train trip">
      <div>
        <strong>Lookout line</strong>
        <p>
          {!unlocked
            ? "Inspect a project at the workshop to collect a ticket."
            : ticket
              ? "Return ticket to the lookout."
              : "Your lookout ticket is ready."}
        </p>
      </div>
      {!ticket ? (
        <button disabled={!unlocked} onClick={() => setTicket(true)}>
          Collect ticket
        </button>
      ) : (
        <button
          ref={depart}
          onClick={() => {
            onStart();
            setTrip(reduced ? "lookout" : "riding");
          }}
        >
          Take the train
        </button>
      )}
      <dialog
        ref={dialog}
        class="lookout-dialog"
        aria-labelledby="lookout-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <header>
          <h2 id="lookout-title">
            {trip === "riding" ? "Next stop: the lookout" : "Above Winter Town"}
          </h2>
          <button onClick={close} aria-label="Return to station">
            ✕
          </button>
        </header>
        {trip === "lookout" ? (
          <LookoutWalk reduced={reduced} onReturn={close} />
        ) : (
          <div class={`lookout-scene ${trip === "riding" ? "is-riding" : ""}`}>
            <LookoutScene />
          </div>
        )}
        <footer>
          <p aria-live="polite">
            {trip === "riding"
              ? "Winter Station → Lookout"
              : "Return whenever you’re ready."}
          </p>
          {trip === "riding" ? (
            <button onClick={() => setTrip("lookout")}>Skip ride</button>
          ) : (
            <button onClick={close}>Back to the station</button>
          )}
        </footer>
      </dialog>
    </aside>
  );
}
