import type { RefObject } from "preact";
import PlaceContent from "./PlaceContent";
import TrainerCard from "./TrainerCard";
import { places, type Scene } from "./world";
import type { Content } from "./navigation";

type Props = {
  dialogRef: RefObject<HTMLDialogElement>;
  content: Content | null;
  scene: Scene;
  copyState: string;
  permalink: string;
  onClose: () => void;
  onSelect: (content: Content) => void;
  onCopy: () => void;
};

export default function ContentDialog({
  dialogRef,
  content,
  scene,
  copyState,
  permalink,
  onClose,
  onSelect,
  onCopy,
}: Props) {
  return (
    <dialog
      ref={dialogRef}
      class="place-dialog"
      aria-labelledby="place-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div class="dialog-body">
        <header class="dialog-header">
          <div>
            <p class="eyebrow">
              {places.find((p) => p.id === content?.place)?.content}
            </p>
            <h2 id="place-title" tabIndex={-1}>
              {content?.place === "profile"
                ? "Trainer card"
                : places.find((p) => p.id === content?.place)?.name}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close details">
            ✕
          </button>
        </header>
        {content?.place === "profile" ? (
          <TrainerCard onNavigate={onSelect} />
        ) : (
          content && (
            <PlaceContent
              key={content.place}
              place={content.place}
              initialProject={content.project}
              onProjectChange={(project) =>
                onSelect({ place: "workshop", project })
              }
            />
          )
        )}
        <div class="share-content">
          <button onClick={onCopy}>Copy link</button>
          <a href={permalink}>Permalink ↗</a>
          <span role="status">{copyState}</span>
        </div>
        <button class="back-to-town" onClick={onClose}>
          ← Back to {scene === "town" ? "town" : "room"}
        </button>
      </div>
    </dialog>
  );
}
