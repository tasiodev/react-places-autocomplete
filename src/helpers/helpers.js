export function getGoogleMapsEmbedUrl (address, language) {
    const zoom = 4000
    const lang = language || 'en'
    return 'https://www.google.com/maps/embed?pb=' +
        '!1m18' +
        '!1m12' +
        '!1m3' +
        '!1d' + zoom +
        '!2d0' +
        '!3d0' +
        '!2m3' +
        '!1f0' +
        '!2f0' +
        '!3f0' +
        '!3m2' +
        '!1i1024' +
        '!2i768' +
        '!4f13.1' +
        '!3m3' +
        '!1m2' +
        '!1s0' +
        '!2s' + encodeURI(address?.toLowerCase()) +
        '!5e0' +
        '!3m2' +
        '!1s' + lang +
        '!2s' + lang +
        '!4v' + new Date().getTime() + '000' +
        '!5m2' +
        '!1s' + lang +
        '!2s' + lang
}
