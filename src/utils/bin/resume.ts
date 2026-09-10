import config from "../../../config.json";

export const resume = async (_args: string[]): Promise<string> => {
  window.open(config.resumeUrl, "_blank");

  return "Opening resume PDF in a new tab...";
};