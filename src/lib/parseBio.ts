export function splitGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(
      new Intl.Segmenter("en", { granularity: "grapheme" }).segment(text),
      (segment) => segment.segment,
    );
  }
  return [...text];
}

export function isEmoji(char: string): boolean {
  return /\p{Extended_Pictographic}/u.test(char);
}

export type BioWord = {
  items: { grapheme: string; flatIndex: number; isEmoji: boolean }[];
};

export function parseBio(text: string) {
  const graphemes = splitGraphemes(text);
  const words: BioWord[] = [];
  let current: BioWord["items"] = [];
  let flatIndex = 0;

  for (const grapheme of graphemes) {
    if (grapheme === " " || grapheme === "\n") {
      if (current.length > 0) {
        words.push({ items: current });
        current = [];
      }
      flatIndex += 1;
      continue;
    }

    current.push({
      grapheme,
      flatIndex,
      isEmoji: isEmoji(grapheme),
    });
    flatIndex += 1;
  }

  if (current.length > 0) {
    words.push({ items: current });
  }

  return { words, total: flatIndex };
}
