function formatMoney(value) {
    return "$" + Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function getNumber(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const value = parseFloat(el.value);
    return isNaN(value) ? null : value;
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // HOURLY → SALARY
    // =========================
    if (document.getElementById("annualSalaryResult")) {
        const btn = document.querySelector(".calc-button");
        if (btn) {
            btn.addEventListener("click", function () {
                const hourlyWage = getNumber("hourlyWage");
                const hoursPerWeek = getNumber("hoursPerWeek");
                const weeksPerYear = getNumber("weeksPerYear");

                if (!hourlyWage || !hoursPerWeek || !weeksPerYear) return;

                const weekly = hourlyWage * hoursPerWeek;
                const annual = weekly * weeksPerYear;
                const monthly = annual / 12;

                setText("annualSalaryResult", formatMoney(annual));
                setText("weeklyIncomeDisplay", formatMoney(weekly));
                setText("monthlyIncomeDisplay", formatMoney(monthly));
                setText("annualIncomeDisplay", formatMoney(annual));
            });
        }
    }

    // =========================
    // SALARY → HOURLY
    // =========================
    if (document.getElementById("hourlyPayResult") && document.getElementById("annualSalary")) {
        const btn = document.querySelector(".calc-button");
        if (btn) {
            btn.addEventListener("click", function () {
                const salary = getNumber("annualSalary");
                const hours = getNumber("hoursPerWeek");
                const weeks = getNumber("weeksPerYear");

                if (!salary || !hours || !weeks) return;

                const hourly = salary / (hours * weeks);

                setText("hourlyPayResult", formatMoney(hourly));
                setText("salaryDisplay", formatMoney(salary));
                setText("hoursDisplay", hours);
                setText("weeksDisplay", weeks);
            });
        }
    }

    // =========================
    // WEEKLY PAY
    // =========================
    if (document.getElementById("weeklyPayResult")) {
        const btn = document.querySelector(".calc-button");
        if (btn) {
            btn.addEventListener("click", function () {
                const rate = getNumber("hourlyRate");
                const hours = getNumber("weeklyHours");
                const tax = getNumber("weeklyTaxRate") || 0;

                if (rate === null || hours === null) return;

                const gross = rate * hours;
                const taxAmount = gross * (tax / 100);
                const net = gross - taxAmount;

                setText("weeklyPayResult", formatMoney(net));
                setText("weeklyGrossDisplay", formatMoney(gross));
                setText("weeklyTaxDisplay", formatMoney(taxAmount));
                setText("weeklyNetDisplay", formatMoney(net));
            });
        }
    }

    // =========================
    // MONTHLY PAY
    // =========================
    if (document.getElementById("monthlyPayResult")) {
        const btn = document.querySelector(".calc-button");
        if (btn) {
            btn.addEventListener("click", function () {
                const type = document.getElementById("incomeType")?.value;
                const amount = getNumber("amount");
                const hours = getNumber("hoursPerWeek");
                const tax = getNumber("monthlyTaxRate") || 0;

                if (amount === null) return;

                let monthly = 0;

                if (type === "salary") {
                    monthly = amount / 12;
                } else if (type === "weekly") {
                    monthly = (amount * 52) / 12;
                } else if (type === "hourly") {
                    if (!hours) return;
                    monthly = (amount * hours * 52) / 12;
                }

                const taxAmount = monthly * (tax / 100);
                const net = monthly - taxAmount;

                setText("monthlyPayResult", formatMoney(net));
                setText("monthlyGrossDisplay", formatMoney(monthly));
                setText("monthlyTaxDisplay", formatMoney(taxAmount));
                setText("monthlyNetDisplay", formatMoney(net));
            });
        }
    }

    // =========================
    // OVERTIME
    // =========================
    if (document.getElementById("overtimeResult")) {
        const btn = document.querySelector(".calc-button");
        if (btn) {
            btn.addEventListener("click", function () {
                const rate = getNumber("hourlyRate");
                const hours = getNumber("overtimeHours");
                const mult = getNumber("multiplier");

                if (rate === null || hours === null || mult === null) return;

                const total = rate * hours * mult;

                setText("overtimeResult", formatMoney(total));
                setText("hourlyDisplay", formatMoney(rate));
                setText("hoursDisplay", hours);
                setText("multiplierDisplay", mult + "x");
            });
        }
    }

    // =========================
    // WORK HOURS
    // =========================
    if (document.getElementById("totalHoursResult")) {
        const btn = document.querySelector(".calc-button");
        if (btn) {
            btn.addEventListener("click", function () {
                const perDay = getNumber("hoursPerDay");
                const days = getNumber("daysWorked");
                const rate = getNumber("hourlyRate");

                if (perDay === null || days === null || rate === null) return;

                const totalHours = perDay * days;
                const totalPay = totalHours * rate;

                setText("totalHoursResult", totalHours.toFixed(2));
                setText("totalHoursDisplay", totalHours.toFixed(2));
                setText("totalPayDisplay", formatMoney(totalPay));
                setText("hourlyRateDisplay", formatMoney(rate));
            });
        }
    }

    // =========================
    // TAKE HOME PAY
    // =========================
    if (document.getElementById("netPayResult")) {
        const btn = document.querySelector(".calc-button");
        if (btn) {
            btn.addEventListener("click", function () {
                const gross = getNumber("grossIncome");
                const tax = getNumber("taxRate");

                if (gross === null || tax === null) return;

                const taxAmount = gross * (tax / 100);
                const net = gross - taxAmount;

                setText("netPayResult", formatMoney(net));
                setText("grossDisplay", formatMoney(gross));
                setText("taxDisplay", formatMoney(taxAmount));
                setText("typeDisplay", document.getElementById("incomeType")?.value || "weekly");
            });
        }
    }

});