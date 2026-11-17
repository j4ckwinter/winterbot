import { useState } from "preact/hooks";

const palettes = {
  Day: {
    snow: "#edf2f7",
    roof: "#b86347",
    sky: "#cfe0ee",
    window: "#7ba5b4",
  },
  Night: {
    snow: "#8894cc",
    roof: "#8c4c5e",
    sky: "#141c3d",
    window: "#ffc95e",
  },
  "Heavy snow": {
    snow: "#e0e6ed",
    roof: "#aa6a55",
    sky: "#cdd5dd",
    window: "#f3d27f",
  },
};

export default function PaletteDemo() {
  const [palette, setPalette] = useState<keyof typeof palettes>("Day");
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
      <h4>Change the light</h4>
      <div
        class="demo-palette-scene"
        style={{ background: colors.sky }}
        aria-label={`${palette} house preview`}
        role="img"
      >
        <div class="demo-ground" style={{ background: colors.snow }} />
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
