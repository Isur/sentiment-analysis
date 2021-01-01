export interface SentimentObject {
  text: string,
  sentiment: {
    result: number,
    polarity: number,
  },
  subjectivity: {
    result: number,
    subjectivity: number,
  },
}
