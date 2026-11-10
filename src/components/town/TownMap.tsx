import type { ComponentChildren } from "preact";
import { useTownCat } from "./useTownCat";
import { useTrail } from "./useTrail";
import { trees, fences, type Point } from "./world";

export default function TownMap({
  player,
  destination,
}: {
  player?: Point;
  destination?: string;
}) {
  const cat = useTownCat();
  const near = (x: number, y: number, distance = 68) =>
    player !== undefined && Math.hypot(player.x - x, player.y - y) < distance;
  const catAlert = near(cat.position.x + 13, cat.position.y + 26, 75);
  const pawprints = useTrail(
    { x: cat.position.x + 11, y: cat.position.y + 27 },
    6,
    9,
  );
  return (
    <>
      {" "}
      <svg
        class="town-map"
        viewBox="0 0 960 640"
        width="100%"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        shape-rendering="crispEdges"
      >
        <defs>
          <pattern
            id="town-snow"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <rect width="48" height="48" fill="var(--snow)" />
            <path
              d="M7 12h7v2H7z M30 36h9v2h-9z M37 9h4v2h-4z M14 30h4v2h-4z"
              fill="var(--snow-dim)"
            />
            <path d="M22 21h2v2h-2z M42 26h2v2h-2z" fill="var(--snow-lit)" />
          </pattern>
          <pattern
            id="town-path"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="24" fill="var(--path)" />
            <path d="M4 8h3v2H4z M16 19h4v2h-4z" fill="var(--path-mark)" />
            <path d="M12 3h4v2h-4z M2 17h3v2H2z" fill="var(--snow)" />
          </pattern>
          <pattern
            id="town-paving"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="24" fill="var(--paving)" />
            <path d="M0 0h24v2H0z M0 0h2v24H0z" fill="var(--paving-line)" />
            <path d="M3 3h18v2H3z M3 5h2v16H3z" fill="var(--paving-lit)" />
          </pattern>
          <pattern
            id="town-water"
            width="64"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <rect width="64" height="32" fill="var(--water)" />
            <path d="M8 8h20v3H8z M40 23h18v3H40z" fill="var(--water-lit)" />
            <path d="M0 16h12v3H0z M34 4h12v2H34z" fill="var(--water-deep)" />
          </pattern>
          <pattern
            id="town-ice"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <rect width="32" height="32" fill="var(--ice)" />
            <path
              d="M4 7h6v2H4z M10 9h6v2h-6z M16 11h4v2h-4z"
              fill="var(--ice-lit)"
            />
            <path d="M20 23h8v2h-8z M3 26h4v2H3z" fill="var(--ice-mark)" />
          </pattern>
          <pattern
            id="town-roof"
            width="24"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="14" fill="var(--red)" />
            <path d="M0 12h24v2H0z M11 0h2v12h-2z" fill="var(--red-dark)" />
            <path d="M1 1h10v2H1z" fill="var(--red-lit)" />
          </pattern>
          <pattern
            id="town-blue-roof"
            width="24"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="14" fill="var(--blue)" />
            <path d="M0 12h24v2H0z M11 0h2v12h-2z" fill="var(--blue-dark)" />
            <path d="M1 1h10v2H1z" fill="var(--blue-lit)" />
          </pattern>
          <g id="town-tree">
            <ellipse
              cx="29"
              cy="60"
              rx="25"
              ry="6"
              fill="var(--shadow)"
              opacity=".22"
            />
            <path d="M24 50h10v13H24z" fill="var(--trunk)" />
            <path d="M27 51h3v11h-3z" fill="var(--trunk-lit)" />
            <path
              d="M1 56h56v-6h-4v-6h-5v-5h-5v-4H15v4h-5v5H5v6H1z"
              fill="var(--pine-dark)"
            />
            <path
              d="M4 53h50v-3h-4v-6h-5v-5h-5v-2H18v2h-5v5H8v6H4z"
              fill="var(--pine)"
            />
            <path
              d="M7 49h9v2H7z M21 51h7v2h-7z M12 44h5v2h-5z"
              fill="var(--pine-lit)"
            />
            <path
              d="M15 35h28v4h5v5h4v2h-7v-2h-6v3h-7v-3h-6v3h-7v-3h-5v2H6v-2h4v-5h5z"
              fill="var(--cap)"
            />
            <path d="M41 41h5v3h-5z M33 44h6v2h-6z" fill="var(--cap-dim)" />
            <path
              d="M6 40h46v-5h-5v-5h-5v-5h-4v-4H20v4h-4v5h-5v5H6z"
              fill="var(--pine-dark)"
            />
            <path
              d="M9 38h40v-3h-5v-5h-5v-5h-4v-2H23v2h-4v5h-5v5H9z"
              fill="var(--pine)"
            />
            <path d="M12 34h8v2h-8z M25 36h6v2h-6z" fill="var(--pine-lit)" />
            <path
              d="M20 21h18v4h4v5h4v2h-6v-2h-6v3h-6v-3h-6v3h-6v-2h-4v-1h4v-5h4z"
              fill="var(--cap)"
            />
            <path d="M37 27h4v3h-4z M30 30h5v2h-5z" fill="var(--cap-dim)" />
            <path
              d="M12 26h34v-5h-4v-5h-4v-5h-3V6h-3V1h-4v5h-3v5h-3v5h-4v5h-4z"
              fill="var(--pine-dark)"
            />
            <path
              d="M15 24h28v-3h-4v-5h-4v-5h-3V6h-6v5h-3v5h-4v5h-4z"
              fill="var(--pine)"
            />
            <path d="M18 20h7v2h-7z" fill="var(--pine-lit)" />
            <path
              d="M27 1h4v5h3v5h3v4h-4v-2h-4v3h-5v-2h-3v-3h3V6h3z"
              fill="var(--cap)"
            />
            <path d="M31 8h2v5h-2z" fill="var(--cap-dim)" />
          </g>
          <g id="town-shrub">
            <path d="M2 6h10v2h2v7H0V8h2z" fill="var(--pine-dark)" />
            <path d="M2 9h10v4H2z" fill="var(--pine)" />
            <path d="M3 3h8v2h2v5h-3v2H7v-2H4v2H1V5h2z" fill="var(--cap)" />
            <path d="M4 12h2v2H4z M9 12h2v2H9z" fill="var(--berry)" />
          </g>
          <g id="town-window">
            <rect width="29" height="32" fill="var(--wood-dark)" />
            <rect x="3" y="3" width="23" height="23" fill="var(--glass)" />
            <path d="M5 5h8v8H5z M16 5h8v8h-8z" fill="var(--glass-lit)" />
            <path d="M13 3h3v24h-3z M3 13h23v3H3z" fill="var(--sash)" />
            <rect x="-3" y="28" width="35" height="5" fill="var(--sill)" />
            <path
              d="M-3 26h35v3H-3z M3 23h7v3H3z M20 24h6v2h-6z"
              fill="var(--cap)"
            />
          </g>
          <g id="town-fence">
            <path d="M0 9h64v5H0z M0 23h64v5H0z" fill="var(--wood)" />
            <path
              d="M3 3h7v33H3z M28 3h7v33h-7z M53 3h7v33h-7z"
              fill="var(--wood-lit)"
            />
            <path
              d="M3 33h7v3H3z M28 33h7v3h-7z M53 33h7v3h-7z"
              fill="var(--wood-dark)"
            />
            <path
              d="M2 0h9v4H2z M27 0h9v4h-9z M52 0h9v4h-9z M11 7h16v2H11z M36 7h16v2H36z M11 21h16v2H11z M36 21h16v2H36z"
              fill="var(--cap)"
            />
          </g>
        </defs>
        <style>{`
        .town-map { display:block; }
        .town-smoke { animation: town-smoke 5s steps(5) infinite; }
        .town-smoke-late { animation-delay:-2.5s; }
        .town-ripples { animation: town-ripples 3s steps(3) infinite; }
        .town-cat-tail { transform-box:fill-box; transform-origin:bottom left; animation:town-tail 3s steps(2) infinite; }
        .town-glow { opacity:var(--glow-o,0); }
        .town-deep { display:var(--deep-snow,none); }
        .town-floes { animation: town-floes 96s steps(160) infinite; }
        .town-snow-slide { opacity:0; animation: town-snow-slide 34s steps(40) infinite; }
        .town-snow-slide-late { animation-delay:-19s; }
        :root[data-light="night"] .town-flicker { animation: town-flicker 5s steps(1) infinite; }
        :root[data-light="night"] .town-flicker-late { animation-delay:-2.2s; }
        @keyframes town-floes { to {transform:translateY(640px)} }
        @keyframes town-snow-slide { 0%,92% {transform:translateY(0);opacity:0} 93% {transform:translateY(0);opacity:1} 99% {transform:translateY(78px);opacity:1} 100% {transform:translateY(78px);opacity:0} }
        @keyframes town-flicker { 0%,100% {opacity:var(--glow-o,0)} 46% {opacity:calc(var(--glow-o,0)*.72)} 52% {opacity:var(--glow-o,0)} 81% {opacity:calc(var(--glow-o,0)*.82)} 86% {opacity:var(--glow-o,0)} }
        @keyframes town-smoke { 0% {transform:translateY(0);opacity:0} 20% {opacity:.65} 100% {transform:translate(8px,-32px);opacity:0} }
        @keyframes town-ripples { 50% {transform:translateX(5px);opacity:.5} }
        @keyframes town-tail { 50% {transform:rotate(-18deg)} }
        @media (prefers-reduced-motion:reduce) { .town-smoke,.town-ripples,.town-cat-tail,.town-floes,.town-snow-slide,:root[data-light="night"] .town-flicker {animation:none;} }
      `}</style>
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
      <TownObject
        name="workshop"
        highlighted={destination === "workshop"}
        depth={285}
      >
        <g>
          <rect x="128" y="178" width="164" height="98" fill="var(--wall)" />
          <path d="M128 251h164v25H128z" fill="var(--wall-base)" />
          <path d="M128 248h164v4H128z" fill="var(--wall-lit)" />
          <path d="M111 183l23-57h153l23 57v10H111z" fill="var(--red-eave)" />
          <path d="M117 181l22-49h143l22 49z" fill="url(#town-roof)" />
          <RoofSnow ridge={[134, 287, 126]} eave={[111, 310, 183]} drop={10} />
          <rect
            x="253"
            y="117"
            width="19"
            height="35"
            fill="var(--wood-dark)"
          />
          <rect x="249" y="112" width="27" height="9" fill="var(--wood)" />
          <path d="M248 108h29v5h-29z M253 150h19v4h-19z" fill="var(--cap)" />
          <g class="town-smoke" fill="var(--smoke)">
            <rect x="254" y="96" width="13" height="10" />
            <rect x="249" y="87" width="17" height="8" />
          </g>
          <g class="town-smoke town-smoke-late" fill="var(--smoke)">
            <rect x="254" y="96" width="13" height="10" />
            <rect x="249" y="87" width="17" height="8" />
          </g>
          <use href="#town-window" x="147" y="208" />
          <use href="#town-window" x="249" y="208" />
          <rect
            x="193"
            y="216"
            width="34"
            height="60"
            fill="var(--wood-dark)"
          />
          <rect x="198" y="222" width="24" height="49" fill="var(--wood)" />
          <rect x="214" y="246" width="4" height="4" fill="var(--brass)" />
          <path d="M188 276h44v6h-44z" fill="var(--paving-lit)" />
          <rect x="185" y="192" width="50" height="16" fill="var(--wall-lit)" />
          <path d="M197 199h26v3h-26z" fill="var(--wood)" />
          <path
            d="M145 250h31v5h-31z M148 255h4v14h-4z M169 255h4v14h-4z"
            fill="var(--wood-dark)"
          />
          <path
            d="M148 246h9v4h-9z M163 242h3v8h-3z M167 245h6v3h-6z"
            fill="var(--metal-dark)"
          />
          <path d="M282 248h22v28h-22z" fill="var(--wood-dark)" />
          <path d="M285 251h16v3h-16z M285 268h16v3h-16z" fill="var(--wood)" />
          <path d="M281 244h24v5h-24z M157 248h6v2h-6z" fill="var(--cap)" />
          <WallLantern x={234} y={220} />
          <path
            class="town-snow-slide"
            d="M262 190h14v5h-14z M266 195h8v3h-8z"
            fill="var(--cap)"
          />
        </g>
        <g fill="var(--ink)">
          <path d="M192 197h12v3h-12z M196 195h4v9h-4z M212 195h4v9h-4z M219 195h4v9h-4z M215 201h5v3h-5z" />
        </g>
      </TownObject>
      <TownObject name="home" highlighted={destination === "home"} depth={265}>
        <g>
          <rect x="596" y="173" width="128" height="83" fill="var(--wall)" />
          <rect
            x="596"
            y="241"
            width="128"
            height="15"
            fill="var(--wall-base)"
          />
          <path d="M581 175l22-60h114l22 60v9H581z" fill="var(--blue-eave)" />
          <path d="M587 174l20-53h106l20 53z" fill="url(#town-blue-roof)" />
          <RoofSnow ridge={[603, 717, 115]} eave={[581, 739, 175]} drop={9} />
          <use href="#town-window" x="608" y="198" />
          <use href="#town-window" x="686" y="198" />
          <rect
            x="646"
            y="205"
            width="28"
            height="51"
            fill="var(--wood-dark)"
          />
          <rect x="650" y="210" width="20" height="42" fill="var(--wood-lit)" />
          <rect x="663" y="231" width="3" height="4" fill="var(--brass)" />
          <rect
            x="641"
            y="256"
            width="38"
            height="7"
            fill="var(--paving-lit)"
          />
          <path
            d="M638 199h44v5h-44z M638 204h4v52h-4z M678 204h4v52h-4z"
            fill="var(--wall-base)"
          />
          <path d="M636 196h48v4h-48z" fill="var(--cap)" />
          <path d="M605 233h35v7h-35z M683 233h35v7h-35z" fill="var(--wood)" />
          <path
            d="M606 230h33v3h-33z M612 227h9v3h-9z M627 228h8v2h-8z M684 230h33v3h-33z M689 228h8v2h-8z M702 227h10v3h-10z"
            fill="var(--cap)"
          />
          <path
            d="M609 228h3v3h-3z M623 228h3v3h-3z M699 228h3v3h-3z M713 228h3v3h-3z"
            fill="var(--berry)"
          />
        </g>
        <g fill="var(--ink)">
          <path d="M649 188h3v8h-7v-3h4z M657 188h3v6h3v-6h3v8h-9z" />
        </g>
      </TownObject>
      <TownObject
        name="station"
        highlighted={destination === "station"}
        depth={575}
      >
        <g>
          <rect x="126" y="490" width="178" height="76" fill="var(--wall)" />
          <rect
            x="126"
            y="552"
            width="178"
            height="14"
            fill="var(--wall-base)"
          />
          <path d="M112 492l19-47h167l19 47v9H112z" fill="var(--blue-eave)" />
          <path d="M118 491l17-40h159l17 40z" fill="url(#town-blue-roof)" />
          <RoofSnow ridge={[131, 298, 445]} eave={[112, 317, 492]} drop={9} />
          <use href="#town-window" x="144" y="515" />
          <use href="#town-window" x="258" y="515" />
          <rect
            x="197"
            y="513"
            width="36"
            height="53"
            fill="var(--metal-dark)"
          />
          <rect x="202" y="518" width="26" height="48" fill="var(--metal)" />
          <path d="M214 519h3v47h-3z" fill="var(--metal-dark)" />
          <path
            d="M136 557h49v3h-49z M245 557h49v3h-49z"
            fill="var(--metal-dark)"
          />
          <path
            d="M139 553h4v11h-4z M151 553h4v11h-4z M163 553h4v11h-4z M175 553h4v11h-4z M248 553h4v11h-4z M260 553h4v11h-4z M272 553h4v11h-4z M284 553h4v11h-4z"
            fill="var(--wood)"
          />
          <rect
            x="190"
            y="566"
            width="50"
            height="7"
            fill="var(--paving-lit)"
          />
          <rect x="199" y="462" width="32" height="29" fill="var(--wall)" />
          <rect x="204" y="466" width="22" height="21" fill="var(--wall-lit)" />
          <path d="M214 470h3v8h6v3h-9z" fill="var(--ink)" />
          <path d="M197 458h36v5h-36z" fill="var(--cap)" />
          <WallLantern x={186} y={518} />
          <WallLantern x={238} y={518} />
        </g>
        <path d="M133 503h164v6H133z" fill="var(--brass)" />
        <path d="M133 505h164v3H133z" fill="var(--blue)" />
      </TownObject>
      <TownObject name="post" highlighted={destination === "post"} depth={575}>
        <g>
          <rect x="576" y="496" width="138" height="70" fill="var(--wall)" />
          <rect
            x="576"
            y="551"
            width="138"
            height="15"
            fill="var(--wall-base)"
          />
          <path d="M561 497l18-52h132l18 52v9H561z" fill="var(--red-eave)" />
          <path d="M567 495l17-44h122l17 44z" fill="url(#town-roof)" />
          <RoofSnow ridge={[579, 711, 445]} eave={[561, 729, 497]} drop={9} />
          <use href="#town-window" x="587" y="516" />
          <use href="#town-window" x="674" y="516" />
          <rect
            x="630"
            y="516"
            width="30"
            height="50"
            fill="var(--wood-dark)"
          />
          <rect x="635" y="521" width="20" height="41" fill="var(--wood)" />
          <rect x="648" y="542" width="4" height="4" fill="var(--brass)" />
          <rect
            x="625"
            y="566"
            width="40"
            height="7"
            fill="var(--paving-lit)"
          />
          <rect x="627" y="475" width="37" height="23" fill="var(--wall-lit)" />
          <path d="M632 480h27v13h-27z" fill="var(--red)" />
          <path
            d="M633 481l12 8 13-8"
            fill="none"
            stroke="var(--wall-lit)"
            stroke-width="2"
          />
          <path d="M625 471h41v5h-41z" fill="var(--cap)" />
          <rect x="731" y="529" width="5" height="34" fill="var(--wood-dark)" />
          <path d="M722 515h23v24h-23z" fill="var(--red)" />
          <path d="M726 520h15v4h-15z" fill="var(--red-eave)" />
          <path d="M720 511h27v5h-27z" fill="var(--cap)" />
          <path
            class="town-snow-slide town-snow-slide-late"
            d="M596 504h14v5h-14z M599 509h8v3h-8z"
            fill="var(--cap)"
          />
          <WallLantern x={620} y={520} />
          <WallLantern x={664} y={520} />
        </g>
        <path d="M576 547h138v4H576z" fill="var(--red)" />
      </TownObject>
      {[
        { x: 193, y: 216, w: 34, h: 60, footX: 210, footY: 300 },
        { x: 646, y: 205, w: 28, h: 51, footX: 660, footY: 280 },
        { x: 197, y: 513, w: 36, h: 53, footX: 215, footY: 595 },
        { x: 630, y: 516, w: 30, h: 50, footX: 645, footY: 595 },
      ].map(
        ({ x, y, w, h, footX, footY }) =>
          near(footX, footY) && (
            <TownObject
              key={x}
              name="door"
              depth={footY - (footY > 500 ? 20 : 15)}
            >
              <g class="town-open-door">
                <rect
                  x={x + 3}
                  y={y + 4}
                  width={w - 6}
                  height={h - 4}
                  fill="var(--door-dark)"
                />
                <path
                  d={`M${x + 3} ${y + 4}l8 5v${h - 12}l-8 3z`}
                  fill="var(--wood-lit)"
                />
                <rect
                  x={x + 11}
                  y={y + h - 3}
                  width={w - 14}
                  height="3"
                  fill="var(--glow)"
                />
              </g>
            </TownObject>
          ),
      )}
      {fences.map(([x, y]) => (
        <TownObject key={`fence-${x}-${y}`} name="fence" depth={y + 36}>
          <use href="#town-fence" x={x} y={y} />
        </TownObject>
      ))}
      {[
        [186, 340],
        [242, 340],
        [645, 324],
        [682, 324],
      ].map(([x, y]) => (
        <TownObject key={`lamp-${x}`} name="lamp" depth={y + 1}>
          <path
            class="town-glow"
            d={`M${x - 16} ${y - 8}h32v4h8v8h-8v4h-32v-4h-8v-8h8z`}
            fill="var(--glow)"
          />
          <path
            class={`town-glow town-flicker ${x % 2 ? "town-flicker-late" : ""}`}
            d={`M${x - 9} ${y - 57}h18v5h6v18h-6v5h-18v-5h-6v-18h6z`}
            fill="var(--glow)"
          />
          <path
            d={`M${x - 2} ${y - 36}h4v34h-4z M${x - 4} ${y - 3}h8v3h-8z M${x - 5} ${y - 50}h10v14h-10z M${x - 6} ${y - 52}h12v3h-12z`}
            fill="var(--iron)"
          />
          <path d={`M${x - 3} ${y - 48}h6v10h-6z`} fill="var(--lamp)" />
          <path d={`M${x - 6} ${y - 55}h12v3h-12z`} fill="var(--cap)" />
        </TownObject>
      ))}
      <TownObject name="noticeboard" depth={479}>
        <g>
          <rect x="93" y="429" width="8" height="50" fill="var(--wood-dark)" />
          <rect x="72" y="428" width="50" height="25" fill="var(--wood)" />
          <rect x="76" y="432" width="42" height="17" fill="var(--wall-lit)" />
          <path d="M84 439h26v3H84z" fill="var(--ink)" />
          <path d="M70 424h54v5H70z" fill="var(--cap)" />
        </g>
      </TownObject>
      <TownObject name="trellis" depth={222}>
        <g fill="var(--wood)">
          <path d="M551 195h20v5h-20z M551 209h20v5h-20z" />
          <path d="M554 194h4v28h-4z M565 194h4v28h-4z" />
        </g>
        <path d="M550 192h22v3h-22z M558 207h7v2h-7z" fill="var(--cap)" />
      </TownObject>
      <TownObject name="snowman" depth={307}>
        <ellipse
          cx="321"
          cy="305"
          rx="12"
          ry="4"
          fill="var(--shadow)"
          opacity=".22"
        />
        <path d="M313 291h16v3h2v9h-2v3h-16v-3h-2v-9h2z" fill="var(--cap)" />
        <path d="M325 294h4v9h-4z M315 303h10v3h-10z" fill="var(--cap-dim)" />
        <path d="M316 279h10v2h2v9h-2v2h-10v-2h-2v-9h2z" fill="var(--cap)" />
        <path d="M324 282h2v8h-2z" fill="var(--cap-dim)" />
        <path
          d="M317 284h2v2h-2z M322 284h2v2h-2z M320 295h2v2h-2z M320 299h2v2h-2z"
          fill="var(--iron)"
        />
        <path d="M319 287h5v2h-5z" fill="var(--brass)" />
        <path d="M314 290h14v3h-14z M325 293h3v5h-3z" fill="var(--berry)" />
        <path d="M307 292h6v2h-6z M329 290h6v2h-6z" fill="var(--trunk)" />
      </TownObject>
      <svg
        class="town-prints"
        data-trail="cat"
        viewBox="0 0 960 640"
        aria-hidden="true"
        shape-rendering="crispEdges"
      >
        {pawprints.map(({ id, x, y, age, left }) => (
          <rect
            key={id}
            x={Math.round(x)}
            y={Math.round(y + (left ? -2 : 1))}
            width="2"
            height="2"
            opacity={1 - age / 9}
          />
        ))}
      </svg>
      {trees.map(([x, y]) => (
        <TownObject key={`tree-${x}-${y}`} name="tree" depth={y + 63}>
          <use href="#town-tree" x={x} y={y} />
        </TownObject>
      ))}
      {[
        [108, 238],
        [98, 252],
        [108, 268],
        [304, 304],
        [315, 318],
        [304, 330],
        [552, 267],
        [563, 279],
        [551, 291],
        [750, 475],
        [765, 486],
        [748, 503],
        [393, 85],
        [405, 101],
        [390, 113],
        [325, 427],
        [336, 439],
        [323, 451],
        [542, 554],
        [554, 565],
      ].map(([x, y], i) => (
        <TownObject key={`shrub-${i}`} name="shrub" depth={y + 15}>
          <use href="#town-shrub" x={x} y={y} />
        </TownObject>
      ))}
      <TownObject name="cat" depth={cat.position.y + 26}>
        <g
          transform={`translate(${cat.position.x} ${cat.position.y})`}
          data-cat-alert={catAlert}
          data-cat-walking={cat.walking}
        >
          <ellipse
            cx="13"
            cy="26"
            rx="16"
            ry="5"
            fill="var(--shadow)"
            opacity=".3"
          />
          <path
            d="M4 8h15v15H4z M1 20h6v7H1z M16 20h6v7h-6z"
            fill="var(--cat)"
          />
          <path d="M2 0h5v5h9V0h5v15H2z" fill="var(--cat-head)" />
          <path
            d={
              catAlert || cat.walking
                ? "M5 7h3v4H5z M15 7h3v4h-3z"
                : "M4 9h5v2H4z M14 9h5v2h-5z"
            }
            fill="#574e3c"
          />
          {catAlert && <path d="M10-15h4v8h-4z M10-4h4v3h-4z" fill="#faf0c8" />}
          <path
            d="M20 18h7v-9h5v15H20z"
            fill="var(--cat-tail)"
            class="town-cat-tail"
          />
        </g>
      </TownObject>
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

function RoofSnow({
  ridge: [ridgeLeft, ridgeRight, ridgeY],
  eave: [eaveLeft, eaveRight, eaveY],
  drop,
}: {
  ridge: [number, number, number];
  eave: [number, number, number];
  drop: number;
}) {
  const slope = (ridgeLeft - eaveLeft) / (eaveY - ridgeY);
  const cap = (bottom: number) => {
    const reach = Math.round(slope * (bottom - ridgeY));
    const left = ridgeLeft - reach;
    let d = `M${ridgeLeft - 2} ${ridgeY - 4}H${ridgeRight + 2}L${ridgeRight + reach} ${bottom}`;
    let low = false;
    for (let x = ridgeRight + reach, i = 0; x > left; i++) {
      x = Math.max(left, x - [13, 9, 15, 8, 12][i % 5]);
      d += `H${x}`;
      if (x > left) {
        d += low ? "v-5" : "v5";
        low = !low;
      }
    }
    return `${d}${low ? "v-5" : ""}Z`;
  };
  const snowline = Math.round(ridgeY + (eaveY - ridgeY) * 0.5);
  const deepSnowline = Math.round(ridgeY + (eaveY - ridgeY) * 0.8);
  const icicles = Array.from(
    { length: Math.floor((eaveRight - eaveLeft - 16) / 23) },
    (_, i) => [eaveLeft + 9 + i * 23 + ((i * 7) % 9), 3 + ((i * 5) % 6)],
  ).filter(([x]) => Math.abs(x - (eaveLeft + eaveRight) / 2) > 34);
  return (
    <>
      <path d={cap(snowline + 3)} fill="var(--cap-dim)" />
      <path d={cap(snowline)} fill="var(--cap)" />
      <g class="town-deep">
        <path d={cap(deepSnowline + 3)} fill="var(--cap-dim)" />
        <path d={cap(deepSnowline)} fill="var(--cap)" />
        <path
          d={`M${eaveLeft + 14} ${eaveY + 85}h${eaveRight - eaveLeft - 28}v8h-${eaveRight - eaveLeft - 28}z`}
          fill="var(--snow-dim)"
        />
      </g>
      <path
        d={`M${eaveLeft + 1} ${eaveY - 4}h${eaveRight - eaveLeft - 2}v5h-${eaveRight - eaveLeft - 2}z`}
        fill="var(--cap)"
      />
      <path
        d={icicles.map(([x, h]) => `M${x} ${eaveY + drop}h2v${h}h-2z`).join("")}
        fill="var(--ice-lit)"
      />
    </>
  );
}

function WallLantern({ x, y }: { x: number; y: number }) {
  return (
    <>
      <path
        class="town-glow"
        d={`M${x - 4} ${y - 6}h14v4h4v14h-4v4h-14v-4h-4v-14h4z`}
        fill="var(--glow)"
      />
      <path
        d={`M${x} ${y}h6v9h-6z M${x - 1} ${y - 2}h8v2h-8z`}
        fill="var(--iron)"
      />
      <path d={`M${x + 1} ${y + 1}h4v6h-4z`} fill="var(--lamp)" />
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

function TownObject({
  name,
  depth,
  children,
  highlighted = false,
}: {
  highlighted?: boolean;
  name: string;
  depth: number;
  children: ComponentChildren;
}) {
  return (
    <svg
      class={`town-object ${highlighted ? "is-destination" : ""}`}
      data-scenery={name}
      style={{ zIndex: Math.floor(depth) }}
      viewBox="0 0 960 640"
      aria-hidden="true"
      shape-rendering="crispEdges"
    >
      {children}
    </svg>
  );
}
