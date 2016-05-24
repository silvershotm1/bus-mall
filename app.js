// START OF THE JAVASCRIPT

var imgPhotos = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allProducts = [];

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
  return Math.floor(Math.random() * (max - min) + min);
}
var left = document.getElementById('left'); // Assigning variable for javascript that is taken from the left ID tag of HTML.
var center = document.getElementById('center');
var right = document.getElementById('right');

var random1 = randPic(0,imgPhotos.length);
var random2 = randPic(0,imgPhotos.length);
var random3 = randPic(0,imgPhotos.length); // randPic starts at 0 in array and picks out a random number from the length of array.
function displayPic() {

  console.log(randPic(0, imgPhotos.length));
//WHILE LOOP//
  while (random2 === random1) {
    // randPic(0,imgPhotos.length);
    random2 = randPic(0,imgPhotos.length);
  }

  while (random3 === random1 || random3 === random2){
    // randPic(0,imgPhotos.length);
    random3 = randPic(0,imgPhotos.length);
  }

  left.src = allProducts[random1].imgPath;// The left ID of <img> is pulling a source from image path with a random number random1 and using that random number to select a photo.
  center.src = allProducts[random2].imgPath;
  right.src = allProducts[random3].imgPath;
//Will have an image that we can click on and have a click function. Once the option is clicked it will move on to another image.
}
displayPic();

left.addEventListener('click', handleLeftClick);
center.addEventListener('click', handleCenterClick);
right.addEventListener('click', handleRightClick);

function handleLeftClick(event) {
  allProducts[random1].imgClicked += 1;
  console.log(allProducts[random1].imgClicked + ' clicks for ' + allProducts[random1].imgName);
  random1 = randPic(0,imgPhotos.length);
  // console.log('A picture was clicked');
  displayPic();
}
function handleCenterClick(event) {
  allProducts[random2].imgClicked += 1;
  console.log(allProducts[random2].imgClicked + 'clicks for ' + allProducts[random2].imgName);
  random2 = randPic(0,imgPhotos.length);
  displayPic();
}

function handleRightClick(event) {
  allProducts[random3].imgClicked += 1;
  console.log(allProducts[random3].imgClicked + 'clicks for ' + allProducts[random3].imgName);
  random3 = randPic(0,imgPhotos.length);
  displayPic();
}
