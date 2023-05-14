import Image from "next/image";
import { useAnimation, m, LazyMotion, domAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { shuffle } from "../utils/index";
import { GameCards } from "../utils/Cards";
import dynamic from "next/dynamic";
import { useUserInfo } from "@/context/UserInfo";
import toast from "react-hot-toast";
const AbResult = dynamic(() => import("@/components/AbResult"));
const AndharBaharSheet = dynamic(() => import("@/components/AndharBaharSheet"));
const Cards = dynamic(() => import("../components/Cards"));
const Andharbahar = () => {
  const userInfo = useUserInfo();
  const controls = useAnimation();
  const [cards, setCards] = useState(GameCards);
  const [randomkey, setRandomkey] = useState(Math.random());
  const [resultkey, setResultkey] = useState(Math.random());
  const [showGameResult, setshowGameResult] = useState(false);
  const [showOpenCard, setshowOpenCard] = useState(false);
  const [resultText, setresultText] = useState("");
  const [betOnABT, setbetOnABT] = useState("");
  const [orderSheet, setOrderSheet] = useState(false);
  const [openCard, setOpenCard] = useState(0);
  const generateOpenCard = useCallback(() => {
    let openCard = Math.floor(Math.random() * (19 - 0 + 1) + 0);
    setOpenCard(openCard);
  }, []);
  const playGame = useCallback(() => {
    controls.start("closed");
  }, [controls]);

  const setWin = useCallback((name: string) => {
    setresultText((prev) => {
      if (prev === "") {
        return name;
      }
      return "";
    });
    setResultkey(Math.random());
    setshowGameResult(true);
  }, []);

  const ResetGame = useCallback(() => {
    setRandomkey(Math.random());
    setCards((prev) => shuffle(prev));
    setTimeout(() => {
      setshowOpenCard(false);
    }, 1000);
    setbetOnABT("");
    setresultText("");
    if (userInfo) {
      userInfo.setUser((prev) => {
        return { ...prev, orderAmount: 0 };
      });
    }
  }, [userInfo]);
  const show_shuffle_card = () => {
    generateOpenCard();
    setCards(shuffle(GameCards));
    setshowOpenCard(true);
  };
  useEffect(() => {
    if (
      resultText !== "" &&
      betOnABT !== "" &&
      userInfo?.user.orderAmount !== 0
    ) {
      setTimeout(() => {
        if (userInfo !== null && resultText === betOnABT) {
          toast.success("You Won !");
          userInfo.setUser((prev) => {
            return { ...prev, balance: prev.balance + prev.orderAmount * 2 };
          });
        } else {
          toast.error("You Lose !");
        }
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betOnABT, resultText]);
  console.log(userInfo?.user.orderAmount);

  return (
    <div className="flex flex-col relative h-screen w-full justify-center items-center bg-[#161b2e] opacity-1">
      <div className="flex w-full text-center flex-col font-black tracking-wider justify-center px-1 text-white pt-4 items-center">
        <p className="font-semibold">Andar Bahar</p>
      </div>
      <div className="bg-[#161b2e] relative rounded-lg max-w-md w-screen h-full my-4">
        <div className="invisible flex mt-4 mb-6 w-full justify-between font-bold p-4 text-white">
          <div>
            <h1>Balance</h1>
            <p className="text-sm font-normal">{userInfo?.user?.balance}</p>
          </div>
          <div>
            <h1>Countdown</h1>
            <p className="text-sm font-normal">0 0 : 2 2</p>
          </div>
        </div>
        <div className="opencard flex justify-center w-full my-3">
          <div className="single-card relative bg-yellow-100 gap-4 grid items-center justify-center h-24  w-16 rounded-lg mt-4 mx-4 ">
            <LazyMotion features={domAnimation}>
              {!showOpenCard ? (
                <m.div key="closed-card">
                  <Image
                    src={"/assets/card/abBg.png"}
                    width="100"
                    height={"100"}
                    alt="coin"
                    className="select-none"
                  />
                </m.div>
              ) : (
                <m.div
                  className="bg-yellow-100 text-center grid items-center justify-center rounded-lg"
                  key="open-card"
                >
                  <p
                    className={`font-black tracking-wider text-2xl ${
                      cards[openCard].color == "red"
                        ? "text-red-600"
                        : "text-[#013888]"
                    } `}
                  >
                    {cards[openCard].cardNo}
                  </p>
                  <Image
                    src={cards[openCard].cardtype}
                    width={"30"}
                    height={"50"}
                    alt="coin"
                    className="select-none my-2"
                  />
                </m.div>
              )}
            </LazyMotion>
          </div>
        </div>
        <div className="flex gap-8 justify-center my-10">
          <div className="andhar">
            <Image
              src={"/assets/card/andarBg.png"}
              width={"80"}
              height={"120"}
              alt="coin"
              className="select-none mt-28"
            />
          </div>
          <div>
            <div className="animated-card z-10">
              <Image
                src={"/assets/card/abAllCards.png"}
                width={"90"}
                height={"90"}
                alt="coin"
                className="select-none"
              />
              <Cards
                opencard={cards[openCard]["cardNo"]}
                cards={cards}
                key={randomkey}
                controls={controls}
                setresultText={setWin}
              />
            </div>
          </div>
          <div className="bahar">
            <Image
              src={"/assets/card/baharBg.png"}
              width={"80"}
              height={"90"}
              alt="coin"
              className="select-none mt-28"
            />
          </div>
        </div>
        <div className="items-end flex gap-2 justify-between px-6 mx-4  my-4">
          <button
            disabled={!showOpenCard || userInfo?.user.orderAmount !== 0}
            type="button"
            onClick={() => {
              setOrderSheet(true);
              setbetOnABT("andar");
            }}
            className=" disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-8 py-2.5 mb-2 focus:outline-none dark:focus:ring-blue-800"
          >
            Andar
          </button>
          <div className="flex flex-col w-full">
            <button
              type="button"
              disabled={showOpenCard}
              onClick={show_shuffle_card}
              className="disabled:bg-slate-600 disabled:cursor-not-allowed text-white bg-blue-600 rounded-lg text-sm px-2 py-2.5  mb-2"
            >
              Show Card
            </button>
            <button
              type="button"
              disabled={!showOpenCard || userInfo?.user.orderAmount !== 0}
              onClick={() => {
                setOrderSheet(true);
                setbetOnABT("tie");
              }}
              className="disabled:bg-slate-600  disabled:cursor-not-allowed font-bold text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg text-sm px-6 py-2.5  mb-2"
            >
              Tie
            </button>
          </div>
          <button
            disabled={!showOpenCard || userInfo?.user.orderAmount !== 0}
            onClick={() => {
              setOrderSheet(true);
              setbetOnABT("bahar");
            }}
            type="button"
            className=" text-white bg-red-700 disabled:cursor-not-allowed font-bold hover:bg-red-800 rounded-lg text-sm px-8 py-2.5 mb-2 disabled:bg-slate-600"
          >
            Bahar
          </button>
        </div>
        <AndharBaharSheet
          orderSheet={orderSheet}
          betOnABT={betOnABT}
          setOrderSheet={setOrderSheet}
          playGame={playGame}
        />
        <AbResult
          resultText={resultText}
          showGameResult={showGameResult}
          key={resultkey}
          ResetGame={ResetGame}
          setshowGameResult={setshowGameResult}
        />
      </div>
    </div>
  );
};

export default Andharbahar;
