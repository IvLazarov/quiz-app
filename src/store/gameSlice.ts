import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type QuizState = {
  playerName: string;
  categoriesPicked: string[];
  totalAnswers: number;
};

const initialState: QuizState = {
  playerName: "",
  categoriesPicked: [],
  totalAnswers: 0,
};

const gameSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<QuizState["playerName"]>) => {
      state.playerName = action.payload;
    },

    setCategoriesPicked: (state, action: PayloadAction<string>) => {
      state.categoriesPicked.push(action.payload);
    },

    setCorrectAnswers: (state, action: PayloadAction<number>) => {
      state.totalAnswers = state.totalAnswers + action.payload;
    },
  },
});

export const { setPlayerName, setCategoriesPicked, setCorrectAnswers } =
  gameSlice.actions;
export default gameSlice.reducer;
