import { Img, View2D } from "@motion-canvas/2d";
import { createRef, easeOutCubic, tween, Vector2 } from "@motion-canvas/core";

interface ShowImageArgs {
  parent: View2D;
  image: string;
  size: Vector2;
  position: Vector2;
  radius?: number;
}

export function* showImage(options: ShowImageArgs) {
  const imageRef = createRef<Img>();

  yield options.parent.add(
    <Img
      ref={imageRef}
      src={options.image}
      width={options.size.x}
      height={options.size.y}
      opacity={0}
      radius={options.radius || 0}
    />
  );

  imageRef().y(200);

  yield* tween(0.5, (value) => {
    const imageOpacity = easeOutCubic(value, 0, 1);
    const imagePos = new Vector2(
      easeOutCubic(value, 0, options.position.x),
      easeOutCubic(value, 200, options.position.y)
    );

    imageRef().opacity(imageOpacity);
    imageRef().position(imagePos);
  });

  return imageRef;
}
