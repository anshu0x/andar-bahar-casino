import { Card } from "../types/index";

const types = ["/assets/card/abType1.png", "/assets/card/abType2.png", "/assets/card/abType3.png"];

export const GameCards: Card[] = [];

for (let type of types) {
  const color = (type === "/assets/card/abType2.png" || type === "/assets/card/abType4.png") ? "red" : "black";
  for (let cardNo = 1; cardNo <= 13; cardNo++) {
    GameCards.push({
      cardNo,
      color,
      cardtype: type,
    });
  }
}
