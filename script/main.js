function setCookie(name, value, daysToExpire) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue = encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + cookieValue;
}
// Mendapatkan elemen dengan properti background-image
const background = document.getElementById('body');

// Mendapatkan nilai background-image dari elemen tersebut
const style = getComputedStyle(background);
const backgroundImage = style.getPropertyValue('background-image');

// Mendapatkan URL gambar dari properti background-image
const imageUrl = backgroundImage.match(/url\("(.+)"\)/)[1];

// Buat elemen gambar sementara untuk mengambil warna dominan
const tempImage = new Image();
tempImage.src = imageUrl;

// Tunggu hingga gambar dimuat
tempImage.onload = function () {
  // Buat elemen canvas untuk menganalisis gambar
  const canvas = document.createElement('canvas');
  canvas.width = tempImage.width;
  canvas.height = tempImage.height;
  const context = canvas.getContext('2d');
  context.drawImage(tempImage, 0, 0, tempImage.width, tempImage.height);

  // Ambil data piksel dari gambar
  const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;

  // Analisis data piksel untuk menentukan warna dominan
  let dominantColor = calculateDominantColor(pixelData);

  // Ubah warna teks agar berkontras dengan warna dominan
  console.log(dominantColor)
  changeTextColorForContrast(dominantColor);
};

// Fungsi untuk menghitung warna dominan dari data piksel
function calculateDominantColor(pixelData) {
  const colorCounts = {};
  let maxColor = '';
  let maxCount = 0;

  for (let i = 0; i < pixelData.length; i += 4) {
    const red = pixelData[i];
    const green = pixelData[i + 1];
    const blue = pixelData[i + 2];
    const rgb = `${red},${green},${blue}`;

    if (colorCounts[rgb]) {
      colorCounts[rgb]++;
    } else {
      colorCounts[rgb] = 1;
    }

    if (colorCounts[rgb] > maxCount) {
      maxCount = colorCounts[rgb];
      maxColor = rgb;
    }
  }
  return `rgb(${maxColor})`;
}

function changeTextColorForContrast(dominantColor) {
  const colorArray = dominantColor.match(/\d+/g);
  const red = parseInt(colorArray[0]);
  const green = parseInt(colorArray[1]);
  const blue = parseInt(colorArray[2]);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  const textElements = document.querySelectorAll('p, span, h1, h2, h3');
  textElements.forEach(element => {
    if (brightness < 128) {
      element.style.color = 'white';
    } else {
      element.style.color = 'black';
    }
  });
}

function handleForm() {
  const titleInput = document.getElementsByName('setTitle')[0];
  const logoInput = document.getElementById('setLogo').files[0];
  const backgroundInput = document.getElementById('setBackground').files[0];
  
  const title = titleInput.value;
  let base64ImageLogo; // Deklarasi variabel base64ImageLogo

  if (title) {
    setCookie("myTitle", title, 362); // Menggunakan title, bukan base64ImageLogo
    console.log("title ok");
  }

  if (logoInput) {
    const reader = new FileReader();
    reader.onload = function (event) {
      base64ImageLogo = event.target.result; // Mengisi base64ImageLogo
      setCookie("myLogo", base64ImageLogo, 362);
      console.log("logo ok");
    };
    reader.readAsDataURL(logoInput);
  }
  
  if (backgroundInput) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64ImageBackground = event.target.result;
      setCookie("myBackground", base64ImageBackground, 362);
      console.log("background ok");
    };
    reader.readAsDataURL(backgroundInput);
  }
}

document.getElementById("save").addEventListener("click", handleForm);