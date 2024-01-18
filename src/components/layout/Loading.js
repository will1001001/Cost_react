import loading from "../../img/loading.svg"

import styles from "./Loading.module.css"

function Loading(){
    return(
        <div className={styles.loader.container}>
            <img src={loading} alt='Loading' className={styles.loader}/>
        </div>
    )

}

export default Loading