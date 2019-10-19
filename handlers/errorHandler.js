exports.showMessage = (e, errorType) => {
    switch (errorType) {
        case 'validation':
            return e.errors.message;
        case 'encryption':
            return 'error when encrypt and verify encrypted data'
        default:
            console.log(e)
            return e;
            break;
    }
}