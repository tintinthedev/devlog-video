import { Img } from "@motion-canvas/2d";
import { all, Reference } from "@motion-canvas/core";

interface HideImageArgs {
  imageRef: Reference<Img>;
}

export function* hideImage(options: HideImageArgs) {
  yield* all(options.imageRef().opacity(0, 0.5), options.imageRef().y(50, 0.5));
}
