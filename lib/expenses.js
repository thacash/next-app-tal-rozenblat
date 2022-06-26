export async function getExpensesByUserId() {
    return await fetch(`/api/mongo/expenses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'applicationg/json'
        }
    }).then((response) => response.json());
}

export async function addExpense(expense) {
    return await fetch(`/api/mongo/expenses`, {
        method: 'POST',
        body: JSON.stringify({ 
            userId: expense.userId,
            createdAt: expense.createdAt,
            amount: expense.amount,
            desc: expense.desc ? expense.desc : '',
            category: expense.category
        }),
        headers: {
            'Content-Type': 'applicationg/json'
        }
    }).then((response) => response.json());
}