import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";
type Props = {
  showGameResult: boolean;
  resultText: String;
  setshowGameResult: Dispatch<SetStateAction<boolean>>;
  ResetGame: () => void;
};
function AbResult({
  showGameResult,
  setshowGameResult,
  resultText,
  ResetGame,
}: Props) {
  const handleClose = () => {
    setshowGameResult(false);
    ResetGame();
  };
  return (
    <Transition
      show={showGameResult}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <div className="fixed inset-0  overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center p-4">
            <Dialog.Panel
              onClick={handleClose}
              className="mx-auto relative max-w-xs max-h-64  bg-white w-full rounded-lg flex justify-center"
            >
              <div className="flex flex-col items-center justify-center">
                <Dialog.Title>
                  <Image
                    src={"/assets/result.png"}
                    className="mt-2 absolute -top-16 left-0 right-0"
                    width={500}
                    height={300}
                    alt="result"
                  />
                </Dialog.Title>
                <div className="flex h-24 mb-4 w-24 text-center items-center justify-center border bg-red-600 rounded-full ">
                  <span className="font-bold text-3xl text-white">
                    {resultText.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AbResult;
