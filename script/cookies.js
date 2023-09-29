function setCookie(name, value, daysToExpire) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue = encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + cookieValue;
}

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
}

const myTitleCookie = getCookie("myTitle");
const myLogoCookie = getCookie("myLogo");
const myBackgroundCookie = getCookie("myBackground");

const body = document.getElementById('body');
const logo = document.getElementById('logo');
const title = document.getElementById('title');

if (myBackgroundCookie) {
  body.style.backgroundImage = `url(${myBackgroundCookie})`;
}

if (myLogoCookie) {
  logo.src = myLogoCookie;
}

if (myTitleCookie) {
  title.innerText = myTitleCookie;
}

let userAcceptedCookies = false;

// Fungsi untuk menerima cookie
function acceptCookies() {
  userAcceptedCookies = true;
  cookieHandler.setCookies('acceptionCookie', userAcceptedCookies, 362);
}

// Fungsi untuk menolak cookie
function rejectCookies() {
  userAcceptedCookies = false;
  const expirationDate = new Date(0);
  document.cookie = 'acceptionCookie=; expires=' + expirationDate.toUTCString();
  document.cookie = 'myTitleCookie=; expires=' + expirationDate.toUTCString();
  document.cookie = 'myLogoCookie=; expires=' + expirationDate.toUTCString();
  document.cookie = 'myBackgroundCookie=; expires=' + expirationDate.toUTCString();
  alert("Anda telah menolak penggunaan cookie. Beberapa fitur mungkin tidak tersedia.");
}

document.getElementById("acceptCookies").addEventListener("click", handleForm);
document.getElementById("rejectCookies").addEventListener("click", handleForm);