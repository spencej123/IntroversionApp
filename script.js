let intSpan = document.querySelector("#dailyInt");
let totalInteractions =document.querySelector("#total-int");


//Pulling Info from WebAPI
function articleInfo() {
    //WebURL including APIKey
let webUrl = "https://api.nytimes.com/svc/topstories/v2/us.json?api-key=XdqYsMJQiUIzGOnjulFokGyATyRNJe2K"

$.ajax( {
url: webUrl,
method: "GET",
}).then(function (response) {
 let results = response.results;
//Generating random number for articles
   const randomArticle = results[Math.floor(Math.random() * results.length)];
   console.log(response)  
   //console.log("Title: " + randomArticle.title + " Abstract:" + randomArticle.abstract + " Url: " + randomArticle.url)
   //Title of article
let title = randomArticle.title;
   $("#news-titleHtml").text(title)
// Abstract from article
let abstract = randomArticle.abstract;
$("#news-abstractHtml").text(abstract)
//Url for article
let url = randomArticle.url
$("#news-urlHtml").attr({"href": url, "target": "_blank"})
$("#news-urlHtml").text("Click for full article")
//Button click
})}
$("#news-btn").on("click", articleInfo)

//Joke Api

// Creating an AJAX call for the joke.
function jokesAPI() {
const settings = {
   "async": true,
   "crossDomain": true,
   "url": "https://dad-jokes.p.rapidapi.com/random/joke",
   "method": "GET",
   "headers": {
      "x-rapidapi-key": "dc7e6ef494msha69f3a48f05b80dp1609cfjsna8c047a89521",
      "x-rapidapi-host": "dad-jokes.p.rapidapi.com"
   }
};


   $.ajax(settings).done(function (response) {
      console.log(response);
      let setup = $("<p>").text(response.body[0].setup);
      let punchline = $("<p>").text(response.body[0].punchline);
      $("#joke-result").append(setup);
      $("#joke-result").append(punchline);
      console.log(setup); 
      console.log(punchline);   
   })

}

function convoCounter () {
   if (typeof(Storage) !== "undefined"){
      if (localStorage.dailyinteractions) {
         localStorage.dailyinteractions = Number(localStorage.dailyinteractions)+1;
      } else {
         localStorage.dailyinteractions = 1;
      }
      $("#dailyInt").text(localStorage.dailyinteractions);
   } else {
      $("#dailyInt").text("Browser does not support storage");
   }
}

// Get the item from local storage and update the text of the span
function displayInteractions() {
   $("#dailyInt").text(localStorage.getItem("dailyinteractions"))
}

displayInteractions()

// Button to submit a human interaction 
$("#submitInt").on("click", function (){
   displayInteractions();
   convoCounter()
})

$("#joke-btn").on("click", jokesAPI);
 
