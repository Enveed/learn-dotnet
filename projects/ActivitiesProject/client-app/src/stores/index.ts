import { create } from "zustand";
import { ActivitySlice } from "./ActivitySlice/index.interface";
import { CommonSlice } from "./CommonSlice/index.interface";
import { createActivitySlice } from "./ActivitySlice/index";
import { createCommonSlice } from "./CommonSlice/index";
import { UserSlice } from "./UserSlice/index.interface";
import { createUserSlice } from "./UserSlice/index";

export const useBoundStore = create<ActivitySlice & CommonSlice & UserSlice>()(
  (...a) => ({
    ...createActivitySlice(...a),
    ...createCommonSlice(...a),
    ...createUserSlice(...a),
  })
);
