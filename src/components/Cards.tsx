import Image from "next/image";
import { memo, useCallback, useMemo } from "react";
import { Card } from "@/types";
import { m, LazyMotion, domAnimation } from "framer-motion";

type Props = {
  cards: Card[];
  opencard: number;
  controls: unknown;
  setresultText: (name: string) => void;
};
const Cards = ({ cards, opencard, controls, setresultText }: Props) => {
  function isEven(n: number) {
    return n % 2 == 0;
  }
  const stopAnimwhenmatch = useCallback(
    (card: { cardNo: number }, index: number) => {
      try {
        if (card.cardNo === opencard) {
          setTimeout(() => {
            // @ts-ignore
            controls.stop("open");
          }, 800);
          const result = isEven(index)
            ? "bahar"
            : !isEven(index)
            ? "andar"
            : "tie";
          setresultText(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [controls, opencard, setresultText]
  );

  const variants = useMemo(
    () => ({
      open: { opacity: 0, display: "none" },
      closed: ({ animate, key }: { animate: number; key: number }) => ({
        x: isEven(key) ? 120 : -120,
        y: isEven(key) ? -340 + key * 20 + 20 : -340 + key * 20,
        rotateX: [0, 360],
        rotateY: [0, 360],
        transition: {
          delay: animate,
          stiffness: 110,
          type: "tween",
          duration: 0.6,
        },
        opacity: 1,
        display: "flex",
      }),
    }),
    []
  );

  return (
    <div className="flex justify-center">
      <LazyMotion features={domAnimation}>
        {cards.slice(0, 20).map((item, index) => (
          <m.div
            initial={{ opacity: 0, display: "none" }}
            layoutId={item.img + item.cardtype + item.color}
            // @ts-ignore
            animate={controls}
            variants={variants}
            key={item.img + item.cardtype + item.color}
            className="flex absolute select-none top-2/4 bg-white flex-col gap-2 border p-4 rounded-md"
            custom={{ animate: index + 1, key: index }}
            // @ts-ignore
            whileInView={() => {
              item.cardNo === opencard && stopAnimwhenmatch(item, index);
            }}
            exit={{ opacity: 0, display: "none" }}
          >
            <Image src={item.img} alt={item.img} width={30} height={50} />
            <Image
              src={item.cardtype}
              alt={item.cardtype}
              width={30}
              height={50}
            />
          </m.div>
        ))}
      </LazyMotion>
    </div>
  );
};

export default memo(Cards);
