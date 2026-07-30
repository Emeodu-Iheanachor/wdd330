import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

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
