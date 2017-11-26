[{
    id: '/#124sadflkasjdfsd',
    name: 'John',
    room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor() {
        this.users =[];
    }

    addUser(id, name, room) {
        var user = { id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i].id === id) {                
                return this.users.splice(i, 1)[0];
            }
        }

        return null;
    }

    getUser(id) {
        var userList = this.users.filter((user) => user.id === id);
        if(userList.length > 0) return userList[0];
        return null;
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};