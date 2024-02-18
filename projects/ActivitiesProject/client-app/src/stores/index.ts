import { create } from "zustand";
import { ActivitySlice } from "./ActivitySlice/index.interface";
import { CommonSlice } from "./CommonSlice/index.interface";
import { createActivitySlice } from "./ActivitySlice/index";
import { createCommonSlice } from "./CommonSlice/index";

export const useBoundStore = create<ActivitySlice & CommonSlice>()((...a) => ({
  ...createActivitySlice(...a),
  ...createCommonSlice(...a),
}));
