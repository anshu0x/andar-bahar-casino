// const GameRecord = () => {
//   let arr = [
//     1, 4, 32, 5, 3, 2, 62, 4, 51, 63, 23, 32, 45, 62, 11, 2, 2, 2, 2, 53, 23,
//     13, 4, 11, 5, 15, 14, 7, 73, 54, 54, 7, 91, 88, 9,
//   ];
//   return (
//     <div className="pt-1 px-4 w-full flex flex-col justify-center py-1">
//       <hr className="my-2 h-px bg-gray-200 border-0" />
//       <p className="font-bold text-center text-xl text-gray-600 my-2">
//         Game Record
//       </p>
//       <hr className="my-2 h-px bg-gray-200 border-0" />
//       <div className="w-full gap-2 grid-cols-6 grid py-4 h-48 overflow-auto">
//         {[...new Set(arr)].map((value) => {
//           return (
//             <div
//               key={value}
//               className="odd:bg-red-100 m-0.5 rounded-full odd:text-red-800 bg-blue-100 text-blue-800 text-sm text-center font-medium px-2.5 py-2.5"
//             >
//               {value}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GameRecord;
