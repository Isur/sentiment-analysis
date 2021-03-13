import { SentimentObject } from "@shared/Interfaces/sentiment.interface";

export interface SentimentAnalyzeRequestDto {
  text: string,
}

export interface SentimentAnalyzeResponseDto extends SentimentObject { }
