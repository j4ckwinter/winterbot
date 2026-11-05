import type { ComponentChildren } from "preact";
import { useTownCat } from "./useTownCat";
import { trees, fences, TOWN_SIGNPOST, type Point } from "./world";

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
            id="town-grass"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <rect width="48" height="48" fill="#98bc6a" />
            <path
              d="M8 13v-4h3v6h3v-4h3v8H8z M34 35v-4h3v6h3v-4h3v8h-9z"
              fill="#86ac5c"
              opacity=".65"
            />
            <rect x="24" y="8" width="4" height="3" fill="#aecb7b" />
          </pattern>
          <pattern
            id="town-path"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="24" fill="#e8d6a1" />
            <path d="M4 8h3v2H4z M16 19h4v2h-4z" fill="#cdbb8c" />
          </pattern>
          <pattern
            id="town-paving"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="24" fill="#d9cba3" />
            <path d="M0 0h24v2H0z M0 0h2v24H0z" fill="#b8ad88" />
            <path d="M3 3h18v2H3z M3 5h2v16H3z" fill="#ece0b9" />
          </pattern>
          <pattern
            id="town-water"
            width="64"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <rect width="64" height="32" fill="#69acb3" />
            <path d="M8 8h20v3H8z M40 23h18v3H40z" fill="#a4d1c8" />
            <path d="M0 16h12v3H0z M34 4h12v2H34z" fill="#5599a5" />
          </pattern>
          <pattern
            id="town-roof"
            width="24"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="14" fill="#b86347" />
            <path d="M0 12h24v2H0z M11 0h2v12h-2z" fill="#954b3b" />
            <path d="M1 1h10v2H1z" fill="#ce7c54" />
          </pattern>
          <pattern
            id="town-blue-roof"
            width="24"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect width="24" height="14" fill="#658c91" />
            <path d="M0 12h24v2H0z M11 0h2v12h-2z" fill="#466b73" />
            <path d="M1 1h10v2H1z" fill="#80a6a2" />
          </pattern>
          <g id="town-tree">
            <ellipse
              cx="29"
              cy="60"
              rx="27"
              ry="8"
              fill="#55794a"
              opacity=".3"
            />
            <path d="M23 41h13v22H23z" fill="#795f3e" />
            <path d="M27 44h5v17h-5z" fill="#a27b47" />
            <path
              d="M20 0h20v7h9v9h7v24h-7v10H8V40H1V16h8V7h11z"
              fill="#365e45"
            />
            <path
              d="M20 3h18v7h10v11h5v15h-8v8H12v-9H5V19h7V10h8z"
              fill="#527e4e"
            />
            <path d="M21 5h15v7h10v12H34v6H13V18h8z" fill="#73975a" />
            <path
              d="M21 8h12v6H21z M10 28h9v5h-9z M37 34h10v5H37z"
              fill="#88a762"
            />
            <path d="M19 40h16v5H19z" fill="#416b46" />
          </g>
          <g id="town-flower">
            <path d="M4 6h3v9H4z M0 10h4v3H0z" fill="#4f824c" />
            <path d="M3 0h5v3h3v5H8v3H3V8H0V3h3z" fill="#f3e7ac" />
            <rect x="4" y="4" width="3" height="3" fill="#ce8d4d" />
          </g>
          <g id="town-window">
            <rect width="29" height="32" fill="#716347" />
            <rect x="3" y="3" width="23" height="23" fill="#769da0" />
            <path d="M5 5h8v8H5z M16 5h8v8h-8z" fill="#b1cebd" />
            <path d="M13 3h3v24h-3z M3 13h23v3H3z" fill="#e4d5a7" />
            <rect x="-3" y="28" width="35" height="5" fill="#a39165" />
          </g>
          <g id="town-fence">
            <path d="M0 9h64v5H0z M0 23h64v5H0z" fill="#e6d7ad" />
            <path
              d="M3 3h7v33H3z M28 3h7v33h-7z M53 3h7v33h-7z"
              fill="#f2e6c1"
            />
            <path
              d="M3 33h7v3H3z M28 33h7v3h-7z M53 33h7v3h-7z"
              fill="#a59069"
            />
          </g>
        </defs>
        <style>{`
        .town-map { display:block; }
        .town-smoke { animation: town-smoke 5s steps(5) infinite; }
        .town-smoke-late { animation-delay:-2.5s; }
        .town-ripples { animation: town-ripples 3s steps(3) infinite; }
        .town-cat-tail { transform-box:fill-box; transform-origin:bottom left; animation:town-tail 3s steps(2) infinite; }
        @keyframes town-smoke { 0% {transform:translateY(0);opacity:0} 20% {opacity:.65} 100% {transform:translate(8px,-32px);opacity:0} }
        @keyframes town-ripples { 50% {transform:translateX(5px);opacity:.5} }
        @keyframes town-tail { 50% {transform:rotate(-18deg)} }
        @media (prefers-reduced-motion:reduce) { .town-smoke,.town-ripples,.town-cat-tail {animation:none;} }
      `}</style>
        <rect width="960" height="640" fill="url(#town-grass)" />
        <path
          d="M828 0h132v640H818V530h-18V425h12V300h-12V180h28z"
          fill="#d7ce9d"
        />
        <path
          d="M844 0h116v640H834V530h-18V425h12V300h-12V180h28z"
          fill="url(#town-water)"
        />
        <path
          d="M844 0v180h-28v120h12v125h-12v105h18v110"
          fill="none"
          stroke="#4e898a"
          stroke-width="5"
        />
        <g class="town-ripples" fill="#c2e0d0">
          <path d="M866 98h27v3h-27z M902 185h33v3h-33z M851 270h22v3h-22z M900 485h26v3h-26z M858 570h33v3h-33z" />
        </g>
        <path
          d="M70 362h890v58H70z M452 60h56v540h-56z M191 270h40v105h-40z M640 250h40v125h-40z M195 411h40v198h-40z M625 410h40v198h-40z M195 582h470v32H195z"
          fill="#b7a878"
        />
        <path
          d="M70 368h890v46H70z M458 60h44v540h-44z M197 270h28v105h-28z M646 250h28v125h-28z M201 411h28v192h-28z M631 410h28v192h-28z M201 588h458v20H201z"
          fill="url(#town-path)"
        />
        <g data-town-square="true">
          <path
            d="M432 330h156v12h12v96h-12v12H432v-12h-12v-96h12z"
            fill="#a99670"
          />
          <path
            d="M438 336h144v12h12v84h-12v12H438v-12h-12v-84h12z"
            fill="url(#town-paving)"
          />
          <path d="M458 330h44v120h-44z M420 368h180v46H420z" fill="#d9cba3" />
          <path
            d="M480 362l28 28-28 28-28-28z"
            fill="#c0b28a"
            stroke="#f2e4bc"
            stroke-width="3"
          />
          <path
            d="M480 366l6 18 18 6-18 6-6 18-6-18-18-6 18-6z"
            fill="#728066"
          />
          <path
            d="M480 366v24h-24l18-6z M480 390h24l-18 6-6 18z"
            fill="#f4e7bc"
          />
          <rect x="477" y="387" width="6" height="6" fill="#a56846" />
          <path
            d="M436 386h-6v-4l-8 8 8 8v-4h6z M586 386h6v-4l8 8-8 8v-4h-6z M476 342v-6h-4l8-8 8 8h-4v6z M476 438v6h-4l8 8 8-8h-4v-6z"
            fill="#9d8a64"
          />
        </g>
        <g fill="#f1e3b9">
          <path d="M193 288h36v6h-36z M193 305h36v4h-36z M193 321h36v4h-36z" />
          <path d="M642 269h36v6h-36z M642 286h36v4h-36z M642 302h36v4h-36z" />
          <path d="M194 577h42v6h-42z M198 594h34v4h-34z M624 577h42v6h-42z M628 594h34v4h-34z" />
        </g>
        <path d="M805 365h155v53H805z" fill="#8c704b" />
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={`bridge-${i}`}
            x={809 + i * 16}
            y="369"
            width="12"
            height="44"
            fill="#ba9a64"
          />
        ))}
        <path
          d="M330 292h57v9h20v39h-15v12h-65v-9h-15v-36h18z"
          fill="#c4bd87"
        />
        <path
          d="M336 298h47v9h18v27h-15v12h-55v-9h-13v-24h18z"
          fill="url(#town-water)"
        />
        <path
          d="M345 309h20v3h-20z M370 330h19v3h-19z"
          fill="#c1dfc7"
          class="town-ripples"
        />
        <path d="M324 325h11v6h-11z M381 306h12v6h-12z" fill="#688c50" />
        <g opacity=".22" fill="#37573c">
          <rect x="124" y="267" width="183" height="20" />
          <rect x="594" y="250" width="145" height="20" />
          <rect x="124" y="558" width="194" height="21" />
          <rect x="574" y="558" width="155" height="21" />
        </g>
        <path
          d="M0 0h960v640H0z"
          fill="none"
          stroke="#3f6044"
          stroke-width="8"
        />
      </svg>
      <TownObject
        name="workshop"
        highlighted={destination === "workshop"}
        depth={285}
      >
        <g>
          <rect x="128" y="178" width="164" height="98" fill="#e8d9aa" />
          <path d="M128 251h164v25H128z" fill="#bdab7e" />
          <path d="M128 248h164v4H128z" fill="#f4e7bf" />
          <path d="M111 183l23-57h153l23 57v10H111z" fill="#6d4a36" />
          <path d="M117 181l22-49h143l22 49z" fill="url(#town-roof)" />
          <path d="M139 130h143v5H139z" fill="#e59865" />
          <rect x="253" y="117" width="19" height="35" fill="#8e6750" />
          <rect x="249" y="112" width="27" height="9" fill="#b88b64" />
          <g class="town-smoke" fill="#edf0d4">
            <rect x="254" y="96" width="13" height="10" />
            <rect x="249" y="87" width="17" height="8" />
          </g>
          <g class="town-smoke town-smoke-late" fill="#edf0d4">
            <rect x="254" y="96" width="13" height="10" />
            <rect x="249" y="87" width="17" height="8" />
          </g>
          <use href="#town-window" x="147" y="208" />
          <use href="#town-window" x="249" y="208" />
          <rect x="193" y="216" width="34" height="60" fill="#77543e" />
          <rect x="198" y="222" width="24" height="49" fill="#a27d4e" />
          <rect x="214" y="246" width="4" height="4" fill="#e6c77d" />
          <path d="M188 276h44v6h-44z" fill="#e9d9b2" />
          <rect x="185" y="192" width="50" height="16" fill="#f4e6ba" />
          <path d="M197 199h26v3h-26z" fill="#9a6c45" />
          <path
            d="M145 250h31v5h-31z M148 255h4v14h-4z M169 255h4v14h-4z"
            fill="#795f45"
          />
          <path
            d="M148 246h9v4h-9z M163 242h3v8h-3z M167 245h6v3h-6z"
            fill="#5d7366"
          />
          <path d="M282 248h22v28h-22z" fill="#8c784b" />
          <path d="M285 251h16v3h-16z M285 268h16v3h-16z" fill="#b39b63" />
        </g>
        <g fill="#6b6046">
          <path d="M192 197h12v3h-12z M196 195h4v9h-4z M212 195h4v9h-4z M219 195h4v9h-4z M215 201h5v3h-5z" />
        </g>
      </TownObject>
      <TownObject name="home" highlighted={destination === "home"} depth={265}>
        <g>
          <rect x="596" y="173" width="128" height="83" fill="#f0e2b6" />
          <rect x="596" y="241" width="128" height="15" fill="#b7a57c" />
          <path d="M581 175l22-60h114l22 60v9H581z" fill="#4d6765" />
          <path d="M587 174l20-53h106l20 53z" fill="url(#town-blue-roof)" />
          <use href="#town-window" x="608" y="198" />
          <use href="#town-window" x="686" y="198" />
          <rect x="646" y="205" width="28" height="51" fill="#775f45" />
          <rect x="650" y="210" width="20" height="42" fill="#b39a6b" />
          <rect x="663" y="231" width="3" height="4" fill="#eddb9d" />
          <rect x="641" y="256" width="38" height="7" fill="#ecdeba" />
          <path
            d="M638 199h44v5h-44z M638 204h4v52h-4z M678 204h4v52h-4z"
            fill="#d0bb8b"
          />
          <path d="M636 197h48v3h-48z" fill="#faf0ca" />
          <path d="M605 233h35v7h-35z M683 233h35v7h-35z" fill="#9c7150" />
          <path
            d="M608 228h6v5h-6z M621 225h6v8h-6z M632 228h5v5h-5z M687 228h6v5h-6z M700 225h6v8h-6z M711 228h5v5h-5z"
            fill="#cd846d"
          />
        </g>
        <g fill="#6b6046">
          <path d="M649 190h3v8h-7v-3h4z M657 190h3v6h3v-6h3v8h-9z" />
        </g>
      </TownObject>
      <TownObject
        name="station"
        highlighted={destination === "station"}
        depth={575}
      >
        <g>
          <rect x="126" y="490" width="178" height="76" fill="#e6d7ac" />
          <rect x="126" y="552" width="178" height="14" fill="#ad9a70" />
          <path d="M112 492l19-47h167l19 47v9H112z" fill="#536970" />
          <path d="M118 491l17-40h159l17 40z" fill="url(#town-blue-roof)" />
          <use href="#town-window" x="144" y="515" />
          <use href="#town-window" x="258" y="515" />
          <rect x="197" y="513" width="36" height="53" fill="#6e654c" />
          <rect x="202" y="518" width="26" height="48" fill="#a5ac8d" />
          <path d="M214 519h3v47h-3z" fill="#70694f" />
          <path d="M136 557h49v3h-49z M245 557h49v3h-49z" fill="#6a7160" />
          <path
            d="M139 553h4v11h-4z M151 553h4v11h-4z M163 553h4v11h-4z M175 553h4v11h-4z M248 553h4v11h-4z M260 553h4v11h-4z M272 553h4v11h-4z M284 553h4v11h-4z"
            fill="#978461"
          />
          <rect x="190" y="566" width="50" height="7" fill="#f0dfb2" />
          <rect x="199" y="462" width="32" height="29" fill="#e9dcaf" />
          <rect x="204" y="466" width="22" height="21" fill="#f7edcb" />
          <path d="M214 470h3v8h6v3h-9z" fill="#6d715b" />
        </g>
        <path d="M133 503h164v6H133z" fill="#d4b16e" />
        <path d="M133 505h164v3H133z" fill="#658c91" />
      </TownObject>
      <TownObject name="post" highlighted={destination === "post"} depth={575}>
        <g>
          <rect x="576" y="496" width="138" height="70" fill="#efddb0" />
          <rect x="576" y="551" width="138" height="15" fill="#bba279" />
          <path d="M561 497l18-52h132l18 52v9H561z" fill="#784a3b" />
          <path d="M567 495l17-44h122l17 44z" fill="url(#town-roof)" />
          <use href="#town-window" x="587" y="516" />
          <use href="#town-window" x="674" y="516" />
          <rect x="630" y="516" width="30" height="50" fill="#845946" />
          <rect x="635" y="521" width="20" height="41" fill="#b17b55" />
          <rect x="648" y="542" width="4" height="4" fill="#efda93" />
          <rect x="625" y="566" width="40" height="7" fill="#f0dfb2" />
          <rect x="627" y="475" width="37" height="23" fill="#efdfb5" />
          <path d="M632 480h27v13h-27z" fill="#b77354" />
          <path
            d="M633 481l12 8 13-8"
            fill="none"
            stroke="#eedbb0"
            stroke-width="2"
          />
          <rect x="731" y="529" width="5" height="34" fill="#795d42" />
          <path d="M722 515h23v24h-23z" fill="#ad6049" />
          <path d="M726 520h15v4h-15z" fill="#693f34" />
        </g>
        <path d="M576 547h138v4H576z" fill="#b16a4e" />
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
                  fill="#3d4435"
                />
                <path
                  d={`M${x + 3} ${y + 4}l8 5v${h - 12}l-8 3z`}
                  fill="#bb9965"
                />
                <rect
                  x={x + 11}
                  y={y + h - 3}
                  width={w - 14}
                  height="3"
                  fill="#e6c884"
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
      <TownObject name="noticeboard" depth={479}>
        <g>
          <rect x="93" y="429" width="8" height="50" fill="#7c6746" />
          <rect x="72" y="428" width="50" height="25" fill="#9b8153" />
          <rect x="76" y="432" width="42" height="17" fill="#e5d2a0" />
          <path d="M84 439h26v3H84z" fill="#86744e" />
        </g>
      </TownObject>
      <TownObject name="signpost" depth={TOWN_SIGNPOST.y}>
        <g
          data-town-signpost="true"
          transform={`translate(${TOWN_SIGNPOST.x - 535} ${TOWN_SIGNPOST.y - 363})`}
        >
          <rect x="532" y="314" width="6" height="49" fill="#7c6746" />
          {[
            { label: "Projects", y: 291, left: true },
            { label: "About", y: 307, left: false },
            { label: "Experience", y: 323, left: true },
            { label: "Contact", y: 339, left: false },
          ].map(({ label, y, left }) => (
            <g key={label} data-town-direction={label.toLowerCase()}>
              <path
                d={
                  left
                    ? `M497 ${y + 7}l7-7h75v14h-75z`
                    : `M501 ${y}h75l7 7-7 7h-75z`
                }
                fill="#6c6248"
              />
              <path d={`M506 ${y + 2}h67v10h-67z`} fill="#e7d5a2" />
              <text
                x="539"
                y={y + 10}
                text-anchor="middle"
                fill="#47513a"
                font-family="DotGothic16, monospace"
                font-size="10"
              >
                {label}
              </text>
            </g>
          ))}
        </g>
      </TownObject>
      <TownObject name="trellis" depth={222}>
        <g fill="#6d8352">
          <path d="M551 195h20v5h-20z M551 209h20v5h-20z" />
          <path d="M554 194h4v28h-4z M565 194h4v28h-4z" />
        </g>
      </TownObject>
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
        <TownObject key={`flower-${i}`} name="flower" depth={y + 15}>
          <use href="#town-flower" x={x} y={y} />
        </TownObject>
      ))}
      <TownObject name="cat" depth={cat.position.y + 26}>
        <g
          transform={`translate(${cat.position.x} ${cat.position.y})`}
          data-cat-alert={catAlert}
          data-cat-walking={cat.walking}
        >
          <ellipse cx="13" cy="26" rx="16" ry="5" fill="#587d48" opacity=".3" />
          <path d="M4 8h15v15H4z M1 20h6v7H1z M16 20h6v7h-6z" fill="#e7ca8a" />
          <path d="M2 0h5v5h9V0h5v15H2z" fill="#f4dca2" />
          <path
            d={
              catAlert || cat.walking
                ? "M5 7h3v4H5z M15 7h3v4h-3z"
                : "M4 9h5v2H4z M14 9h5v2h-5z"
            }
            fill="#574e3c"
          />
          {catAlert && <path d="M10-15h4v8h-4z M10-4h4v3h-4z" fill="#faf0c8" />}
          <path d="M20 18h7v-9h5v15H20z" fill="#d7b477" class="town-cat-tail" />
        </g>
      </TownObject>
      <TownObject name="bridge-north" depth={370}>
        <path d="M805 357h155v8H805z" fill="#e5c995" />
        <path
          d="M805 349h7v21h-7z M870 349h7v21h-7z M940 349h7v21h-7z"
          fill="#796345"
        />
      </TownObject>
      <TownObject name="bridge-south" depth={436}>
        <path d="M805 418h155v8H805z" fill="#e5c995" />
        <path
          d="M805 416h7v20h-7z M870 416h7v20h-7z M940 416h7v20h-7z"
          fill="#796345"
        />
      </TownObject>
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
