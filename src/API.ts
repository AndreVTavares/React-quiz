import { shuffleArray } from './utils';


export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',

}

export enum Category {
    ENTERTAINMENT_BOOKS = 10,
    ENTERTAINMENT_FILM = 11,
    ENTERTAINMENT_MUSIC = 12,
    ENTERTAINMENT_MUSICALS_THEATER = 13,
    ENTERTAINMENT_TELEVISION = 14,
    ENTERTAINMENT_VIDEOGAMES = 15,
    ENTERTAINMENT_BOARDGAMES = 16,

}


export const fetchQuizQuestions = async (amout: number, difficulty: Difficulty, category: Category) => {
    const endpoit = `https://opentdb.com/api.php?amount=${amout}&difficulty=${difficulty}&type=multiple&category=${category}`;

    const data = await (await fetch(endpoit)).json();

    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))


}