document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#interestForm');
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const loanSanctionDate = document.getElementById('loandate').value;
        const currentDate = document.getElementById('cdate').value;
        let principalAmount = document.querySelector('#pAmount').value;
        const interestRate = document.querySelector('#interest-rate').value;
        const interestType = document.querySelector('#interest-type').value;

        const time = calculateTime(loanSanctionDate, currentDate);
        let amount;

        if (interestType === "monthly") {
            amount = calculateInterest(principalAmount, interestRate, time.totalMonths);
        } else if (interestType === "yearly") {
            amount = calculateInterest(principalAmount, interestRate, time.totalYears);
        }
        displayResult(time, amount, interestRate, interestType, principalAmount);
        saveDataToLocalStorage(loanSanctionDate, principalAmount, currentDate, interestRate, amount.totalAmount, interestType);
    });

    function calculateTime(loanSanctionDate, currentDate) {
        let loanDate = new Date(loanSanctionDate);
        let current = new Date(currentDate);

        let years = current.getFullYear() - loanDate.getFullYear();
        let months = current.getMonth() - loanDate.getMonth();
        let days = current.getDate() - loanDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(current.getFullYear(), current.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        let totalMonths = ((years * 12) + months + (days / 30)).toFixed(2);
        let totalYears = (years + (months / 12) + (days / 365)).toFixed(2);

        return {
            years: years,
            months: months,
            days: days,
            totalMonths: totalMonths,
            totalYears: totalYears,
        }
    }

    function calculateInterest(principal, rate, time) {
        let interest = ((principal * rate * time) / 100).toFixed(2);
        let totalAmount = (parseFloat(principal) + parseFloat(interest)).toFixed(2);

        return {
            interest: interest,
            totalAmount: totalAmount,
        };
    }

    function displayResult(time, amount, interestRate, interestType, principal) {
        document.getElementById('displayValue').innerHTML = `
            <p><span>Time: </span><b>${time.years}</b> years, <b>${time.months}</b> months, and <b>${time.days}</b> days</p>
            <p><span>Principal: </span> <b>${parseInt(principal)}</b></p>
            <p><span>Interest: </span> <b>${amount.interest}</b></p>
            <p><span>Total Amount: </span> <b>${amount.totalAmount}</b> with <b>${interestRate}% ${interestType}</b> interest rate.</p>
        `;
        document.getElementById('generateButton').style.display = "block";
    }

    function saveDataToLocalStorage(loanDate, principal, current, interestRate, totalAmount, interestType) {
        localStorage.setItem('loanDate', loanDate);
        localStorage.setItem('principal', principal);
        localStorage.setItem('current', current);
        localStorage.setItem('interestRate', interestRate);
        localStorage.setItem('totalAmount', totalAmount);
        localStorage.setItem('interestType', interestType);
    }
});

function goToInvoice() {
    window.location.href = 'invoice.html';
}
