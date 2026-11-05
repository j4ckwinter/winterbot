import "./project-demo.css";
import RouteDemo from "./RouteDemo";
import PaletteDemo from "./PaletteDemo";
import SearchDemo from "./SearchDemo";
import WorkflowDemo from "./WorkflowDemo";

export default function ProjectDemo({ project }: { project: 0 | 1 | 2 }) {
  return project === 0 ? (
    <>
      <RouteDemo />
      <details class="demo-secondary">
        <summary>Palette workbench</summary>
        <PaletteDemo />
      </details>
    </>
  ) : project === 1 ? (
    <SearchDemo />
  ) : (
    <WorkflowDemo />
  );
}
