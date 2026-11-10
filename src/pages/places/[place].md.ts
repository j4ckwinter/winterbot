import type { APIRoute, GetStaticPaths } from "astro";
import { placeMarkdown } from "../../components/town/placeMarkdown";
import { places, type Place } from "../../components/town/world";

export const getStaticPaths = (() =>
  places.map((place) => ({
    params: { place: place.id },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(placeMarkdown(params.place as Place), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
