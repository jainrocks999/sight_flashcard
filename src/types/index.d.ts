export type dbData = dbItem[];

export interface dbItem {
  ActualSound: string
  Flag: string
  Image: string
  Category: string
  Sound: string
  Title: string
  _id: number
}
export type random = {
  random: boolean;
};
export type settings = setting[]

export interface setting {
  Question: string
  Swipe: string
  RandomOrder: string
  Voice: string
  _id: number
}
