// Tab Switching
function switchTab(tab) {
    document.getElementById('interestTab').classList.remove('active');
    document.getElementById('scientificTab').classList.remove('active');

    if (tab === 'interest') {
        document.getElementById('interestTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.remove('active');
    } else {
        document.getElementById('scientificTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.querySelectorAll('.tab-btn')[0].classList.remove('active');
    }
}

// Simple Interest Calculator Functions
function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);

    if (principal === '' || rate === '' || time === '' || 
        isNaN(principal) || isNaN(rate) || isNaN(time) ||
        principal <= 0 || rate < 0 || time <= 0) {
        alert('Please enter valid positive numbers for all fields');
        return;
    }

    // Formula: Simple Interest = (Principal × Rate × Time) / 100
    const simpleInterest = (principal * rate * time) / 100;

    // Formula: Total Amount = Principal + Simple Interest
    const totalAmount = principal + simpleInterest;

    // Display results with Indian Rupee symbol
    document.getElementById('simpleInterest').innerText = '₹' + simpleInterest.toFixed(2);
    document.getElementById('totalAmount').innerText = '₹' + totalAmount.toFixed(2);
}

function resetForm() {
    document.getElementById('principal').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('time').value = '';

    document.getElementById('simpleInterest').innerText = '₹0.00';
    document.getElementById('totalAmount').innerText = '₹0.00';
}

// Scientific Calculator Functions
function appendDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('display');
    try {
        // Replace Math functions for safe evaluation
        let expression = display.value;
        
        // Handle trigonometric functions - convert degrees to radians
        expression = expression.replace(/Math\.sin\(/g, 'Math.sin(');
        expression = expression.replace(/Math\.cos\(/g, 'Math.cos(');
        expression = expression.replace(/Math\.tan\(/g, 'Math.tan(');
        
        const result = eval(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Keyboard Support for Interest Calculator
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('principal')?.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') calculateInterest();
    });
    document.getElementById('rate')?.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') calculateInterest();
    });
    document.getElementById('time')?.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') calculateInterest();
    });

    // Keyboard support for Scientific Calculator
    document.addEventListener('keydown', function(event) {
        const display = document.getElementById('display');
        if (!display) return;

        if (event.key >= '0' && event.key <= '9') {
            appendDisplay(event.key);
        } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            appendDisplay(event.key);
        } else if (event.key === '.') {
            appendDisplay('.');
        } else if (event.key === 'Enter') {
            calculate();
        } else if (event.key === 'Backspace') {
            backspace();
        } else if (event.key === 'Escape') {
            clearDisplay();
        }
    });
});
