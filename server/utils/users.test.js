const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mauri',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Carlos',
      room: 'React Course'
    },{
      id: '3',
      name: 'Juan',
      room: 'Node Course'
    }]
  });
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Mauri',
      room: 'Sistemas'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mauri', 'Juan']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Carlos']);
  });

  it('should remove a user', () => {
    var userId = '3';
    var user = users.removeUser(userId);
    
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '4';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '4';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });
});
