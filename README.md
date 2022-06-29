# A Coding Assessment App

![GIF demo of the application](./assets/images/Coding%20Quiz.gif)

## Screenshots
Screenshot of the application's landing page
![Screenshot of the application's landing page](./assets/images/landing-pg.png)

Screenshot of the application's quiz page
![Screenshot of the application's quiz page](./assets/images/quiz-pg.png)

## Description

To help myself and other fellow developers test our Web Development knowledge and find our weaknesses, I have created this coding assessment app that does just that. The user will have to answer 15 questions on HTML, CSS, and JavaScript within the given timeframe (75 seconds). The catch: for every question they get wrong, 10 seconds are deducted from the countdown. Once the user is done take the quiz, they'll be able to see their score and save it in the high scores board. Don't worry, your information won't be erased unless you press the button that is meant for that.

Questions were gathered from the [W3Schools](https://www.w3schools.com/) website.

## Future Implementations

Future implementations I'd add are:
- Make the timer section more noticeable
- Instant feedback on whether they selected the correct or incorrect answer
- A section where the users can review the correct answers
- As of right now, the scores board doesn't update your highest score-- only re-adds your initials with another score. I want to fix that.

## Code Snippets

```
// Helper function to retrieve data from local storage
function getScoresFromLocalStorage(quizContainer) {
    // Check if localStorage is empty or not to determine what to render
    if (localStorage.getItem("scores") !== null) {
        // Get user info from localStorage
        var arr = JSON.parse(localStorage.getItem("scores"));

        // Order from highest to lowest score by first saving each userScore in an array, sort the array in descending order, and get corresponding userInitials
        var scoreArr = arr.map(userObj => userObj.userScore);
        scoreArr.sort((a, b) => b - a);
        
        // Append localStorage results to the screen in descending order
        for (var i = 0; i < scoreArr.length; i++) {
            var j = 0;
            while (j < arr.length) {
                if (scoreArr[i] === arr[j].userScore) {
                    var result = document.createElement("p");
                    result.setAttribute("class", "score-text");
                    result.textContent = (i + 1) + ". " + arr[j].userInitials + "   -   " + arr[j].userScore;
                    quizContainer.appendChild(result);
                }
                j++;
            }
        } 
    } else {
        // If localStorage is empty, announce user they haven't played yet
        var result = document.createElement("p");
        result.setAttribute("class", "score-text");
        result.textContent = "No scores have been registered yet.";
        quizContainer.appendChild(result);
    }
}
```

To populate the high scores board page, I needed to make sure I was correctly accessing and retrieving the data from the local storage. The first thing I had to check was whether the local storage had any content at all. If it was empty, the function would render a sentence letting the user know they haven't taken the quiz yet and, therefore, no scores can be displayed. In case the local storage isn't empty -- meaning the user has taken the quiz at least once -- we need to make sure we're parsing the content correctly and displaying the scores in descending order. This is how it was done:

1. We make sure we retrieve the data and parse it. Our variable `arr` is an array of JavaScript objects now.
2. I created a separate array (`scoreArr`) that only contains the user scores from the `arr` variable and sort these in descending order.
3. For every element in the `scoreArr` array, we'll iterate through the `arr` array to find its corresponding `userInitials`. Once we do, we'll display the user's initials with their corresponding score.
4. Step 3 will repeat until we have traversed the arrays (which are of the same length).

## Technologies Used

HTML, CSS, JavaScript, and Git

## Deployment link

https://laurasierra17.github.io/coding-assessment/

### User Information
- [LinkedIn](https://www.linkedin.com/in/laurasierra2022)
- [Portfolio](http://www.laura-sierra.com)