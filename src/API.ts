
export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'

}


export const fetchQuizQuestions = async (amout: number, difficulty: Difficulty) => {
    const endpoit = `https://opentdb.com/api.php?amount=${amout}&difficulty=${difficulty}&type=multiple`;

    const data = await ( await fetch(endpoit)).json();

    console.log(data);


}