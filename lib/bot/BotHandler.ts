import { IBotStrategy, BotResponse } from "./strategies/types";
import { MenuStrategy } from "./strategies/MenuStrategy";
import { LoanStrategy } from "./strategies/LoanStrategy";
import { VisaStrategy } from "./strategies/VisaStrategy";
import { VifilyStrategy } from "./strategies/VifilyStrategy";
import { UrgentStrategy } from "./strategies/UrgentStrategy";
import { SupportStrategy } from "./strategies/SupportStrategy";
import { DataInputStrategy } from "./strategies/DataInputStrategy";
import { ImageStrategy } from "./strategies/ImageStrategy";

export type { BotResponse };

export class BotHandler {
  private strategies: IBotStrategy[];

  constructor() {
    // ลำดับของ Strategy มีความสำคัญ (Priority)
    this.strategies = [
      new MenuStrategy(),
      new LoanStrategy(),
      new VisaStrategy(),
      new VifilyStrategy(),
      new UrgentStrategy(),
      new SupportStrategy(),
      new ImageStrategy(),
      new DataInputStrategy(),
    ];
  }

  handle(text: string): BotResponse {
    const input = text.trim();

    // ค้นหา Strategy ที่เหมาะสม
    const strategy = this.strategies.find((s) => s.canHandle(input));

    if (strategy) {
      return strategy.handle(input);
    }

    // Default Strategy (Menu)
    return new MenuStrategy().handle();
  }
}
