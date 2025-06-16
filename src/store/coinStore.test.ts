import { mockCoinBitcoin, mockCoinDogecoin, mockCoinEthereum } from "../mocks/coinMocks";
import { useCoinStore } from "./coinStore";

describe("useCoinStore", () => {
  it("should initialize with undefined selected coin", () => {
    const state = useCoinStore.getState();
    expect(state.selected).toBeUndefined();
  });

  it("should update the selected coin", () => {
    const { setSelected } = useCoinStore.getState();

    setSelected(mockCoinBitcoin);

    const updatedState = useCoinStore.getState();
    expect(updatedState.selected).toEqual(mockCoinBitcoin);
  });

  it("should allow multiple updates to selected coin", () => {
    const { setSelected } = useCoinStore.getState();

    setSelected(mockCoinEthereum);
    expect(useCoinStore.getState().selected).toEqual(mockCoinEthereum);

    setSelected(mockCoinDogecoin);
    expect(useCoinStore.getState().selected).toEqual(mockCoinDogecoin);
  });
});