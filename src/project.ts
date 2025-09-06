import { makeProject } from "@motion-canvas/core";

import intro from "./scenes/intro?scene";
import audio from "../audio/audio.mp3";

export default makeProject({
  scenes: [intro],
  audio,
});
