export interface Game {
    id: string;
    userId: string;
    isFinished: boolean;
    score: number;
    theme: string;
    difficulty: number;
}