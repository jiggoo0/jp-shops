export interface BotResponse {
  type: "text" | "flex";
  content: string | Record<string, unknown>;
}

export interface IBotStrategy {
  canHandle(input: string): boolean;
  handle(input: string): BotResponse;
}
