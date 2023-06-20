import { useMemo } from 'react'
import { getGoogleMapsEmbedUrl } from '../helpers/helpers'
import styles from '../assets/css/GMap.module.css'

function GMap ({ gMapsKey, address, showMap, language, customStyles }) {
    const Iframe = useMemo(() => address && <iframe
        id={showMap ? 'addressFieldMapExpanded' : 'addressFieldMap'}
        title="google-map"
        src={getGoogleMapsEmbedUrl(address, language)}
        width="400"
        height="400"
        frameBorder="0"
        allowFullScreen
        style={customStyles.gmapIframe}
    />, [address, language])
    return address && <div className={styles.gmapContainer} style={customStyles.gmapContainer}>
        <div className={`${styles.gmap} ${(!address || !showMap) ? styles.hidden : styles.expanded}`} >
            {Iframe}
        </div>
    </div>
}

export default GMap
