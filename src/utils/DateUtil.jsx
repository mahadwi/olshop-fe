const DateUtil = {
    padTo2Digits: (num) => {
        return num.toString().padStart(2, '0');
    },
    formatDate: (date) => {
        return [
            this.padTo2Digits(date.getDate()),
            this.padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }
}