import "./town-map.css";
import TownBridges from "./TownBridges";
import TownBuildings from "./TownBuildings";
import TownCat from "./TownCat";
import TownGround from "./TownGround";
import TownScenery from "./TownScenery";
import type { Point } from "./world";

export default function TownMap({
  player,
  destination,
}: {
  player?: Point;
  destination?: string;
}) {
  return (
    <>
      {" "}
      <TownGround />
      <TownBuildings destination={destination} />
      <TownScenery player={player} />
      <TownCat player={player} />
      <TownBridges />
    </>
  );
}
