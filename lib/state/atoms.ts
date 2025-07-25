import { atom } from "jotai";

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  hyperdrive_rating: string;
  url: string;
}

export const selectedStarshipsAtom = atom<Starship[]>([]);
//dashboard selecion
export const toggleStarshipSelectionAtom = atom(
  null,
  (get, set, starship: Starship) => {
    const selected = get(selectedStarshipsAtom);
    const alreadySelected = selected.find((s) => s.url === starship.url);

    if (alreadySelected) {
      set(
        selectedStarshipsAtom,
        selected.filter((s) => s.url !== starship.url)
      );
    } else {
      if (selected.length < 6) {
        set(selectedStarshipsAtom, [...selected, starship]);
      }
    }
  }
);

//compare atom
export const compareSelectionAtom = atom<Starship[]>([]);

//selecting starships for comparing
export const toggleCompareSelectionAtom = atom(
  null,
  (get, set, starship: Starship) => {
    const current = get(compareSelectionAtom);
    const isSelected = current.find((s) => s.url === starship.url);

    if (isSelected) {
      set(
        compareSelectionAtom,
        current.filter((s) => s.url !== starship.url)
      );
    } else if (current.length < 3) {
      set(compareSelectionAtom, [...current, starship]);
    }
  }
);

export const searchQueryAtom = atom("");

export type HyperdriveFilter = "<1.0" | "1.0-2.0" | ">2.0" | null;
export const hyperdriveFilterAtom = atom<HyperdriveFilter>(null);

export type CrewSizeFilter = "1-5" | "6-50" | "50+" | null;
export const crewSizeFilterAtom = atom<CrewSizeFilter>(null);

//clear ships
export const clearCompareSelectionAtom = atom(null, (_get, set) => {
  set(selectedStarshipsAtom, []);
  set(compareSelectionAtom, []);
});
