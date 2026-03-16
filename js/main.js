function formatCurrency(value) {
    return "$" + value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calculateAfterTax(amount, taxRate) {
    return amount * (1 - taxRate / 100);
}

/* Hourly to Salary */
const calculateButton = document.getElementById("calculateButton");
const resetHourlyButton = document.getElementById("resetHourlyButton");

if (calculateButton) {
    calculateButton.addEventListener("click", function () {
        const hourlyRate = parseFloat(document.getElementById("hourlyRate").value);
        const hoursPerWeek = parseFloat(document.getElementById("hoursPerWeek").value);
        const weeksPerYear = parseFloat(document.getElementById("weeksPerYear").value);
        const taxRate = parseFloat(document.getElementById("hourlyTaxRate").value);

        if (
            isNaN(hourlyRate) ||
            isNaN(hoursPerWeek) ||
            isNaN(weeksPerYear) ||
            isNaN(taxRate) ||
            hourlyRate < 0 ||
            hoursPerWeek <= 0 ||
            weeksPerYear <= 0 ||
            taxRate < 0 ||
            taxRate > 100
        ) {
            alert("Please fill in all fields with valid numbers.");
            return;
        }

        const annualSalary = hourlyRate * hoursPerWeek * weeksPerYear;
        const monthlySalary = annualSalary / 12;
        const weeklySalary = annualSalary / weeksPerYear;

        const annualAfterTax = calculateAfterTax(annualSalary, taxRate);
        const monthlyAfterTax = calculateAfterTax(monthlySalary, taxRate);
        const weeklyAfterTax = calculateAfterTax(weeklySalary, taxRate);

        document.getElementById("annualResult").textContent = formatCurrency(annualSalary);
        document.getElementById("annualAfterTaxResult").textContent = formatCurrency(annualAfterTax);

        document.getElementById("monthlyResult").textContent = formatCurrency(monthlySalary);
        document.getElementById("monthlyAfterTaxResult").textContent = formatCurrency(monthlyAfterTax);

        document.getElementById("weeklyResult").textContent = formatCurrency(weeklySalary);
        document.getElementById("weeklyAfterTaxResult").textContent = formatCurrency(weeklyAfterTax);
    });
}

if (resetHourlyButton) {
    resetHourlyButton.addEventListener("click", function () {
        document.getElementById("hourlyRate").value = "";
        document.getElementById("hoursPerWeek").value = "";
        document.getElementById("weeksPerYear").value = "52";
        document.getElementById("hourlyTaxRate").value = "20";

        document.getElementById("annualResult").textContent = "$0.00";
        document.getElementById("annualAfterTaxResult").textContent = "$0.00";

        document.getElementById("monthlyResult").textContent = "$0.00";
        document.getElementById("monthlyAfterTaxResult").textContent = "$0.00";

        document.getElementById("weeklyResult").textContent = "$0.00";
        document.getElementById("weeklyAfterTaxResult").textContent = "$0.00";
    });
}

/* Salary to Hourly */
const salaryCalculateButton = document.getElementById("salaryCalculateButton");
const resetSalaryButton = document.getElementById("resetSalaryButton");

if (salaryCalculateButton) {
    salaryCalculateButton.addEventListener("click", function () {
        const annualSalary = parseFloat(document.getElementById("annualSalaryInput").value);
        const hoursPerWeek = parseFloat(document.getElementById("salaryHoursPerWeek").value);
        const weeksPerYear = parseFloat(document.getElementById("salaryWeeksPerYear").value);
        const taxRate = parseFloat(document.getElementById("salaryTaxRate").value);

        if (
            isNaN(annualSalary) ||
            isNaN(hoursPerWeek) ||
            isNaN(weeksPerYear) ||
            isNaN(taxRate) ||
            annualSalary < 0 ||
            hoursPerWeek <= 0 ||
            weeksPerYear <= 0 ||
            taxRate < 0 ||
            taxRate > 100
        ) {
            alert("Please fill in all fields with valid numbers.");
            return;
        }

        const totalHoursPerYear = hoursPerWeek * weeksPerYear;
        const hourlyPay = annualSalary / totalHoursPerYear;
        const hourlyPayAfterTax = calculateAfterTax(hourlyPay, taxRate);

        document.getElementById("hourlyPayResult").textContent = formatCurrency(hourlyPay);
        document.getElementById("hourlyPayAfterTaxResult").textContent = formatCurrency(hourlyPayAfterTax);
    });
}

if (resetSalaryButton) {
    resetSalaryButton.addEventListener("click", function () {
        document.getElementById("annualSalaryInput").value = "";
        document.getElementById("salaryHoursPerWeek").value = "";
        document.getElementById("salaryWeeksPerYear").value = "52";
        document.getElementById("salaryTaxRate").value = "20";

        document.getElementById("hourlyPayResult").textContent = "$0.00";
        document.getElementById("hourlyPayAfterTaxResult").textContent = "$0.00";
    });
}

/* Overtime */
const overtimeCalculateButton = document.getElementById("overtimeCalculateButton");
const resetOvertimeButton = document.getElementById("resetOvertimeButton");

if (overtimeCalculateButton) {
    overtimeCalculateButton.addEventListener("click", function () {
        const hourlyRate = parseFloat(document.getElementById("overtimeHourlyRate").value);
        const overtimeHours = parseFloat(document.getElementById("overtimeHours").value);
        const overtimeMultiplier = parseFloat(document.getElementById("overtimeMultiplier").value);
        const taxRate = parseFloat(document.getElementById("overtimeTaxRate").value);

        if (
            isNaN(hourlyRate) ||
            isNaN(overtimeHours) ||
            isNaN(overtimeMultiplier) ||
            isNaN(taxRate) ||
            hourlyRate < 0 ||
            overtimeHours < 0 ||
            overtimeMultiplier <= 0 ||
            taxRate < 0 ||
            taxRate > 100
        ) {
            alert("Please fill in all fields with valid numbers.");
            return;
        }

        const overtimePay = hourlyRate * overtimeMultiplier * overtimeHours;
        const overtimePayAfterTax = calculateAfterTax(overtimePay, taxRate);

        document.getElementById("overtimePayResult").textContent = formatCurrency(overtimePay);
        document.getElementById("overtimePayAfterTaxResult").textContent = formatCurrency(overtimePayAfterTax);
    });
}

if (resetOvertimeButton) {
    resetOvertimeButton.addEventListener("click", function () {
        document.getElementById("overtimeHourlyRate").value = "";
        document.getElementById("overtimeHours").value = "";
        document.getElementById("overtimeMultiplier").value = "1.5";
        document.getElementById("overtimeTaxRate").value = "20";

        document.getElementById("overtimePayResult").textContent = "$0.00";
        document.getElementById("overtimePayAfterTaxResult").textContent = "$0.00";
    });
}

/* Work Hours */
const workHoursCalculateButton = document.getElementById("workHoursCalculateButton");
const resetWorkHoursButton = document.getElementById("resetWorkHoursButton");

if (workHoursCalculateButton) {
    workHoursCalculateButton.addEventListener("click", function () {
        const hoursPerDay = parseFloat(document.getElementById("hoursPerDay").value);
        const daysWorked = parseFloat(document.getElementById("daysWorked").value);
        const hourlyRate = parseFloat(document.getElementById("workHourlyRate").value);
        const taxRate = parseFloat(document.getElementById("workTaxRate").value);

        if (
            isNaN(hoursPerDay) ||
            isNaN(daysWorked) ||
            isNaN(hourlyRate) ||
            isNaN(taxRate) ||
            hoursPerDay < 0 ||
            daysWorked < 0 ||
            hourlyRate < 0 ||
            taxRate < 0 ||
            taxRate > 100
        ) {
            alert("Please fill in all fields with valid numbers.");
            return;
        }

        const totalHours = hoursPerDay * daysWorked;
        const totalPay = totalHours * hourlyRate;
        const totalPayAfterTax = calculateAfterTax(totalPay, taxRate);

        document.getElementById("totalHoursResult").textContent = totalHours.toFixed(2);
        document.getElementById("totalPayResult").textContent = formatCurrency(totalPay);
        document.getElementById("totalPayAfterTaxResult").textContent = formatCurrency(totalPayAfterTax);
    });
}

if (resetWorkHoursButton) {
    resetWorkHoursButton.addEventListener("click", function () {
        document.getElementById("hoursPerDay").value = "";
        document.getElementById("daysWorked").value = "";
        document.getElementById("workHourlyRate").value = "";
        document.getElementById("workTaxRate").value = "20";

        document.getElementById("totalHoursResult").textContent = "0.00";
        document.getElementById("totalPayResult").textContent = "$0.00";
        document.getElementById("totalPayAfterTaxResult").textContent = "$0.00";
    });
}