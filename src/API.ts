import { shuffleArray } from "./utils";

export type Question = {
    category : string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;

}

export type QuestionState = Question & {answers: string[]};


export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    console.log(data.results);
    
    return data?.results?.map((questions: Question) => (
        {
            ...questions,
            answers: shuffleArray([...questions.incorrect_answers, questions.correct_answer])
        }
    ))
    
}