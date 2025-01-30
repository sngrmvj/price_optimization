


const API_BASE_URL = () => {
    return `http://127.0.0.1:7777`
}

const LOGIN_URL = `${API_BASE_URL()}/user/login`;
const REGISTER_URL = `${API_BASE_URL()}/user/register`;
const GET_USER_PRODUCTS_URL = `${API_BASE_URL()}/product/all_products`;
const GET_ADMIN_PRODUCTS_URL = `${API_BASE_URL()}/product/admin/all_products`;

const ADD_PRODUCTS_URL = `${API_BASE_URL()}/product/create`;
const EDIT_PRODUCTS_URL = `${API_BASE_URL()}/product/update`;
const VIEW_PRODUCTS_URL = `${API_BASE_URL()}/product/view`;
const DELETE_PRODUCTS_URL = `${API_BASE_URL()}/product/delete`;

const SEARCH_PRODUCTS_URL = `${API_BASE_URL()}/product/search`;

export {
    LOGIN_URL, REGISTER_URL, GET_USER_PRODUCTS_URL, ADD_PRODUCTS_URL, EDIT_PRODUCTS_URL, VIEW_PRODUCTS_URL, DELETE_PRODUCTS_URL, SEARCH_PRODUCTS_URL, GET_ADMIN_PRODUCTS_URL
}