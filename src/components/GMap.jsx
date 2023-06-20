import { useMemo } from 'react'
import { getGoogleMapsEmbedUrl } from '../helpers/helpers'
import styles from '../assets/css/GMap.module.css'

function GMap ({ gMapsKey, address, showMap, mapExpanded, language, customStyles }) {
    const Iframe = useMemo(() => address && <iframe
        id={showMap ? 'addressFieldMapExpanded' : 'addressFieldMap'}
        title="google-map"
        src={getGoogleMapsEmbedUrl(address, language)}
        frameBorder="0"
        allowFullScreen
        style={customStyles?.gmapIframe}
    />, [address, language])
    return address && <div className={styles.gmapContainer} >
        <div style={customStyles?.gmapContainer} className={`${mapExpanded ? styles.gmapFixed : styles.gmap} ${(!address || !showMap) ? styles.hidden : styles.expanded}`} >
            {Iframe}
        </div>
    </div>
}

export default GMap
