$(document).ready(onReady);

let employeeArray = [];
let monthlySalary = 0;
let monthlyBudget = 20000;

function onReady() {
    $('#employeeForm').on('submit', employeeFormSubmit);
    $('#container').on('click', '.js-deleteBtn', deleteEmployee);
}

function employeeFormSubmit(event) {
    event.preventDefault();

    let enteredEmployee = {};

    $(this).serializeArray().forEach(function(item){
        enteredEmployee[item.name] = item.value;
    });

    $(this).trigger('reset');

    employeeArray.push(enteredEmployee);
    redrawEmployeeInfo();
}

function deleteEmployee() {
    let container = $(this).parent();

    employeeArray.splice(container.data('deleteid'), 1);
    redrawEmployeeInfo();
}

function redrawEmployeeInfo() {
    $('#container').empty();
    for (let i = 0; i < employeeArray.length; i++) {
        $('#container').append('<div></div>');
        let divJustCreated = $('#container').children().last();
        divJustCreated.data('deleteid', i);
        let employee = employeeArray[i];
        divJustCreated.append('<p>' + employee.firstName + '</p>');
        divJustCreated.append('<p>' + employee.lastName + '</p>');
        divJustCreated.append('<p>' + employee.id + '</p>');
        divJustCreated.append('<p>' + employee.title + '</p>');
        divJustCreated.append('<p>' + employee.salary + '</p>');
        divJustCreated.append('<button class="js-deleteBtn">Delete</button>');
    }

    // Calculate the stuff
    calculateMonthlySalary();
    $('#footer').empty();
    $('#footer').append('<h2>Monthly Salary: ' + monthlySalary + '</h2>');
    if(monthlySalary > monthlyBudget) {
        $('#footer').addClass('danger');
    }
}

function calculateMonthlySalary() {
    monthlySalary = 0;
    let salaryTotal = 0;

    for (let i = 0; i < employeeArray.length; i++) {
        let employee = employeeArray[i];
        salaryTotal += parseInt(employee.salary);
    }

    monthlySalary = salaryTotal/12;
}