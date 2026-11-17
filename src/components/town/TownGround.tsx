import TownDefs from "./TownDefs";
import { MAP_VIEW_BOX } from "./world";

export default function TownGround() {
  return (
    <svg
      class="town-map"
      viewBox={MAP_VIEW_BOX}
      width="100%"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
    >
      <TownDefs />
      <rect width="960" height="640" fill="url(#town-snow)" />
      <path
        d="M828 0h132v640H818V530h-18V425h12V300h-12V180h28z"
        fill="var(--snow-edge)"
      />
      <path
        d="M844 0h116v640H834V530h-18V425h12V300h-12V180h28z"
        fill="url(#town-water)"
      />
      <path
        d="M844 0v180h-28v120h12v125h-12v105h18v110"
        fill="none"
        stroke="var(--water-edge)"
        stroke-width="5"
      />
      <g class="town-ripples" fill="var(--water-lit)">
        <path d="M876 98h27v3h-27z M902 185h33v3h-33z M871 270h22v3h-22z M900 485h26v3h-26z M868 570h33v3h-33z" />
      </g>
      <path
        d="M842 0h14v30h6v40h-8v36h10v40h-6v34h-16z M814 180h44v6h-18v30h8v44h-10v40h-24z M826 300h18v40h-6v85h-12z M814 425h24v30h10v40h-8v35h-26z M832 530h14v40h8v40h-6v30h-16z"
        fill="var(--ice)"
      />
      <path
        d="M846 8h6v14h-6z M848 112h10v6h-10z M820 196h14v5h-14z M824 268h8v20h-8z M820 440h12v5h-12z M826 500h8v16h-8z M838 580h10v6h-10z"
        fill="var(--ice-lit)"
      />
      <g class="town-floes">
        {[0, -640].map((upstream) => (
          <g key={upstream} transform={`translate(0 ${upstream})`}>
            <path
              d="M906 44h20v4h6v8h-22v-4h-4z M880 232h16v4h4v6h-18v-4h-2z M916 330h14v8h-14z M884 520h22v4h4v6h-24v-4h-2z M920 604h16v8h-16z"
              fill="var(--ice)"
            />
            <path
              d="M910 46h10v2h-10z M884 234h8v2h-8z M888 522h12v2h-12z"
              fill="var(--ice-lit)"
            />
          </g>
        ))}
      </g>
      <path
        d="M70 362h890v58H70z M452 60h56v540h-56z M191 270h40v105h-40z M640 250h40v125h-40z M195 411h40v198h-40z M625 410h40v198h-40z M195 582h470v32H195z"
        fill="var(--snow-edge)"
      />
      <path
        d="M70 368h890v46H70z M458 60h44v540h-44z M197 270h28v105h-28z M646 250h28v125h-28z M201 411h28v192h-28z M631 410h28v192h-28z M201 588h458v20H201z"
        fill="url(#town-path)"
      />
      <path
        class="town-deep"
        d="M70 368h60v8h-22v6H70z M290 400h70v14h-40v-6h-30z M458 60h20v40h-8v30h-12z M486 180h16v60h-8v-30h-8z M458 470h14v50h-6v40h-8z M560 368h60v6h-30v8h-30z M700 398h80v16h-50v-8h-30z M201 430h12v60h-6v40h-6z M646 250h12v50h-12z M300 588h80v8h-50v6h-30z M520 598h90v10h-90z"
        fill="var(--snow)"
      />
      <g data-town-square="true">
        <path
          d="M432 330h156v12h12v96h-12v12H432v-12h-12v-96h12z"
          fill="var(--paving-edge)"
        />
        <path
          d="M438 336h144v12h12v84h-12v12H438v-12h-12v-84h12z"
          fill="url(#town-paving)"
        />
        <path
          d="M458 330h44v120h-44z M420 368h180v46H420z"
          fill="var(--paving)"
        />
        <path
          d="M438 336h14v4h-8v8h-6z M582 336v12h-6v-8h-8v-4z M438 444v-12h6v8h8v4z M582 444h-14v-4h8v-8h6z"
          fill="var(--snow)"
        />
        <path
          d="M480 362l28 28-28 28-28-28z"
          fill="var(--paving-line)"
          stroke="var(--paving-lit)"
          stroke-width="3"
        />
        <path
          d="M480 366l6 18 18 6-18 6-6 18-6-18-18-6 18-6z"
          fill="var(--compass)"
        />
        <path
          d="M480 366v24h-24l18-6z M480 390h24l-18 6-6 18z"
          fill="var(--compass-lit)"
        />
        <rect x="477" y="387" width="6" height="6" fill="var(--berry)" />
        <path
          d="M436 386h-6v-4l-8 8 8 8v-4h6z M586 386h6v-4l8 8-8 8v-4h-6z M476 342v-6h-4l8-8 8 8h-4v6z M476 438v6h-4l8 8 8-8h-4v-6z"
          fill="var(--paving-edge)"
        />
      </g>
      <g fill="var(--paving-lit)">
        <path d="M193 288h36v6h-36z M193 305h36v4h-36z M193 321h36v4h-36z" />
        <path d="M642 269h36v6h-36z M642 286h36v4h-36z M642 302h36v4h-36z" />
        <path d="M194 577h42v6h-42z M198 594h34v4h-34z M624 577h42v6h-42z M628 594h34v4h-34z" />
      </g>
      <path d="M805 365h155v53H805z" fill="var(--wood-dark)" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={`bridge-${i}`}>
          <rect
            x={809 + i * 16}
            y="369"
            width="12"
            height="44"
            fill="var(--wood-lit)"
          />
          <path
            d={`M${809 + i * 16} 369h12v${i % 3 ? 4 : 7}h-12z M${809 + i * 16} ${i % 2 ? 408 : 406}h12v${i % 2 ? 5 : 7}h-12z`}
            fill="var(--cap)"
          />
        </g>
      ))}
      <path
        d="M330 292h57v9h20v39h-15v12h-65v-9h-15v-36h18z"
        fill="var(--snow-edge)"
      />
      <path
        d="M336 298h47v9h18v27h-15v12h-55v-9h-13v-24h18z"
        fill="url(#town-ice)"
      />
      <path
        d="M336 298h47v3h-47z M318 313h18v3h-18z M318 316h3v21h-3z M331 337h3v9h-3z"
        fill="var(--ice-mark)"
      />
      <path
        d="M345 309h20v3h-20z M370 330h19v3h-19z"
        fill="var(--ice-lit)"
        class="town-ripples"
      />
      <path
        d="M325 322h2v9h-2z M329 325h2v6h-2z M383 303h2v9h-2z M387 306h2v6h-2z"
        fill="var(--wood-lit)"
      />
      <g class="town-glow" fill="var(--glow)">
        {[
          [147, 278],
          [249, 278],
          [608, 258],
          [686, 258],
          [144, 568],
          [258, 568],
          [587, 568],
          [674, 568],
        ].map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y}h29v6h5v8h5v8H${x - 10}v-8h5v-8h5z`}
          />
        ))}
      </g>
      <g opacity=".22" fill="var(--shadow)">
        <rect x="124" y="267" width="183" height="20" />
        <rect x="594" y="250" width="145" height="20" />
        <rect x="124" y="558" width="194" height="21" />
        <rect x="574" y="558" width="155" height="21" />
      </g>
      <path
        d="M0 0h960v640H0z"
        fill="none"
        stroke="var(--frame)"
        stroke-width="8"
      />
    </svg>
  );
}
