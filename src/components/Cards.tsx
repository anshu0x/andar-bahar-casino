import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useMemo } from "react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { Card } from "@/types";
type Props = {
  cards: Card[];
  opencard: number;
  controls: unknown;
  setresultText: (name: string) => void;
  setResultkey: Dispatch<SetStateAction<number>>;
  setshowGameResult: Dispatch<SetStateAction<boolean>>;
};
const Cards = ({
  cards,
  opencard,
  controls,
  setresultText,
  setshowGameResult,
  setResultkey,
}: Props) => {
  console.log("render");
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
            setshowGameResult(true);
            setResultkey(Math.random());
          }, 600);
          if (isEven(index)) {
            setresultText("bahar");
            return;
          } else if (!isEven(index)) {
            setresultText("andar");
            return;
          } else {
            setresultText("tie");
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [controls, opencard, setResultkey, setresultText, setshowGameResult]
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
      <AnimatePresence>
        {cards.slice(0, 20).map((item, index) => (
          <motion.div
            initial={{ opacity: 0, display: "none" }}
            layoutId={item.img + item.cardtype + item.color}
            // @ts-ignore
            animate={controls}
            variants={variants}
            key={item.img + item.cardtype + item.color}
            className="flex absolute select-none top-2/4 bg-white flex-col gap-2 border p-4 rounded-md"
            custom={{ animate: index + 1, key: index }}
            // @ts-ignore
            whileInView={() =>
              item.cardNo === opencard && stopAnimwhenmatch(item, index)
            }
            exit={{ opacity: 0, display: "none" }}
          >
            <Image src={item.img} alt={item.img} width={30} height={50} />
            <Image
              src={item.cardtype}
              alt={item.cardtype}
              width={30}
              height={50}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <p className="text-white text-xs font-semibold text-center my-4 tracking-wider">
        Total Cards: 20
      </p>
    </div>
  );
};

export default memo(Cards);