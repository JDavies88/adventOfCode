
const getUsers = async (paginationToken, users = []) => {
    const { Users, PaginationToken } = await Cognito.getUsers(paginationToken);
    const result = [...users, ...Users];
    return PaginationToken ? getUsers(PaginationToken, result) : result;
}