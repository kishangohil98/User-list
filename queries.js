export const SELECT_USER_QUERY = "SELECT * FROM users WHERE email = ? AND password = ? AND status = 'Active';";
export const INSERT_USER_QUERY = "INSERT INTO users (id, firstname, lastname, email, password, mobile, status) VALUES (NULL, ?, ?, ?, ?, ?, 'Deactive');";
export const GET_USERS = "SELECT * FROM users;";
export const GET_USER = "SELECT * FROM users WHERE id = ?;";
export const UPDATE_USER = "UPDATE users SET firstname = ?, lastname = ?, password = ?, mobile = ? WHERE id = ?;";
export const DELETE_USER = "Delete FROM users WHERE id = ?;";