const imgUrl = "https://picsum.photos/v2/list?page=1&limit=100";
const imgMaxHeight = "100px";
const users = [];
init();

async function init() {
  const images = await getImages();
  createUsers(images);
  addTitles();
}

function createUsers(images) {
  images.forEach((image) => {
    users.push({
      username: generateName(),
      description: generateDescription(),
      image: image.download_url,
      age: numberGenerator(18, 200),
    });
  });
}
function addTitles() {
  const mainDiv = document.getElementById("mainContainer");
  mainDiv.innerHTML = "";
  users.forEach((user) => {
    const tile = createTile(user);
    mainDiv.appendChild(tile);
  });
}
async function getImages() {
  try {
    const res = await axios.get(imgUrl);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

function createTile(user) {
  const tile = document.createElement("div");
  tile.className = "tile";

  //Insert image
  const img = document.createElement("img");
  img.src = user.image;
  img.alt = `${user.username} Image`;
  img.style.maxWidth = "100%";
  img.style.maxHeight = imgMaxHeight;
  const imgDiv = document.createElement("div");
  imgDiv.appendChild(img);
  tile.appendChild(imgDiv);

  const name = document.createElement("p");
  name.appendChild(document.createTextNode(`Username: ${user.username}`));
  tile.appendChild(name);

  const ageElement = document.createElement("p");
  ageElement.appendChild(document.createTextNode(`Age: ${user.age}`));
  tile.appendChild(ageElement);

  const descriptionElem = document.createElement("p");
  descriptionElem.appendChild(
    document.createTextNode(`Description: ${user.description}`)
  );
  tile.appendChild(descriptionElem);
  return tile;
}
function numberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function generateDescription() {
  const length = numberGenerator(10, 400);
  return generate(length);
}
function generateName() {
  const firstName = numberGenerator(1, 10);
  const lastName = numberGenerator(1, 10);
  return `${generate(firstName)} ${generate(lastName)}`;
}
function generate(length) {
  let aString = "";
  for (i = 0; i < length; i++) {
    aString += generateLetter();
  }
  return aString;
}
function generateLetter() {
  const charSet = "abcdefghijklmnopqrxtuvwxyz ";
  return charSet.charAt(numberGenerator(0, charSet.length));
}

function sort() {
  const value = document.getElementById("sortSelector").value;
  if (value === "username") {
    users.sort((a, b) => {
      if (a.username > b.username) return 1;
      if (a.username < b.username) return -1;
      return 0;
    });
    addTitles();
  }
  if (value === "age") {
    users.sort((a, b) => {
      if (a.age > b.age) return 1;
      if (a.age < b.age) return -1;
      return 0;
    });
    addTitles();
  }
}
