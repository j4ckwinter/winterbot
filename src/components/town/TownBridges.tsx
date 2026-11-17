import TownObject from "./TownObject";

export default function TownBridges() {
  return (
    <>
      <TownObject name="bridge-north" depth={370}>
        <path d="M805 357h155v8H805z" fill="var(--wood-lit)" />
        <path
          d="M805 349h7v21h-7z M870 349h7v21h-7z M940 349h7v21h-7z"
          fill="var(--wood-dark)"
        />
        <path
          d="M812 354h58v3h-58z M877 354h63v3h-63z M947 354h13v3h-13z M804 346h9v4h-9z M939 346h9v4h-9z"
          fill="var(--cap)"
        />
        <BridgeLantern x={873} y={349} />
      </TownObject>
      <TownObject name="bridge-south" depth={436}>
        <path d="M805 418h155v8H805z" fill="var(--wood-lit)" />
        <path
          d="M805 416h7v20h-7z M870 416h7v20h-7z M940 416h7v20h-7z"
          fill="var(--wood-dark)"
        />
        <path
          d="M812 415h58v3h-58z M877 415h63v3h-63z M947 415h13v3h-13z M804 413h9v4h-9z M939 413h9v4h-9z"
          fill="var(--cap)"
        />
        <BridgeLantern x={873} y={416} />
      </TownObject>
    </>
  );
}

function BridgeLantern({ x, y }: { x: number; y: number }) {
  return (
    <>
      <path
        class="town-glow"
        d={`M${x - 8} ${y - 20}h17v4h5v14h-5v4h-17v-4h-5v-14h5z`}
        fill="var(--glow)"
      />
      <path
        d={`M${x - 3} ${y - 13}h7v11h-7z M${x - 4} ${y - 15}h9v2h-9z M${x - 1} ${y - 2}h3v2h-3z`}
        fill="var(--iron)"
      />
      <path d={`M${x - 2} ${y - 12}h5v8h-5z`} fill="var(--lamp)" />
      <path d={`M${x - 4} ${y - 18}h9v3h-9z`} fill="var(--cap)" />
    </>
  );
}
