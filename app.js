// console.log("linked")
// console.log($)
$(document).ready(function() {

    let quote;
  // pull from Forismatic API
    function getNewQuote() {
      $.ajax({
        url: 'http://api.forismatic.com/api/1.0/',
        jsonp: 'jsonp', //enables use of API
        dataType: 'jsonp',
        data: {
          method: 'getQuote',
          lang: 'en',
          format: 'jsonp'
        },
        success: function(response) {
          quote = response.quoteText;
          $('#quote').text(response.quoteText);
          if (response.quoteAuthor) {
            $('#author').text('said by ' + response.quoteAuthor);
          } else {
            $('#author').text('- unknown');
          }
        }
      });
    }
    getNewQuote();

  // new quote and twitter button
    $('.get-quote').on('click', function(e) {
      e.preventDefault();
      getNewQuote();
    });
  
    $('.share-quote').on('click', function(e) {
      e.preventDefault();
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote));
    });

  // change background color on load
  let bgColorArray = ['#8A8986','#498057','#E999E5'],
    selectBG = 
  bgColorArray[Math.floor(Math.random() * bgColorArray.length)];

$('body').css('background-color', selectBG)

});

// quote carousel
let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("quote-box");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}