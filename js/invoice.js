document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#loanForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        generateForm();
    });

    function generateForm() {
        const borrower = document.getElementById('borrower').value;
        const lender = document.getElementById('lender').value;

        const loanDate = localStorage.getItem('loanDate');
        const principal = localStorage.getItem('principal');
        const current = localStorage.getItem('current');
        const interestRate = localStorage.getItem('interestRate');
        const totalAmount = localStorage.getItem('totalAmount');
        const interestType = localStorage.getItem('interestType');

        const invoiceData = `
            <h2>Loan Invoice</h2>
            <p><strong>Borrower Name:</strong> ${borrower.toUpperCase()}</p>
            <p><strong>Lender Name:</strong> ${lender.toUpperCase()}</p>
            <p><strong>Date Loan is Made:</strong> ${loanDate}</p>
            <p><strong>Amount of Loan:</strong> ₹${principal}</p>
            <p><strong>Date of Payment:</strong> ${current}</p>
            <p><strong>Interest Rate:</strong> ${interestRate}% ${interestType}</p>
            <p><strong>Total Amount to be Paid:</strong> ₹${totalAmount}</p>
            <br>
            <p><strong>Signature of Borrower:</strong> _________________________</p>
            <br>
            <p><strong>Signature of Lender:</strong> ___________________________</p>
            <br><br>
            <P>This invoice is generated using Mommy ji interest calculator web App which is created by developer <strong>Rishu Raj</strong>, Thanks for using this App❤️.</p>
            <p>Please share your experince on my github profile, rishu2Araj. </p>
        `;

        document.getElementById('agreement').innerHTML = invoiceData;
        document.getElementById('printButton').style.display = 'block';
    }
});

function printInvoice() {
    window.print();
}
