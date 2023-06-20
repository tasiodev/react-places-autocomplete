import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../assets/css/Field.module.css'
import { getAutoCompletePlaces, getPlaceDetails } from '../actions/actions'
import { useDebounce } from '../hooks/useDebounce'
import loadingIcon from '../assets/svg/loading.svg'
import markerIcon from '../assets/svg/marker.svg'
import GMap from './GMap'
function Field ({
    placeId,
    placeholder,
    gMapsKey,
    onSelectPlace,
    onChange,
    customStyles,
    searchTypes,
    language,
    disableMap,
    disabled,
    showFullAddress,
    mapExpanded
}) {
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [placeSelected, setPlaceSelected] = useState(null)
    const [showResults, setShowResults] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [allowSearch, setAllowSearch] = useState(false)
    const searchTermDebounced = useDebounce(searchTerm, 450)
    const fieldRef = useRef(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleClickOutside = (event) => {
        if (fieldRef.current && !fieldRef.current.contains(event.target)) {
            setShowResults(false)
            if (!mapExpanded) {
                setShowMap(false)
            }
        }
    }

    useEffect(() => {
        if (mapExpanded) setShowMap(true)
    }, [mapExpanded])

    useEffect(() => {
        if (placeId && !placeSelected) {
            setLoading(true)
            getPlaceDetails(placeId, gMapsKey).then(res => {
                setLoading(false)
                setPlaceSelected(res)
                setSearchTerm(res?.formatted_address)
            })
        }
    }, [placeId])

    useEffect(() => {
        if (allowSearch) onChange && onChange(null)
        if (searchTermDebounced?.length >= 3 && allowSearch) {
            setShowMap(false)
            setLoading(true)
            setPlaceSelected(null)
            getAutoCompletePlaces(searchTermDebounced, searchTypes, language, gMapsKey).then(res => {
                setLoading(false)
                setSearchResults(res)
                setShowResults(true)
            })
        } else {
            setSearchResults([])
        }
    }, [searchTermDebounced])

    useEffect(() => {
        if (placeSelected) {
            onSelectPlace && onSelectPlace(placeSelected.place_id)
            onChange && onChange(placeSelected.place_id)
        }
        setShowResults(false)
    }, [placeSelected])

    const selectPlaceHandler = (place) => {
        setPlaceSelected(place)
        setShowMap(true)
        setShowResults(false)
        setSearchResults([])
        setSearchTerm(place.description)
        setAllowSearch(false)
    }

    const Gmaps = useMemo(() => <GMap address={placeSelected?.description || placeSelected?.formatted_address} gMapsKey={gMapsKey} showMap={showMap} language={language} />, [placeSelected, gMapsKey, showMap, language])

    return <div style={customStyles?.container} className={styles.container} ref={fieldRef}>
        <div style={customStyles?.field} className={styles.field}>
            <input
                onFocus={() => setShowResults(true)}
                type='text'
                placeholder={placeholder}
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setAllowSearch(true) }}
                disabled={disabled}
            />
            {loading && <img style={customStyles?.iconLoading} className={styles.iconLoading} src={loadingIcon} alt='loading' />}
            {!disableMap && !loading && placeSelected && <img onClick={() => setShowMap(!showMap)} style={customStyles?.iconMarker} className={styles.iconMarker} src={markerIcon} alt='marker' />}
        </div>
        {searchResults.length !== 0 && showResults && <div style={customStyles?.searchResultsContainer} className={styles.results}>
            {searchResults.map(result => <div key={result.place_id} style={customStyles?.searchResult} onClick={() => selectPlaceHandler(result)}>
                {result.description}
            </div>)}
        </div>}
        {!disableMap && !loading && Gmaps}
    </div>
}

export default Field
