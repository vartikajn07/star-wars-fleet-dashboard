import { atom } from "jotai";

export const selectedStarshipsAtom = atom<any[]>([]);

export const searchQueryAtom = atom("");

export type HyperdriveFilter = "<1.0" | "1.0-2.0" | ">2.0" | null;
export const hyperdriveFilterAtom = atom<HyperdriveFilter>(null);

export type CrewSizeFilter = "1-5" | "6-50" | "50+" | null;
export const crewSizeFilterAtom = atom<CrewSizeFilter>(null);
