import { Window } from "./InteriorFurniture";

function Shelf({ x }: { x: number }) {
  return (
    <g transform={`translate(${x - 66} 192)`}>
      <path d="M-6 132h146v10H-6z" fill="#584b38" opacity=".2" />
      <path d="M0 0h132v138H0z" fill="#745a3f" />
      <path d="M8 8h116v120H8z" fill="#9d805b" />
      {[0, 1, 2].map((row) => (
        <g key={row} transform={`translate(12 ${12 + row * 40})`}>
          <path
            d="M0 4h13v28H0z M46 0h11v32H46z M88 7h15v25H88z"
            fill="#718a6c"
          />
          <path d="M17 0h12v32H17z M62 5h10v27H62z" fill="#b36d51" />
          <path d="M33 8h9v24h-9z M76 0h8v32h-8z" fill="#dfc690" />
          <path d="M-7 32h122v8H-7z" fill="#c39c68" />
          <path d="M28 32h53v8H28z" fill="#e3d3a7" />
          <text
            x="54"
            y="38"
            text-anchor="middle"
            fill="#4d594a"
            font-family="monospace"
            font-size="6"
          >
            {["INTERFACES", "TYPESCRIPT", "AGENT TOOLS"][row]}
          </text>
        </g>
      ))}
    </g>
  );
}

export default function HomeInterior() {
  return (
    <>
      <Window x={590} />
      <g transform="translate(395 91)">
        <path d="M0 0h110v64H0z" fill="#746c62" />
        <path d="M6 6h98v52H6z" fill="#e6d7ae" />
        <path
          d="M13 46h83v4H13z M20 29h9v17h-9z M35 19h10v27H35z M59 11h12v35H59z M55 18h20v5H55z M81 32h8v14h-8z"
          fill="#63847e"
        />
        <path d="M63 25h4v4h-4z" fill="#e6d7ae" />
      </g>
      <Shelf x={480} />
      <path d="M386 376h198v148H386z" fill="#495f52" opacity=".35" />
      <path d="M390 380h190v140H390z" fill="#63847e" />
      <path
        d="M390 385h-5v4h5z M390 399h-5v4h5z M390 413h-5v4h5z M580 385h5v4h-5z M580 399h5v4h-5z M580 413h5v4h-5z"
        fill="#b5b58f"
      />
      <path
        d="M401 391h168v118H401z"
        fill="none"
        stroke="#b5b58f"
        strokeWidth="4"
      />
      <g transform="translate(600 361)">
        <path d="M0 0h110v150H0z" fill="#826a4c" />
        <path d="M7 8h96v131H7z" fill="#dcd0a7" />
        <path d="M14 16h82v30H14z" fill="#efdfb8" />
        <path d="M7 55h96v84H7z" fill="#75908b" />
        <path d="M7 63h96v8H7z M7 118h96v8H7z" fill="#a5b49a" />
        <path d="M7 72h5v45H7z M98 72h5v45h-5z" fill="#516e68" />
        <path d="M18 20h74v3H18z" fill="#fff0ca" />
        <path d="M0 146h110v4H0z" fill="#514d38" />
      </g>
      <g transform="translate(250 392)">
        <path d="M0 0h120v98H0z" fill="#665f4b" />
        <path d="M8 6h104v39H8z" fill="#9c9f77" />
        <path d="M8 53h104v30H8z" fill="#b1af85" />
        <path d="M0 44h14v45H0z M106 44h14v45h-14z" fill="#838960" />
        <path d="M20 61h30v5H20z" fill="#d9cda4" />
      </g>
      <g transform="translate(279 409)" data-exhibit-preview="notebook">
        <path d="M0 0h32l8 4 8-4h32v30H48l-8 4-8-4H0z" fill="#eee0b5" />
        <path
          d="M40 4v27 M5 8h24 M5 15h20 M49 8h25 M49 15h20 M49 22h23"
          fill="none"
          stroke="#8e9b79"
          strokeWidth="2"
        />
      </g>
    </>
  );
}
