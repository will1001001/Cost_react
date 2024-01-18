import ProjectForm from '../Projects/ProjectForm'
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'
function NewProject(){

        const navigate = useNavigate()

        function createPost(project){
            //initializing cost and services
            project.cost = 0
            project.servirces = []

            fetch('http://localhost:5000/projects', {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify(project),
            }).then((
                resp => resp.json()
                .then((data) => {console.log(data)}) 
            ))
            .catch(err => console.log(err))
            //redirect
            navigate('/projects', {menssage: 'Projeto iniciado com sucesso!'})
        }

    return(
        <div className={styles.NewProject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adcionar os serviços</p>
            <ProjectForm  handleSubmit={createPost} btnText='Criar projeto'/>
        </div>
    )
}
export default NewProject