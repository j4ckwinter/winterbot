import TownObject from "./TownObject";

export default function TownBuildings({
  destination,
}: {
  destination?: string;
}) {
  return (
    <>
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
