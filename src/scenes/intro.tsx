import {
  blur,
  Circle,
  Icon,
  Img,
  is,
  Line,
  makeScene2D,
  Node,
  Polygon,
  QuadBezier,
  Txt,
} from "@motion-canvas/2d";
import bg from "../../images/bg.jpg";
import DiscordUser from "../../images/discord-user.png";
import Programmer from "../../images/programmer.png";
import TechGuy from "../../images/tech-guy.png";
import Robot from "../../images/robot.jpg";
import ChatGPT from "../../images/chatgpt-logo.webp";
import Discly from "../../images/discly-logo.png";
import { showImage } from "../helpers/showImage";
import {
  all,
  createRef,
  createSignal,
  loop,
  makeRef,
  PossibleVector2,
  range,
  sequence,
  SignalValue,
  useRandom,
  Vector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.add(
    <Img src={bg} width={"100%"} height={"100%"} filters={[blur(50)]} />
  );

  yield* waitUntil("programmer");

  const programmer = yield* showImage({
    image: Programmer,
    parent: view,
    size: new Vector2(200, 200),
    position: new Vector2(-500, 0),
  });

  yield* waitUntil("techGuy");

  const techGuy = yield* showImage({
    image: TechGuy,
    parent: view,
    size: new Vector2(200, 200),
    position: new Vector2(0, 0),
  });

  yield* waitUntil("discordUser");

  const discordUser = yield* showImage({
    image: DiscordUser,
    parent: view,
    size: new Vector2(200, 200),
    position: new Vector2(500, 0),
    radius: 20,
  });

  yield* waitUntil("combination");

  const meSquare = createRef<Polygon>();
  const meSquareRot = createSignal(0);

  view.add(
    <Polygon
      ref={meSquare}
      size={0}
      opacity={0}
      sides={4}
      radius={20}
      fill={"#a0fa6c"}
      shadowColor={"#a0fa6c"}
      shadowBlur={20}
      shadowOffset={[0, 0]}
      rotation={meSquareRot}
    />
  );

  yield* all(
    programmer().position(techGuy().position(), 0.5),
    discordUser().position(techGuy().position(), 0.5),
    programmer().opacity(0, 0.6),
    discordUser().opacity(0, 0.6),
    techGuy().opacity(0, 0.6)
  );

  yield* all(meSquare().opacity(1, 0.3), meSquare().size(200, 0.3));

  yield loop(() => meSquareRot(meSquareRot() + 1));

  const botImgPos = new Vector2(500, -300);

  const botArrow = createRef<Line>();

  view.add(
    <QuadBezier
      endArrow
      lineWidth={10}
      stroke={"white"}
      lineDash={[20, 20]}
      end={0}
      ref={botArrow}
      p0={[0, -140]}
      p1={[120, -300]}
      p2={new Vector2(botImgPos).sub([120, 0])}
    />
  );

  yield* waitUntil("iCreated");

  yield* showImage({
    image: Robot,
    parent: view,
    position: botImgPos,
    size: new Vector2(200, 200),
    radius: 20,
  });

  const botTxt = createRef<Txt>();

  view.add(
    <Txt
      fontFamily={"Cascadia Code"}
      fill={"white"}
      position={new Vector2(botImgPos).sub([0, 140])}
      ref={botTxt}
      opacity={0}
    >
      Bot
    </Txt>
  );

  yield* all(botArrow().end(1, 1), botTxt().opacity(1, 1));

  const plus = createRef<Txt>();
  const chatGpt = createRef<Img>();
  view.add(
    <>
      <Txt
        ref={plus}
        fill={"white"}
        fontSize={100}
        opacity={0}
        position={new Vector2(botImgPos).add([0, 200])}
      >
        +
      </Txt>

      <Img
        ref={chatGpt}
        src={ChatGPT}
        opacity={0}
        radius={20}
        size={200}
        position={new Vector2(botImgPos).add([0, 400])}
      />
    </>
  );

  yield* waitUntil("IA");

  yield* all(chatGpt().opacity(1, 1), plus().opacity(1, 1));

  yield* waitUntil("improved");

  const allNodes = view.findAll(is(Node));
  const bgImage = view.findFirst(is(Img));

  yield* all(
    ...allNodes.map(
      (node) =>
        node != bgImage &&
        node != meSquare() &&
        node.opacity(0, 0.5).do(() => node.remove())
    ),
    meSquare().fill("#168cfa", 0.5),
    meSquare().shadowBlur(0, 0.5),
    meSquare().sides(8, 1),
    meSquare().size(300, 0.5)
  );

  const squareIcon = createRef<Icon>();
  const squareIconB = createRef<Icon>();

  view.add(
    <>
      <Icon
        ref={squareIcon}
        icon={"material-symbols:edit-square-rounded"}
        size={100}
        opacity={0}
      />

      <Icon
        ref={squareIconB}
        icon={"material-symbols:network-intel-node-rounded"}
        size={100}
        opacity={0}
      />
    </>
  );

  yield* squareIcon().opacity(1, 1);

  yield* waitUntil("iconAI");

  yield* all(
    squareIcon()
      .opacity(0, 1)
      .do(() => squareIcon().remove()),
    squareIconB().opacity(1, 1)
  );

  yield* waitUntil("hideStuff");

  yield* all(
    squareIconB()
      .opacity(0, 1)
      .do(() => squareIconB().remove()),
    meSquare().opacity(0, 1)
  );

  yield* waitUntil("showDiscly");

  const servers: Icon[] = [];
  const positions: SignalValue<PossibleVector2>[] = [
    [400, 400],
    [650, 50],
    [670, -300],
    [-400, 400],
    [-650, 50],
    [-670, -300],
  ];

  range(6).forEach((i) => {
    view.add(
      <Icon
        icon={"ic:baseline-home"}
        ref={makeRef(servers, i)}
        fill={"#1144dd"}
        radius={100}
        padding={100}
        position={positions[i]}
        opacity={0}
      />
    );
  });

  const discly = yield* showImage({
    image: Discly,
    position: new Vector2(0, 0),
    size: new Vector2(300, 300),
    parent: view,
  });

  const disclyName = createRef<Txt>();

  view.add(
    <Txt
      bottom={new Vector2(discly().top()).add([0, -30])}
      fontFamily={"Cascadia Code"}
      fill={"white"}
      opacity={0}
      ref={disclyName}
    >
      Discly
    </Txt>
  );

  yield* disclyName().opacity(1, 0.5);

  yield* waitUntil("createServers");

  yield* sequence(1, ...servers.map((server) => server.opacity(1, 1)));

  yield* waitUntil("graySevers");

  yield* sequence(
    0.2,
    ...servers.map((server) => server.filters.grayscale(10, 1)),
    discly().filters.grayscale(10, 1)
  );

  yield* waitUntil("colorAgain");

  yield* all(
    ...servers.map((server) => server.filters.grayscale(0, 1)),

    discly().filters.grayscale(0, 1)
  );

  // outro part so we can go to the next scene
  yield* waitUntil("outro");

  const outroCircle = createRef<Circle>();

  view.add(<Circle ref={outroCircle} fill={"#1d1e21"} />);

  yield* outroCircle().size(2500, 2);
});
