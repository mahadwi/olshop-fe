export const DateUtil = {
    padTo2Digits: (num) => {
        return num.toString().padStart(2, '0');
    },
    formatDate: (date) => {
        return [
            this.padTo2Digits(date.getDate()),
            this.padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    },
    getCurrentYear: () => {
        return new Date().getFullYear();
    },
    getAllMonthsWithNameAndIndex: () => {
        return [{
            label: 'January',
            value: '01'
        }, {
            label: 'February',
            value: '02'
        }, {
            label: 'March',
            value: '03'
        }, {
            label: 'April',
            value: '04'
        }, {
            label: 'May',
            value: '05'
        }, {
            label: 'June',
            value: '06'
        }, {
            label: 'July',
            value: '07'
        }, {
            label: 'August',
            value: '08'
        }, {
            label: 'September',
            value: '09'
        }, {
            label: 'October',
            value: '10'
        }, {
            label: 'November',
            value: '11'
        }, {
            label: 'December',
            value: '12'
        }]
    },
    getDateFromMonthByYearAndIndex: (year, monthNumber) => {
        if (year && monthNumber) {
            const startDate = new Date(Date.UTC(year, parseInt(monthNumber) - 1));
            const endDate = new Date(Date.UTC(year, (parseFloat(monthNumber) - 1) + 1));

            const dates = []

            while (startDate < endDate) {
                dates.push(startDate.getDate() >= 10 ? `${startDate.getDate()}` : `0${startDate.getDate()}`);

                startDate.setDate(startDate.getDate() + 1);
            }

            return dates;
        } else {
            return []
        }

    }
}