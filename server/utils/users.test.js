const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },{
                id: '2',
                name: 'Jen',
                room: 'React Course'
            },{
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            }
        ]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123423',
            name: 'John',
            room: 'The Office Fans'
        };
                
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users.length).toBe(1);        
        expect(users.users[0]).toEqual(user);
        expect(resUser).toEqual(user);
    });

    it('should remove a user', () => {        
        var removedUser = users.removeUser('3');
        expect(removedUser.name).toBe('Julie');
    });

    it('should not remove a user', () => {
        var removedUser = users.removeUser('12');
        expect(removedUser).toNotExist();
    });

    it('should find a user', () => {
        var foundUser = users.getUser('1');
        expect(foundUser.name).toBe('Mike');
    });

    it('should not find a user', () => {
        var foundUser = users.getUser('11');
        expect(foundUser).toNotExist();
    });

    it('should get user names for Node Course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    }); 

    it('should get user names for React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    }); 
})