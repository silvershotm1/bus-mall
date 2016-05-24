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
for (var i = 0; i < imgPhotos.length; i++) {  // Counts the length of each object in the array.
  allProducts.push(new Photo(imgPhotos[i]));  // Pushes info to all products array while creating/generating new photo from imgPhoto array.
}
//FUNCTION
function randPic(min,max) { // Creates a random number and returns that value.
  return Math.floor(Math.random() * (max - min) + min);
}
var random1 = randPic(0,imgPhotos.length); // randPic starts at 0 in array and picks out a random picture from the length of array.
console.log(randPic(0, imgPhotos.length));

var left = document.getElementById('left'); // Prints the picture to the left id tag of image in html file.
left.src = allProducts[random1].imgPath; // The left ID of <img> is pulling a source from image path with a random number random1 and using that random number to select a photo.
