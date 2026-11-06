import "./project-demo.css";
import RouteDemo from "./RouteDemo";
import PaletteDemo from "./PaletteDemo";
import SearchDemo from "./SearchDemo";
import WorkflowDemo from "./WorkflowDemo";

import type { ProjectId } from "./projects";

function WinterBotDemo() {
  return (
    <>
      <RouteDemo />
      <details class="demo-secondary">
        <summary>Palette workbench</summary>
        <PaletteDemo />
      </details>
    </>
  );
}

const demos = {
  winterbot: WinterBotDemo,
  "brain-cache": SearchDemo,
  "pancake-stack": WorkflowDemo,
} satisfies Record<ProjectId, () => preact.JSX.Element>;

export default function ProjectDemo({ project }: { project: ProjectId }) {
  const Demo = demos[project];
  return <Demo />;
}
