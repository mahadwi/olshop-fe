const ApiErrorHandling = {
    handlingErr: (err, [setErrorObj422]) => {
        if (err.response && setErrorObj422) {
            if (err.response.status = 422) {
                const tempObj = {}

                for (const key in err.response.data.errors) {
                    if (Object.hasOwnProperty.call(err.response.data.errors, key)) {
                        const errorMessages = err.response.data.errors[key];

                        tempObj[key] = Array.isArray(errorMessages) ? errorMessages[0] : errorMessages
                    }
                }
                setErrorObj422(tempObj)
            }
        }
    }
}

export default ApiErrorHandling