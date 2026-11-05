import { Window, Plant } from "./InteriorFurniture";

export default function PostInterior() {
  return (
    <>
      <Window x={126} />
      <Window x={741} />
      <g transform="translate(310 83)">
        {Array.from({ length: 12 }, (_, i) => (
          <g
            key={i}
            transform={`translate(${(i % 6) * 57} ${Math.floor(i / 6) * 42})`}
          >
            <path d="M0 0h48v34H0z" fill="#936f50" />
            <path d="M5 5h38v24H5z" fill="#c09a6c" />
            <path d="M14 12h21v4H14z" fill="#ebd8aa" />
          </g>
        ))}
      </g>
      <g data-exhibit-preview="writing-desk">
        <path d="M385 304h190v24H385z" fill="#604e3c" opacity=".25" />
        <path d="M396 246h168v60H396z" fill="#916546" />
        <path d="M388 225h184v28H388z" fill="#d4b37b" />
        <path d="M388 225h184v4H388z" fill="#f2d9a3" />
        <path d="M400 294h12v32h-12z M548 294h12v32h-12z" fill="#775139" />
        <path d="M418 263h124v30H418z" fill="#ad8359" />
        <path d="M474 274h12v4h-12z" fill="#e5cb91" />
        <path d="M437 204h74v36h-74z" fill="#f6e8c0" />
        <path
          d="M440 207l34 22 34-22"
          fill="none"
          stroke="#af8d65"
          strokeWidth="3"
        />
        <path d="M524 208l4 1-9 30-4-1z" fill="#405e50" />
        <path d="M529 187h20v32h-20z" fill="#ac7653" />
        <path d="M535 175h4v20h-4z M542 179h4v17h-4z" fill="#526d5a" />
      </g>
      <g transform="translate(100 422)">
        <path d="M0 0h150v78H0z" fill="#a8875f" />
        <path d="M7 8h136v60H7z" fill="#c4a67a" />
        <path d="M65 8h16v60H65z M7 30h136v13H7z" fill="#e0ca93" />
      </g>
      <Plant x={845} y={520} />
      <path d="M320 370h260v100H320z" fill="#ac7653" />
      <path
        d="M331 381h238v78H331z"
        fill="none"
        stroke="#d9bf89"
        strokeWidth="4"
      />
    </>
  );
}
