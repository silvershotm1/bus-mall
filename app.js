// START OF THE JAVASCRIPT
var container = document.getElementById('container');
var left = document.getElementById('left'); // Assigning variable for javascript that is taken from the left ID tag of HTML.
var center = document.getElementById('center');
var right = document.getElementById('right');
var seeChart = document.getElementById('seeChart');
var purgeLS = document.getElementById('purgeLS');

var imgPhotos = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allProducts = [];
var clickCounter = 0;  //set counter to zero
var maxClicks = 26;

var clickArray = []; //use array to hold  the numerical data that the chart will render

//CONSTRUCTOR FUNCTION
function Photo(imgName) {
  this.imgPath = 'img/' + imgName + '.jpg';
  this.imgName = imgName;
  this.imgClicked = 0;
  this.imgShown = 0;
}
for (var i = 0; i < imgPhotos.length; i++) {  // going to iterate through the array
  allProducts.push(new Photo(imgPhotos[i]));  // Pushes object instances to all products array while creating object new photo from imgPhoto array.
}
//FUNCTION
function randPic(min,max) { // Creates a random number and returns that value.
  return Math.floor(Math.random() * (max - min)) + min; //fixed random

}
// Completely re-structured my objects and bunched them together.
//Added 25 click counter and if statement
//===============================//
function displayPic() {
  if (clickCounter < 26) {

    var random1 = randPic(0,imgPhotos.length); //First Picture makes random image
    left.src = allProducts[random1].imgPath; // checks image path in allProducts array
    left.alt = allProducts[random1].imgName; // checks image name in allProducts array
    allProducts[random1].imgShown += 1; // img1 was clicked once and tracked.
  // console.log(randPic(0, imgPhotos.length));

    var random2 = randPic(0,imgPhotos.length); // makes image2 a random photo
    while (random2 === random1) { // checks if image2 is same as image
      random2 = randPic(0,imgPhotos.length); // if true gets another photo
    }
    center.src = allProducts[random2].imgPath;
    center.alt = allProducts[random2].imgName;
    allProducts[random2].imgShown += 1;
    // randPic(0,imgPhotos.length);

    var random3 = randPic(0,imgPhotos.length); // checks image3 against image1/image2
    while (random3 === random1 || random3 === random2){
    // randPic(0,imgPhotos.length);
      random3 = randPic(0,imgPhotos.length); // if true selects diff photo from array
    }
    right.src = allProducts[random3].imgPath;
    right.alt = allProducts[random3].imgName;
    allProducts[random3].imgShown += 1;

    clickCounter++; // will add one to the counter based on clicking
  } else {

    console.log('You\'ve reached the MAX of 25 pictures clicked');
    // alert('You\'ve reached the MAX of 25 pictures clicked');
  }
  if (clickCounter === maxClicks) {
    seeChart.style.visibility = 'visible';
    container.removeEventListener('click', handleContainerClick);
    localStorage.setItem('localData', JSON.stringify(allProducts));
    return alert('You\'ve reached the MAX of 25 pictures clicked. Click on the button below the pictures to see a bar graph from you\'re input.');
  } else {
    seeChart.style.visibility = 'hidden';
  }
}
function handleContainerClick() {
  if (event.target.id === 'container') { // if div name equals html name
    return alert('Come on now, click a picture!'); // alerts that picture needs to be clicked
  }
  for (var i = 0; i < allProducts.length; i++) {  // create a loop
    if (event.target.alt === allProducts[i].imgName) {  // checks alt tag is equal to image names in array
      allProducts[i].imgShown += 1; // tracks number of times picture appeared
      console.log(allProducts[i].imgName + ' has ' + allProducts[i].imgShown + ' views.'); // logs msg of views
      allProducts[i].imgClicked += 1;  // tracks number of times picture is clicked.
      clickArray[i] = allProducts[i].imgClicked;  // assigns clicks to the click array.
      console.log(allProducts[i].imgName + ' has ' + allProducts[i].imgClicked + ' clicks.'); //logs mssg of click
    }

  }
  displayPic();  // call function to display pictures.
}

container.addEventListener('click', handleContainerClick);  // click will check if you clicked on pic or not
displayPic(); // call function to re-display pictures.

for (var i = 0; i < imgPhotos.length; i++) {
  clickArray.push(allProducts[i].imgClicked);
}
seeChart.addEventListener('click',drawChart);

/////////////LOCAL STORAGE
(function(){
  if (localStorage.localData) {
    var keyData = JSON.parse(localStorage.getItem('localData'));
    for (var i = 0; i < allProducts.length; i++) {
      allProducts = keyData;
    }
  }
})();

/////////////PURGE LOCAL STORAGE///////////////////////////////////////////

function purgeLocalStorage() { //Function to purge the local storage
  localStorage.clear();  //Clears local storage
}
purgeLS.addEventListener('click', purgeLocalStorage); //

///////////////// STRINGIFY /////////////////////////////////////////////////

/////////////////////////START OF THE CHART!!!!////////////////////////////////
var barClicks = {
  labels: imgPhotos,
  datasets: [
    {
      label: 'Amount of Items Clicked',
      backgroundColor: 'rgba(128, 154, 250, 1)',
      borderColor: 'rgba(9, 51, 206, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0, 31, 143, 1)',
      hoverBorderColor: 'rgba(168, 187, 255, 1)',
      data: clickArray,
    }
  ]
};

function drawChart() {
  var ctx = document.getElementById('chart_out').getContext('2d');

  var cData = new Chart(ctx, {
    type: 'bar',
    data: barClicks,
    // options: options
  });
}
// drawChart();
