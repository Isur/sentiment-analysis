export interface SentimentRequestDto {
  text: string,
}

export interface SentimentResponseDto {
  sentiment: number,
  text: string,
}
