import styles from '../Projects/ProjectsCards.module.css'
import {BsFillTrashFill} from 'react-icons/bs'
function ServiceCard({id,name,cost,description, handleRemove}){
     const  remove = (e) => {
    e.preventDefault()
    handleRemove(id, cost)
     }


    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_action}>
        <buttom onClick={remove}></buttom>
            <BsFillTrashFill/>
            Excluir
            </div>
        </div>
    )
}

export default ServiceCard