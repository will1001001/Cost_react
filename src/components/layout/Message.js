import {useState, useEffect} from 'react'

import styles from './Messege.module.css'

function Message({ type,msg  }){
    const [Visible, setVisible] = useState(false)
    useEffect(() => {
        if(!msg){
            setVisible(false)
            return
        }
            setVisible(true)

        const timer = setTimeout(() =>{
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)

    },[msg])
    return(
        <>
        {Visible && (<div className={`${styles.menssage} ${styles[type]}`}>[msg]</div>)}
        </>
    )
}

export default Message