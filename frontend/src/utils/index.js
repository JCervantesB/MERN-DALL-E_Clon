import FileSaver from "file-saver";
import { sorprendeme } from "../constants";

export function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * sorprendeme.length);
  const randomPrompt = sorprendeme[randomIndex];

  if(randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, imagen){
  FileSaver.saveAs(imagen, `download-${_id}.jpg`);
}