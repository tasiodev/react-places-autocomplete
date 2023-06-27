import { Loader } from '@googlemaps/js-api-loader'
const loader = new Loader({ version: 'weekly', libraries: ['places'] })
export async function getAutoCompletePlaces (search, types, language = 'en', apiKey) {
    if (!apiKey) return Promise.reject(new Error('[react-address-field] Missing Google Maps API key'))
    loader.apiKey = apiKey
    return new Promise(resolve => loader.load().then((google) => {
        const placesService = new google.maps.places.AutocompleteService(document.createElement('div'))
        const request = { input: search, language, types }
        return placesService.getPlacePredictions(request, (results, status) => {
            resolve(status === google.maps.places.PlacesServiceStatus.OK ? results : [])
        })
    }))
}

export function getPlaceDetails (placeId, language = 'en', apiKey) {
    if (!apiKey) return Promise.reject(new Error('[react-address-field] Missing Google Maps API key'))
    loader.apiKey = apiKey
    const request = {
        placeId,
        language,
        fields: ['formatted_address', 'name', 'place_id']
    }
    return new Promise(resolve => loader.load().then((google) => {
        const service = new google.maps.places.PlacesService(document.createElement('div'))
        service.getDetails(request, callback)
        function callback (place, status) {
            resolve(status === google.maps.places.PlacesServiceStatus.OK ? place : null)
        }
    }))
}
