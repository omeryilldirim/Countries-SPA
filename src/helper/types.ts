export interface SearchTerms {
  text: string;
  field: string;
}

export interface Country {
  code: string;
  name: string;
  emoji: string;
  emojiU: string;
  continent: {
    name: string;
  };
  currency: string;
  languages: {
    name: string;
  }[];
  [key: string]: any;
}
