## Assignment 4: Code Quiz (using Javascript and Web API)
---

### User Story (Obtained from the assignment description)

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

### Acceptance Criteria (Obtained from the assignment description)

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

### Expected Final Outcome (Obtained from assignment instruction)
![password generator demo](./assets/images/04-web-apis-homework-demo.gif)

## My Actions and Notes

* Created the project from scratch.
* Used 10 questions in the question set and 75s for total quiz time.
* Basic considerations were as follows:
    * I used one html page for all the views, and used javascript to selectively display or hide appropriate views when different buttons are clicked.
    * When the user clicks "Start Quiz" button, a timer gets started and questions are displayed in sequence.
    * A message is shown at the bottom of the quiz panel showing "Correct!" or "Wrong!" after an answer option is clicked.
    * At any point, if the "View high scores" button is clicked, then the high score table is displayed and the quiz gets reset.

### Repository URL
[Click here to see the final outcome](https://samiul1988.github.io/assignment4_code_quiz/)