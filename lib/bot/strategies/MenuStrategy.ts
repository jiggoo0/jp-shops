import { flexTemplates } from "../templates";
import { IBotStrategy, BotResponse } from "./types";

export class MenuStrategy implements IBotStrategy {
  canHandle(input: string): boolean {
    const lowInput = input.toLowerCase();
    return lowInput === "0" || lowInput.includes("เมนู") || lowInput === "menu";
  }

  handle(): BotResponse {
    return {
      type: "flex",
      content: flexTemplates.mainMenu.contents as Record<string, unknown>,
    };
  }
}
