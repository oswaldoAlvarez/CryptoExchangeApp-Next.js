import { create } from "zustand";
import { CoinMarket } from "@/types/coin-types";

type State = {
  selected?: CoinMarket;
  setSelected: (c: CoinMarket) => void;
};
export const useCoinStore = create<State>((set) => ({
  selected: undefined,
  setSelected: (c) => set({ selected: c }),
}));
