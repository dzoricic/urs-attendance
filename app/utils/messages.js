const CREATE_ERROR = {
    status: 500,
    message: "Saving failed!"
};

const READ_ERROR = {
    status: 500,
    message: "Could not find what your looking for!"
};

const UPDATE_ERROR = {
    status: 500,
    message: "Could not update!"
};

const DELETE_ERROR = {
    status: 500,
    message: "Could not delete!"
};

const BAD_REQUEST = {
    status: 400,
    message: "Something is wrong with your request!"
};

const GENERAL_ERROR = {
    status: 500,
    message: "Something went wrong!"
};

// ------------------------------------------

const SUCCESS_MESSAGE = {
    status: 200,
    message: "Success!"
};

// ------------------------------------------

module.exports = {
    CREATE_ERROR,
    READ_ERROR,
    UPDATE_ERROR,
    DELETE_ERROR,
    SUCCESS_MESSAGE,
    BAD_REQUEST,
    GENERAL_ERROR
}
