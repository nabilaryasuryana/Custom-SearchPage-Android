Namespace;

class SetCookies {
  constructor() {
    this.name = "";
    this.value = "";
    this.daysToExpire = 0;
  }

  setCookie(name, value, daysToExpire) {
    this.name = name;
    this.value = value;
    this.daysToExpire = daysToExpire;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + this.daysToExpire);

    const cookieValue = encodeURIComponent(this.value) + "; expires=" + expirationDate.toUTCString();
    document.cookie = this.name + "=" + cookieValue;
  }
}

export default SetCookies;