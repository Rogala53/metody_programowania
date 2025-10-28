class UserService {
    LogIn(user: LoginCriteria): User | null;
    createAccount(data: UserCriteria): User;
    updateUserEmail(user: User, newEmail: string): User | null;
}