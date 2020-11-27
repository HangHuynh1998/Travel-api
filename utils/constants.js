const CODE = {
    GET_OK: 200,
    CREATE_OK: 201,
    DELETE_OK: 204,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
}

CATEGORY = {
    1: "Trong nước",
    2: "Nước ngoài",
    3: "Du lịch tham quan",
    4: "Du lịch văn hóa",
    5: "Du lịch ẩm thực",
    6: "Du lịch xanh",
    7: "Du lịch MICE",
    8: "Teambuilding"
}

module.exports = {
    CODE,
    CATEGORY
};