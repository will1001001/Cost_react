
import {Link} from 'react-router-dom'
import styles from "./ProjectsCards.module.css"
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectsCard({id, name, budget, category, handleRemove}){

        const remove = (e) => {
          e.preventDefault(
            handleRemove(id)
          )
        }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4> 
            <p>
                <span>Orçamento</span> ${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
              <Link to={`/projects/${id}`}>
                <BsPencil/> Editar
              </Link>
              <buttom onClick={remove}>
                <BsFillTrashFill/> Excluir
              </buttom>
            </div>
       </div>
    )
}

export default ProjectsCard