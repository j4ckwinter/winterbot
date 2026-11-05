import type { Place } from "./world";

const notes = {
  workshop: {
    title: "A note from Jack",
    text: "Try the three machines: the map console runs this town’s pathfinder, the cabinet searches recorded source code, and the bench replays a real animation bug.",
  },
  home: {
    title: "On the desk",
    text: "Open the desk to read about my frontend work and the tools I use. My current role and earlier work are on the departure board at Winter Station.",
  },
  post: {
    title: "At the counter",
    text: "Open the counter for my email, GitHub, and LinkedIn. You can also email me directly from the trainer card.",
  },
} satisfies Record<Exclude<Place, "station">, { title: string; text: string }>;

export default function RoomNote({
  place,
}: {
  place: Exclude<Place, "station">;
}) {
  const note = notes[place];
  return (
    <details class="room-note" key={place}>
      <summary>
        <span aria-hidden="true">▤</span> {note.title}
      </summary>
      <p>{note.text}</p>
    </details>
  );
}
