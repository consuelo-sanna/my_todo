//selettore. Dato che usi un combine reducer devi entrare anche dentro lo stato corretto, quindi state.isAuthenticated -> state.user.isAuthenticated

export const getTodos = state => state.todos.todos;
export const getEditable = state => state.todos.editable;
export const getUser = state => state.user.user;
export const getIsAuthenticated = state => state.user.isAuthenticated;
export const getErrors = state => state.user.msg;
