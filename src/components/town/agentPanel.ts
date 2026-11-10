import type { AgentTool } from "./agentTools";

const tour: [string, Record<string, unknown>?][] = [
  ["look_around"],
  ["enter_building", { place: "workshop" }],
  ["read", { project: "brain-cache" }],
  ["leave_building"],
  ["walk_to", { place: "station" }],
  ["look_around"],
];

const styles = `
.agent-panel{position:fixed;left:8px;bottom:8px;z-index:30;width:min(360px,calc(100vw - 16px));border:2px solid #26352c;background:#f6f4eb;color:#26352c;font:11px/1.5 "JetBrains Mono",monospace}
.agent-panel:not([open]){width:auto}
.agent-panel summary{padding:6px 8px;cursor:pointer;font-weight:700}
.agent-panel form{display:flex;flex-wrap:wrap;gap:4px;padding:0 8px 8px}
.agent-panel select,.agent-panel input,.agent-panel button{font:inherit;padding:3px 5px}
.agent-panel input{flex:1;min-width:0}
.agent-panel pre{max-height:38vh;margin:0;padding:8px;overflow:auto;border-top:1px solid #26352c;white-space:pre-wrap}
`;

export function mountAgentPanel(tools: AgentTool[]) {
  const panel = document.createElement("details");
  panel.className = "agent-panel";
  panel.innerHTML = `<style>${styles}</style>
<summary>Agent tools (dev only)</summary>
<form>
  <select name="tool" aria-label="Tool">${tools.map((tool) => `<option>${tool.name}</option>`).join("")}</select>
  <input name="input" aria-label="Input as JSON" placeholder='{"place":"workshop"}' />
  <button>Call</button>
  <button type="button" name="tour">Run a visit</button>
</form>
<pre aria-live="polite">Calls run the same execute functions that WebMCP registers. A reading opens the real dialog, which blocks this panel until the next call or Escape.</pre>`;
  const form = panel.querySelector("form")!;
  const log = panel.querySelector("pre")!;
  const call = async (name: string, input?: Record<string, unknown>) => {
    log.textContent = `> ${name}(${input ? JSON.stringify(input) : ""})\n…`;
    const tool = tools.find((candidate) => candidate.name === name)!;
    log.textContent = `> ${name}(${input ? JSON.stringify(input) : ""})\n${await tool.execute(input)}`;
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const text = String(data.get("input")).trim();
    try {
      void call(String(data.get("tool")), text ? JSON.parse(text) : undefined);
    } catch {
      log.textContent = "Input must be JSON, or empty.";
    }
  });
  panel.querySelector("[name=tour]")!.addEventListener("click", async () => {
    for (const [name, input] of tour) {
      await call(name, input);
      await new Promise((resolve) => setTimeout(resolve, 1800));
    }
  });
  document.body.append(panel);
  return () => panel.remove();
}
