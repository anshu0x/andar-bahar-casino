import Sheet from "react-modal-sheet";
import toast from "react-hot-toast";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useUserInfo } from "@/context/UserInfo";
const arr = [100, 500, 1000, 2000];
type Props = {
  orderSheet: boolean;
  setOrderSheet: Dispatch<SetStateAction<boolean>>;
  betOnABT: string;
  playGame: () => void;
};
function AndharBaharSheet({
  orderSheet,
  setOrderSheet,
  betOnABT,
  playGame,
}: Props) {
  const userInfo = useUserInfo();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (
        userInfo !== null &&
        userInfo.user.orderAmount &&
        userInfo.user.balance >= userInfo.user.orderAmount
      ) {
        toast.success("Order succeed!");
        userInfo.setUser((prev) => {
          return { ...prev, balance: prev.balance - userInfo.user.orderAmount };
        });
        playGame();
      } else if (userInfo !== null && userInfo.user.orderAmount < 1) {
        toast.error("Please Select the Amount !");
      } else {
        toast.error("You don't have enough balance!");
      }
    } catch (error) {
      toast.error("An error occured!");
    } finally {
      handleSheetClose();
    }
  };
  const handleSheetClose = () => {
    setOrderSheet(false);
  };
  return (
    <Sheet
      isOpen={orderSheet}
      detent="content-height"
      className="max-w-md"
      onClose={handleSheetClose}
    >
      <Sheet.Container>
        <Sheet.Header />
        <p className="text-center text-xl tracking-wider font-medium">
          Choose bet amount
        </p>
        <Sheet.Content>
          <div className="p-6 space-y-4 ">
            <div className="flex w-full items-center border justify-center border-gray-100 rounded-lg p-3 py-4">
              <div className="flex gap-4">
                <p className="text-xl font-semibold">Balance</p>
                <h1 className="text-2xl font-bold">
                  {userInfo?.user?.balance}
                </h1>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-lg font-bold">Contract Point</p>
              <div className="grid grid-cols-4 my-4 gap-2 w-full">
                {arr.map((btn) => {
                  return (
                    <button
                      key={btn}
                      onClick={() =>
                        userInfo?.setUser((prev) => {
                          return {
                            ...prev,
                            orderAmount: btn,
                          };
                        })
                      }
                      type="button"
                      className="flex flex-col bg-blue-100 text-blue-800 font-bold shadow rounded-xl  text-center justify-center items-center w-full h-12 focus:text-blue-100 focus:bg-blue-800"
                    >
                      <span>{btn}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center"
                // disabled={orderAmount < 1}
              >
                Confirm
              </button>
            </form>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

export default AndharBaharSheet;
