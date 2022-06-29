export async function getExpensesByUserId(uid) {
    return await fetch(`/api/mongo/${uid}/expenses`, {
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
            category: expense.category,
            date: expense.date
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
}


export async function deleteExpense(_id){
    return await fetch(`/api/mongo/expenses/${_id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
}

