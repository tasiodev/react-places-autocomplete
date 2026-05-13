import { Loader } from '@googlemaps/js-api-loader'
const loader = new Loader({ version: 'weekly', libraries: ['places'] })
export async function getAutoCompletePlaces (search, types, language = 'en', apiKey) {
    if (!apiKey) return Promise.reject(new Error('[react-address-field] Missing Google Maps API key'))
    loader.apiKey = apiKey
    const google = await loader.load()
    const request = { input: search, language }
    if (types?.length) request.includedPrimaryTypes = types
    const { suggestions } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
    return (suggestions || []).map(({ placePrediction }) => ({
        place_id: placePrediction.placeId,
        description: placePrediction.text.text
    }))
}

export async function getPlaceDetails (placeId, language = 'en', apiKey) {
    if (!apiKey) return Promise.reject(new Error('[react-address-field] Missing Google Maps API key'))
    loader.apiKey = apiKey
    const google = await loader.load()
    const place = new google.maps.places.Place({ id: placeId })
    await place.fetchFields({ fields: ['formattedAddress', 'displayName', 'id'] })
    return {
        place_id: place.id,
        formatted_address: place.formattedAddress,
        name: place.displayName
    }
}
