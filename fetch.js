
async function fetchUsersData() {
    try {
        const users = await fetch('https://fakestoreapi.com/users');
        if(!users.ok) {
            throw new Error("Unable to fetch users data");
        }
        return await users.json();
    } catch (error) {
        console.log("Unable to fetch users data");
    }
}