import { useState } from "preact/hooks";
import type { Content } from "./navigation";
import { DEFAULT_PROJECT, type ProjectId } from "./projects";

export function useInspectedProjects() {
  const [inspectedProjects, setInspectedProjects] = useState<ProjectId[]>([]);
  const recordInspection = (value: Content | null) => {
    if (value?.place !== "workshop") return;
    const project = value.project ?? DEFAULT_PROJECT;
    setInspectedProjects((current) =>
      current.includes(project) ? current : [...current, project],
    );
  };
  return { inspectedProjects, recordInspection };
}
