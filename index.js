console.log("This is my index js file");

// Initialize the news api parameters
source = 'google-news-in';
let apikey = '13efc1b733e54eb99619db67d2a96894'

// Grab the news container
newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request.
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apikey=${apikey}`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {

            let news = `<div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                   <strong>Breaking News ${index+1}</strong> ${element["title"]}
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                                data-bs-parent="#newsAccordion">
                                <div class="accordion-body">${element["content"]}. <a href="${element['url']}" target="_blank">Read more here</a></div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    } else {
        console.log("Some error occured")
    }
}

xhr.send()