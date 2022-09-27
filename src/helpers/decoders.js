export const decodeUser = (rawUser) => ({
    firstName: rawUser.first_name,
    lastName: rawUser.last_name,
    id:rawUser.id,
    level:rawUser.level,
    university: rawUser.university,
    email:rawUser.email,
    createdAt:rawUser.created_at

})