export async function getCategoriesByUserId(uid) {
    return await fetch(`/api/mongo/${uid}/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'applicationg/json'
        }
    }).then((response) => response.json());
}

export async function addCategory(category) {
    return await fetch(`/api/mongo/categories`, {
        method: 'POST',
        body: JSON.stringify({ 
            userId: category.userId,
            category: category.category,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
}


export async function deleteCategory(_id){
    return await fetch(`/api/mongo/categories/${_id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
}

