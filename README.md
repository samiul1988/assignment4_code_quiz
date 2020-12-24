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
![password generator demo](./assets/iamges/04-web-apis-homework-demo.gif)

## My Actions and Notes

* Obtained the starter code from Gitlab repo.
* Modified the javascript file to meet the acceptance criteria
* Basic considerations were as follows:
    * When the user clicks "Generate Password" button, a series of prompt appears to collect length and character type information.
    * The inputs are validated on-the-fly and information is stored in a global object
    * If a particular character type is selected, then it is ensured that at least one character of that type will be present in the password
    * The characters were selected randomly from appropriate list of characters 
* I included "space" as part of special character set (may not be used in practice, but I considered all characters mentioned in [here](https://owasp.org/www-community/password-special-characters))
* The task can be completed in different ways; however, I tried to use a similar structure that was presented in Module 3 lessons

### Repository URL
[Click here to see the final outcome](https://samiul1988.github.io/assignment3_password_generator/)