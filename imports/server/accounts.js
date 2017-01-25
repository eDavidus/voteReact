// method of accounts, called when a user is created
Accounts.onCreateUser((options, user) => {
    // console.log(options, user);
    // if (options.email == 'test@test1.com') {
    //     user.roles = ['admin'];
    //}
    // user.hair = 'brown';
    // Account creation process needs to return something
    // return user;
    

    if (Meteor.settings.admins.indexOf(options.email) > -1) {
         user.roles = ['admin'];
    }
    // Account creation process needs to return something
    return user;
});