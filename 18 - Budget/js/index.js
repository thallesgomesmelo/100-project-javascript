const totalAmount = document.getElementById("total-amount");
const userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let tempAmount = 0;

// Set Budget Functions
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;

  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");

    // Set budget
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    totalAmount.value = "";
  }
});

// Disable edit and delete button function
const disableButtons = bool => {
  const editButtons = document.getElementsByClassName("edit");

  Array.from(editButtons).forEach(element => (element.disable = bool));
};

// Modify list elements function
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;

  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }

  const balance = parseInt(currentBalance) + parseInt(parentAmount);
  balanceValue.innerText = balance;
  expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);

  balanceValue.classList.toggle("error", balance < 0);

  parentDiv.remove();
};

// Create list function
const listCreator = (expenseName, expenseValue) => {
  let subListContent = document.createElement("div");
  subListContent.classList.add("sublist-content", "flex-space");
  list.appendChild(subListContent);
  subListContent.innerHTML = `<p class='product'>${expenseName}</p><p class='amount'>${expenseValue}</p>`;

  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => modifyElement(editButton, true));

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => modifyElement(deleteButton));

  subListContent.appendChild(editButton);
  subListContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(subListContent);
};

// Add expenses function
checkAmountButton.addEventListener("click", () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }

  productTitleError.classList.add("hide");

  // Enable buttons
  disableButtons(false);

  let expenditure = parseInt(userAmount.value);
  let sum = parseInt(expenditureValue.innerText) + expenditure;

  expenditureValue.innerText = sum;

  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;

  balanceValue.classList.toggle("error", totalBalance < 0);

  listCreator(productTitle.value, userAmount.value);

  productTitle.value = "";
  userAmount.value = "";
});
