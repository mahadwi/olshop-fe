const StringUtil = {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    rupiahFormat(string, prefix) {
        let number_string = string.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

        return 'Rp' + rupiah
    },
    googleMapsURLToEmbedURL: (GoogleMapsURL) => {
        var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(GoogleMapsURL);
        if (coords != null) {
            var coordsArray = coords[1].split(',');
            return "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" + coordsArray[1] + "!3d" + coordsArray[0] + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098";
        }
    }
}

export default StringUtil