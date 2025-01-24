// SCRIPT FORMULARIO PAGINA HOME
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.reset(); // Resetar o formulário
    this.formButton.disabled = false; // Reativar o botão de envio
    this.formButton.innerText = "Enviar orçamento"; // Restaurar o texto original do botão
    // Adicionar mensagem de sucesso ao lado do formulário
    this.form.insertAdjacentHTML("afterend", this.settings.success);
  }

  displayError() {
    this.formButton.disabled = false; // Reativar o botão de envio
    this.formButton.innerText = "Enviar orçamento"; // Restaurar o texto original do botão
    // Adicionar mensagem de erro ao lado do formulário
    this.form.insertAdjacentHTML("afterend", this.settings.error);
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    this.formButton.disabled = true;
    this.formButton.innerText = "Enviando..";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      console.error(error);
    }
  }

  init() {
    if (this.form) this.form.addEventListener("submit", this.sendForm); // Mudança aqui para "submit" em vez de "click"
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1>Mensagem enviada com sucesso!</h1>",
  error: "<h1>Não foi possível enviar sua mensagem.</h1>",
});

formSubmit.init();

// cookies
window.onload = function () {
  // Função para definir um cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000); // Definir a expiração em dias
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Função para obter um cookie
  function getCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return null;
  }

  // Função para mostrar a barra de consentimento de cookies
  function showCookieConsent() {
    const consent = getCookie("cookie-consent");
    if (!consent) {
      // Se o consentimento ainda não foi dado
      document.getElementById("cookie-consent-banner").style.display = "block";
    }
  }

  // Evento de aceitação de cookies
  document
    .getElementById("accept-cookies")
    .addEventListener("click", function () {
      setCookie("cookie-consent", "accepted", 365); // Definir o cookie por 365 dias
      document.getElementById("cookie-consent-banner").style.display = "none"; // Ocultar a barra de consentimento
    });

  // Mostrar a barra quando o usuário acessar o site
  showCookieConsent();
};
