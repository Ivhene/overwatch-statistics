import { Heroes, Maps } from "@/lib/constants";

export function findAllMaps() {
  return Maps;
}

export function findMapByName(name: string) {
  return (
    Maps.find((map) => map.name === name) ?? { name: "", image: "", mode: "" }
  );
}

export function findAllHeroes() {
  return Heroes;
}

export function findHeroByName(name: string | undefined) {
  return (
    Heroes.find((hero) => hero.name === name) ?? {
      heroID: -1,
      name: "",
      image: "",
      role: "",
    }
  );
}
