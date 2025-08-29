const testUsers = [
    {
        name: 'Standard User',
        credentials: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        shippingInfo: {
            firstName: 'udula',
            lastName: 'eranda',
            zipCode: 'abc'
        }
    },
    {
        name: 'Problem User',
        credentials: {
            username: 'problem_user',
            password: 'secret_sauce'
        },
        shippingInfo: {
            firstName: 'John',
            lastName: 'Doe',
            zipCode: '12345'
        }
    }
];

module.exports = testUsers;
