exports.showMessage = (e) => {
    switch (e.name) {
        case 'SequelizeUniqueConstraintError':
            return e.errors[0].path + ' cannot same.'
        default:
            if (e.errors[0]) {
                return e.errors[0].message;
            } else {
                return "Error: " + e.name + "\n" +
                    "ErrorCode: " + e.parent.code;
            }
    }
}