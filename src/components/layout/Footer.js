import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer(){
    return (<footer className={styles.footer}>
            <ul className={styles.social_list}>
                <il>
                    <FaFacebook/>
                </il>
                 <il>
                    <FaInstagram/>
                </il>
                <il>
                    <FaLinkedin/>
                </il>
            </ul>
            <p className={styles.copy_right}><span>Cost</span> &copy; 2024</p>
        </footer>)
}
 export default Footer