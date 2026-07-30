import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// ----------------------------
// Payment field formatting
// ----------------------------
function setupPaymentFields() {
  const cardNumber = document.querySelector("#cardNumber");
  const expiration = document.querySelector("#expiration");
  const securityCode = document.querySelector("#securityCode");

  if (cardNumber) {
    cardNumber.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      value = value.substring(0, 16);
      value = value.replace(/(.{4})/g, "$1 ").trim();
      e.target.value = value;
    });
  }

  if (expiration) {
    expiration.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      value = value.substring(0, 4);

      if (value.length > 2) {
        value = `${value.substring(0, 2)}/${value.substring(2)}`;
      }

      e.target.value = value;
    });
  }

  if (securityCode) {
    securityCode.addEventListener("input", (e) => {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .substring(0, 4);
    });
  }
}

setupPaymentFields();

// Recalculate totals when the ZIP code changes
document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

// Checkout button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  // Get the checkout form
  const myForm = document.forms["checkout"];

  // Check HTML validation
  const isValid = myForm.checkValidity();

  // Show browser validation messages
  myForm.reportValidity();

  // Only continue if the form is valid
  if (isValid) {
    myCheckout.checkout();
  }
});

// If you prefer using the submit event instead:
//
// document.forms["checkout"].addEventListener("submit", (e) => {
//   e.preventDefault();
//   myCheckout.checkout();
// });
