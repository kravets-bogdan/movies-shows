export type TItem = {
  description: string;
  images: { posterArt: TImg };
  programType: string;
  releaseYear: number;
  title: string;
};

type TImg = {
  height: number;
  width: number;
  url: string;
};
