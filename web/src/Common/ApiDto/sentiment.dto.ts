import { SentimentObject } from "../Interfaces/sentiment.interface";

export interface SentimentRequestDto {
  text: string,
}

export interface SentimentResponseDto extends SentimentObject {}
