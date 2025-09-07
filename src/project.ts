import { makeProject } from "@motion-canvas/core";

import intro from "./scenes/intro?scene";
import audio from "../audio/audio.mp3";
import explanation from "./scenes/explanation?scene";

export default makeProject({
  scenes: [intro, explanation],
  audio,
});
