const {buildMakeUser, validatePassword} = require("./User");

const crypto = require('../infrastructure/cryptography/cryptography')('SUPER_SECRET');

let makeUser;

beforeAll(() => {
    makeUser = buildMakeUser({crypto})
})

describe('User entity', () => {
    it('should throw when empty object provided', async () => {
        await expect( () =>  makeUser())
            .rejects
            .toThrow('No username set')
    })
    it('should throw when password does not match validators', async () => {
        let USER_WITH_BAD_PASSWORD = {
            username: 'RASCAL',
            password: '',
            isAdmin: false,
        }
        await expect(() => makeUser(USER_WITH_BAD_PASSWORD))
            .rejects
            .toThrow('Password not valid')
    })
    it('create non admin user', async () => {
        const NON_ADMIN_USER = {
            username: 'USER_1',
            password: 'EASY_PASS1',
            isAdmin: false,
        };
        const expectedToken = await crypto.generateAuthToken({
            username: NON_ADMIN_USER.username,
            isAdmin: NON_ADMIN_USER.isAdmin,
            roles: 'test',
        })
        const user = await makeUser({...NON_ADMIN_USER,isLoggedIn: true})
        await user.setPassword(NON_ADMIN_USER.password)
        expect(user.getUsername()).toBe(NON_ADMIN_USER.username)
        expect(await crypto.compare(NON_ADMIN_USER.password, user.getPassword())).toBeTruthy()
        expect(user.isAdmin()).toBe(false)
        expect(user.isLoggedIn()).toBe(true)
        expect(user.getLoginToken()).toBe(expectedToken)
    });
    it('create admin user', async () => {
        let ADMIN_USER = {
            username: 'USER_ADMIN',
            password: 'EASY_PASS1',
            isAdmin: true,
        };
        const expectedToken = await crypto.generateAuthToken({
            username: ADMIN_USER.username,
            isAdmin: ADMIN_USER.isAdmin,
            roles: 'test',
        })
        const user = await makeUser({...ADMIN_USER,isLoggedIn: true})
        await user.setPassword(ADMIN_USER.password)
        expect(user.getUsername()).toBe(ADMIN_USER.username)
        expect(await crypto.compare(ADMIN_USER.password, user.getPassword())).toBeTruthy()
        expect(user.isAdmin()).toBe(true)
        expect(user.isLoggedIn()).toBe(true)
        expect(user.getLoginToken()).toBe(expectedToken)
    });
})
describe('Password validator', () => {
    it('false for empty password', () => {
            expect(validatePassword('')).toBeFalsy()
    })
    it('false for password shorter than 5 char', () => {
        expect(validatePassword('SH1')).toBeFalsy()
    })
    it('false for password without number', () => {
        expect(validatePassword('passwordWithoutNumber')).toBeFalsy()
    })
})