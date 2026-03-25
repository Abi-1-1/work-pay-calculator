document.addEventListener("DOMContentLoaded", () => {
  const budgetPeriod = document.getElementById("budgetPeriod");
  const incomeType = document.getElementById("incomeType");
  const incomeAmount = document.getElementById("incomeAmount");
  const hoursPerWeek = document.getElementById("hoursPerWeek");
  const weeksPerMonth = document.getElementById("weeksPerMonth");
  const hoursField = document.getElementById("hoursField");
  const weeksField = document.getElementById("weeksField");

  const inputs = {
    rent: document.getElementById("rent"),
    food: document.getElementById("food"),
    transport: document.getElementById("transport"),
    utilities: document.getElementById("utilities"),
    loans: document.getElementById("loans"),
    emergency: document.getElementById("emergency"),
    personal: document.getElementById("personal"),
    other: document.getElementById("other"),
  };

  const totalIncomeEl = document.getElementById("totalIncome");
  const totalExpensesEl = document.getElementById("totalExpenses");
  const moneyLeftEl = document.getElementById("moneyLeft");
  const spentPercentEl = document.getElementById("spentPercent");
  const expenseTableBody = document.getElementById("expenseTableBody");
  const recommendedTableBody = document.getElementById("recommendedTableBody");
  const dailyRecommendationBody = document.getElementById("dailyRecommendationBody");
  const progressBars = document.getElementById("progressBars");
  const calculateBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const healthBox = document.getElementById("healthBox");
  const budgetHealth = document.getElementById("budgetHealth");
  const budgetHealthText = document.getElementById("budgetHealthText");

  const needsAmount = document.getElementById("needsAmount");
  const wantsAmount = document.getElementById("wantsAmount");
  const savingsAmount = document.getElementById("savingsAmount");

  if (
    !budgetPeriod || !incomeType || !incomeAmount || !hoursPerWeek || !weeksPerMonth ||
    !hoursField || !weeksField || !calculateBtn || !resetBtn
  ) {
    console.error("Budget calculator: required elements were not found.");
    return;
  }

  const recommendedPercentages = {
    rent: 30,
    food: 12,
    transport: 10,
    utilities: 7,
    loans: 8,
    emergency: 15,
    personal: 10,
    other: 8
  };

  function money(value) {
    const safeValue = Number.isFinite(value) ? value : 0;
    return `$${safeValue.toFixed(2)}`;
  }

  function num(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function toggleIncomeFields() {
    const type = incomeType.value;
    const period = budgetPeriod.value;

    if (type === "hourly") {
      hoursField.style.display = "block";
      weeksField.style.display = period === "monthly" ? "block" : "none";
    } else {
      hoursField.style.display = "none";
      weeksField.style.display = "none";
    }
  }

  function calculateIncome() {
    const type = incomeType.value;
    const period = budgetPeriod.value;
    const amount = num(incomeAmount.value);
    const hours = num(hoursPerWeek.value);
    const weeks = num(weeksPerMonth.value) || 4.33;

    let income = 0;

    if (type === "hourly") {
      income = period === "weekly" ? amount * hours : amount * hours * weeks;
    } else if (type === "weekly") {
      income = period === "weekly" ? amount : amount * 4.33;
    } else if (type === "monthly") {
      income = period === "monthly" ? amount : amount / 4.33;
    }

    return income;
  }

  function getExpenses() {
    return [
      { key: "rent", name: "Housing / Rent", amount: num(inputs.rent.value) },
      { key: "food", name: "Food / Groceries", amount: num(inputs.food.value) },
      { key: "transport", name: "Transport", amount: num(inputs.transport.value) },
      { key: "utilities", name: "Utilities", amount: num(inputs.utilities.value) },
      { key: "loans", name: "Loans / Debt", amount: num(inputs.loans.value) },
      { key: "emergency", name: "Emergency Fund / Savings", amount: num(inputs.emergency.value) },
      { key: "personal", name: "Personal / Wants", amount: num(inputs.personal.value) },
      { key: "other", name: "Other", amount: num(inputs.other.value) }
    ];
  }

  function renderExpenseTable(expenses, totalIncome, totalExpenses) {
    if (totalIncome <= 0) {
      expenseTableBody.innerHTML = `<tr><td colspan="4">Please enter a valid income amount.</td></tr>`;
      return;
    }

    const rows = expenses.map((item) => {
      const incomePercent = totalIncome > 0 ? (item.amount / totalIncome) * 100 : 0;
      const expensePercent = totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0;

      return `
        <tr>
          <td>${item.name}</td>
          <td>${money(item.amount)}</td>
          <td>${incomePercent.toFixed(1)}%</td>
          <td>${expensePercent.toFixed(1)}%</td>
        </tr>
      `;
    }).join("");

    expenseTableBody.innerHTML = rows;
  }

  function renderRecommendedTable(expenses, totalIncome) {
    if (totalIncome <= 0) {
      recommendedTableBody.innerHTML = `<tr><td colspan="3">Recommendations will appear after calculation.</td></tr>`;
      return;
    }

    const rows = expenses.map((item) => {
      const recommendedPercent = recommendedPercentages[item.key];
      const recommendedAmount = totalIncome * (recommendedPercent / 100);

      return `
        <tr>
          <td>${item.name}</td>
          <td>${recommendedPercent}%</td>
          <td>${money(recommendedAmount)}</td>
        </tr>
      `;
    }).join("");

    recommendedTableBody.innerHTML = rows;
  }

  function renderDailyRecommendations(totalIncome) {
    if (totalIncome <= 0) {
      dailyRecommendationBody.innerHTML = `<tr><td colspan="2">Daily recommendations will appear after calculation.</td></tr>`;
      return;
    }

    const period = budgetPeriod.value;
    const days = period === "monthly" ? 30 : 7;

    const dailyFood = (totalIncome * (recommendedPercentages.food / 100)) / days;
    const dailyPersonal = (totalIncome * (recommendedPercentages.personal / 100)) / days;
    const dailyTransport = (totalIncome * (recommendedPercentages.transport / 100)) / days;
    const dailyOther = (totalIncome * (recommendedPercentages.other / 100)) / days;

    dailyRecommendationBody.innerHTML = `
      <tr>
        <td>Recommended daily food budget</td>
        <td>${money(dailyFood)}</td>
      </tr>
      <tr>
        <td>Daily personal spending limit</td>
        <td>${money(dailyPersonal)}</td>
      </tr>
      <tr>
        <td>Recommended daily transport budget</td>
        <td>${money(dailyTransport)}</td>
      </tr>
      <tr>
        <td>Recommended daily flexible / other spending</td>
        <td>${money(dailyOther)}</td>
      </tr>
    `;
  }

  function renderProgressBars(expenses, totalIncome) {
    if (totalIncome <= 0) {
      progressBars.innerHTML = `<p class="budget-note">Progress bars will appear after calculation.</p>`;
      return;
    }

    const bars = expenses.map((item) => {
      const percent = totalIncome > 0 ? (item.amount / totalIncome) * 100 : 0;
      let statusClass = "";

      if (percent >= 25) {
        statusClass = "danger";
      } else if (percent >= 15) {
        statusClass = "warning";
      }

      const width = Math.min(percent, 100);

      return `
        <div class="budget-progress-item">
          <div class="budget-progress-top">
            <span>${item.name}</span>
            <span>${percent.toFixed(1)}% of income</span>
          </div>
          <div class="budget-progress-bar">
            <div class="budget-progress-fill ${statusClass}" style="width: ${width}%"></div>
          </div>
        </div>
      `;
    }).join("");

    progressBars.innerHTML = bars;
  }

  function renderBudgetHealth(spentPercent, moneyLeft) {
    healthBox.classList.remove("budget-health-healthy", "budget-health-warning", "budget-health-overspending");

    if (moneyLeft < 0 || spentPercent > 100) {
      healthBox.classList.add("budget-health-overspending");
      budgetHealth.textContent = "Overspending";
      budgetHealthText.textContent = "Your expenses are higher than your income for this period. You should reduce some categories or increase income.";
    } else if (spentPercent >= 80) {
      healthBox.classList.add("budget-health-warning");
      budgetHealth.textContent = "Warning";
      budgetHealthText.textContent = "Your budget is tight. You still have money left, but your spending is already using most of your income.";
    } else {
      healthBox.classList.add("budget-health-healthy");
      budgetHealth.textContent = "Healthy";
      budgetHealthText.textContent = "Your budget looks balanced. You still have room left after expenses, which is healthier for stability and savings.";
    }
  }

  function renderRule503020(totalIncome) {
    if (totalIncome <= 0) {
      needsAmount.textContent = "$0.00";
      wantsAmount.textContent = "$0.00";
      savingsAmount.textContent = "$0.00";
      return;
    }

    needsAmount.textContent = money(totalIncome * 0.50);
    wantsAmount.textContent = money(totalIncome * 0.30);
    savingsAmount.textContent = money(totalIncome * 0.20);
  }

  function renderResults() {
    const totalIncome = calculateIncome();
    const expenses = getExpenses();
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const moneyLeft = totalIncome - totalExpenses;
    const spentPercent = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

    totalIncomeEl.textContent = money(totalIncome);
    totalExpensesEl.textContent = money(totalExpenses);
    moneyLeftEl.textContent = money(moneyLeft);
    spentPercentEl.textContent = `${spentPercent.toFixed(1)}%`;

    moneyLeftEl.classList.remove("budget-positive", "budget-negative");
    moneyLeftEl.classList.add(moneyLeft >= 0 ? "budget-positive" : "budget-negative");

    renderExpenseTable(expenses, totalIncome, totalExpenses);
    renderRecommendedTable(expenses, totalIncome);
    renderDailyRecommendations(totalIncome);
    renderProgressBars(expenses, totalIncome);
    renderBudgetHealth(spentPercent, moneyLeft);
    renderRule503020(totalIncome);
  }

  function resetCalculator() {
    budgetPeriod.value = "monthly";
    incomeType.value = "hourly";
    incomeAmount.value = "";
    hoursPerWeek.value = "";
    weeksPerMonth.value = "4.33";

    Object.values(inputs).forEach((input) => {
      input.value = "";
    });

    totalIncomeEl.textContent = "$0.00";
    totalExpensesEl.textContent = "$0.00";
    moneyLeftEl.textContent = "$0.00";
    moneyLeftEl.classList.remove("budget-positive", "budget-negative");
    spentPercentEl.textContent = "0%";

    budgetHealth.textContent = "Not calculated yet";
    budgetHealthText.textContent = "Add your income and expenses to see your budget status.";
    healthBox.classList.remove("budget-health-healthy", "budget-health-warning", "budget-health-overspending");

    expenseTableBody.innerHTML = `<tr><td colspan="4">Enter your numbers and click “Calculate Budget”.</td></tr>`;
    recommendedTableBody.innerHTML = `<tr><td colspan="3">Recommendations will appear after calculation.</td></tr>`;
    dailyRecommendationBody.innerHTML = `<tr><td colspan="2">Daily recommendations will appear after calculation.</td></tr>`;
    progressBars.innerHTML = `<p class="budget-note">Progress bars will appear after calculation.</p>`;

    needsAmount.textContent = "$0.00";
    wantsAmount.textContent = "$0.00";
    savingsAmount.textContent = "$0.00";

    toggleIncomeFields();
  }

  calculateBtn.addEventListener("click", renderResults);
  resetBtn.addEventListener("click", resetCalculator);
  incomeType.addEventListener("change", toggleIncomeFields);
  budgetPeriod.addEventListener("change", toggleIncomeFields);

  toggleIncomeFields();
});