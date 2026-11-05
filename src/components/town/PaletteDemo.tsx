import { useState } from "preact/hooks";

const palettes = {
  Summer: {
    grass: "#94b76b",
    roof: "#b96446",
    sky: "#c8ddbd",
    window: "#b5d9cb",
  },
  Autumn: {
    grass: "#b29a58",
    roof: "#925542",
    sky: "#ead3a0",
    window: "#f1cc83",
  },
  Night: {
    grass: "#435b55",
    roof: "#645c70",
    sky: "#303d52",
    window: "#f5d48b",
  },
};

export default function PaletteDemo() {
  const [palette, setPalette] = useState<keyof typeof palettes>("Summer");
  const colors = palettes[palette];
  return (
    <section
      class="project-demo demo-console"
      aria-label="Portfolio palette demo"
    >
      <div class="demo-frame-label">
        <span>WinterBot / palette workbench</span>
        <span aria-hidden="true">01</span>
      </div>
      <h4>Change the season</h4>
      <div
        class="demo-palette-scene"
        style={{ background: colors.sky }}
        aria-label={`${palette} house preview`}
        role="img"
      >
        <div class="demo-ground" style={{ background: colors.grass }} />
        <div class="demo-house">
          <i class="demo-roof" style={{ background: colors.roof }} />
          <i class="demo-window" style={{ background: colors.window }} />
          <i class="demo-door" />
        </div>
      </div>
      <div class="demo-swatches" aria-label={`${palette} colours`}>
        {Object.entries(colors).map(([name, color]) => (
          <span key={name}>
            <i style={{ background: color }} aria-hidden="true" />
            <span>
              {name}
              <code>{color}</code>
            </span>
          </span>
        ))}
      </div>
      <div class="demo-options" aria-label="Palette">
        {(Object.keys(palettes) as (keyof typeof palettes)[]).map((name) => (
          <button
            type="button"
            key={name}
            aria-pressed={palette === name}
            onClick={() => setPalette(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}
