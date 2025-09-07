import {
  Icon,
  is,
  Layout,
  Line,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createSignal,
  loop,
  Vector2,
  waitFor,
  waitUntil,
  DEFAULT,
  sequence,
  range,
} from "@motion-canvas/core";
import Nerd from "../../images/nerd.png";
import { showImage } from "../helpers/showImage";
import { hideImage } from "../helpers/hideImage";

export default makeScene2D(function* (view) {
  view.fill("#1d1e21");

  yield* waitUntil("startTalk");

  const nerd = yield* showImage({
    image: Nerd,
    size: new Vector2(400, 300),
    parent: view,
    position: new Vector2(0, 0),
  });

  yield* waitUntil("hideNerd");

  yield* hideImage({
    imageRef: nerd,
  });

  yield* waitUntil("showCmd");

  const commandBlock = createRef<Rect>();
  const command = createRef<Txt>();

  view.add(
    <>
      <Rect
        layout
        width={"80%"}
        minHeight={100}
        padding={20}
        fill={"#2a2c30"}
        radius={15}
        smoothCorners
        ref={commandBlock}
        opacity={0}
        y={50}
      >
        <Txt
          opacity={0}
          ref={command}
          fill={"#b1b7c4"}
          fontFamily={"Cascadia Code"}
          text={"/editar-servidor"}
        />
      </Rect>
    </>
  );

  yield* all(
    commandBlock().y(0, 0.5),
    commandBlock().opacity(1, 0.5),
    command().opacity(1, 0.5)
  );

  yield* waitUntil("editCmd");

  yield* command().text("/editar-servidor <alteração>", 0.5);

  yield* waitUntil("editCmd2");

  yield* command().text(
    "/editar-servidor Crie um cargo para moderadores...",
    0.5
  );

  yield* waitUntil("clickEnter");

  yield* all(
    command().text("", 0.5),
    commandBlock().width("0%", 0.5),
    commandBlock().padding(0, 0.5)
  );

  const spinner = createRef<Icon>();
  const spinnerRot = createSignal(0);

  view.add(
    <Icon
      ref={spinner}
      icon={"svg-spinners:180-ring"}
      size={200}
      rotation={spinnerRot}
      opacity={0}
    />
  );

  yield loop(() => spinnerRot(spinnerRot() + 10));

  yield* all(spinner().opacity(1, 0.5));

  yield* spinner().opacity(0, 1);

  const userMsgLayout = createRef<Rect>();
  const userMsgColors = ["gray", "#ccc", "#aaff0b"];
  const lastUsrMsg = createRef<Txt>();

  view.add(
    <Rect
      layout
      fontFamily={"Cascadia Code"}
      direction={"column"}
      padding={15}
      ref={userMsgLayout}
      opacity={0}
      y={-50}
    >
      <Txt fill={userMsgColors[0]}>Sua mensagem: </Txt>
      <Txt fill={userMsgColors[1]}>Crie um cargo para moderadores</Txt>
      <Txt
        marginTop={40}
        opacity={0}
        fill={userMsgColors[2]}
        text={`Informações sobre o servidor:\n...\n...\n...`}
        ref={lastUsrMsg}
      />
    </Rect>
  );

  yield* all(userMsgLayout().opacity(1, 0.5), userMsgLayout().y(0, 0.5));

  yield* waitUntil("alteredMsg");

  const msgTexts = userMsgLayout().findAll(is(Txt));

  yield* all(
    ...msgTexts.map((txt, i) =>
      txt.fill("yellow", 0.5).to(userMsgColors[i], 0.5)
    )
  );

  yield* waitUntil("showMsgExtra");

  yield* sequence(
    0.4,
    lastUsrMsg().opacity(1, 0.5),
    lastUsrMsg().fill(userMsgColors[1], 0.5)
  );

  yield* waitUntil("decreaseUserMsg");

  yield* all(
    userMsgLayout().fontSize(30, 1),
    userMsgLayout().position([-600, 0], 1)
  );

  yield* waitUntil("showAI");

  const aiLayout = createRef<Layout>();

  view.add(
    <Layout
      layout
      direction={"column"}
      gap={20}
      alignItems={"center"}
      y={-50}
      opacity={0}
      ref={aiLayout}
    >
      <Txt fill={"white"} fontFamily={"Cascadia Code"} fontSize={40}>
        I.A
      </Txt>
      <Icon icon={"hugeicons:brain-01"} y={-50} size={130} opacity={0.8} />
    </Layout>
  );

  yield* all(aiLayout().opacity(1, 0.5), aiLayout().y(0, 0.5));

  const userMsgArrow = createRef<Line>();

  view.add(
    <Line
      ref={userMsgArrow}
      endArrow
      arrowSize={10}
      stroke={"white"}
      lineWidth={5}
      lineDash={[20, 20]}
      end={0}
      points={[
        new Vector2(userMsgLayout().position()).addX(
          userMsgLayout().width() - 260
        ),
        new Vector2(aiLayout().position()).addX(-aiLayout().width() + 50),
      ]}
    />
  );

  yield* all(
    userMsgLayout().stroke("gray", 0.5),
    userMsgLayout().lineWidth(4, 0.5),
    userMsgLayout().radius(10, 0.5),
    userMsgArrow().end(1, 0.5)
  );

  yield* waitUntil("hightlight");

  yield* lastUsrMsg().fill("#aaffaa", 1);

  yield* waitUntil("hightlightArrow");

  yield* userMsgArrow().stroke("#aaffaa", 0.5);

  yield* waitUntil("hightlightAI");

  const aiIcon = aiLayout().findFirst(is(Icon));

  yield* aiIcon.color("#aaffaa", 0.5);

  const actionsLayout = createRef<Rect>();

  view.add(
    <Rect
      layout
      ref={actionsLayout}
      direction={"column"}
      gap={15}
      fontFamily={"Cascadia Code"}
      fontSize={30}
      position={[600, 0]}
    >
      {...range(4).map((_, i) => (
        <Rect
          padding={10}
          fill={"white"}
          radius={10}
          smoothCorners
          minWidth={200}
          justifyContent={"center"}
        >
          <Txt>{`Ação ${i + 1}`}</Txt>)
        </Rect>
      ))}
    </Rect>
  );

  const actionsArrow = createRef<Line>();
  view.add(
    <Line
      ref={actionsArrow}
      endArrow
      arrowSize={10}
      stroke={"white"}
      lineWidth={5}
      lineDash={[20, 20]}
      end={0}
      points={[
        new Vector2(aiLayout().position()).addX(aiLayout().width() - 260),
        new Vector2(aiLayout().position()).addX(-aiLayout().width() + 50),
      ]}
    />
  );

  yield* waitFor(100);
});
