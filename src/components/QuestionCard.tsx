import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

// type



type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent <HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQuestions}) => {

    return(
        <Wrapper>
          <p className="number">
            Question: {questionNum} / {totalQuestions}
          </p>
          <p dangerouslySetInnerHTML={{__html: question}}/>
          <div>
            {answers.map((answer)=>(
                <ButtonWrapper 
                 key={answer}
                 correct={userAnswer?.correctAnswer === answer}
                 userClicked={userAnswer?.answer === answer}
                 >
                    <button disabled={!!userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html: answer}} />
                    </button>
                </ButtonWrapper>
            ))}
          </div>
        </Wrapper>
    )
};

export default QuestionCard;