import type { ComponentChildren } from "preact";
import { MAP_VIEW_BOX } from "./world";

export default function TownObject({
  name,
  depth,
  children,
  highlighted = false,
}: {
  highlighted?: boolean;
  name: string;
  depth: number;
  children: ComponentChildren;
}) {
  return (
    <svg
      class={`town-object ${highlighted ? "is-destination" : ""}`}
      data-scenery={name}
      style={{ zIndex: Math.floor(depth) }}
      viewBox={MAP_VIEW_BOX}
      aria-hidden="true"
      shape-rendering="crispEdges"
    >
      {children}
    </svg>
  );
}
