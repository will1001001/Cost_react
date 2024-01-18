import {useLocation} from 'react-router-dom'

import Message from '../layout/Message'

import {useState, useEffect} from 'react'

import styles from './Projects.module.css'
import ProjectsCard from '../Projects/ProjectsCard'
import Container from "../layout/Container"
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'

function Projects(){

    const[projects, setPorjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

const location = useLocation()
let Message = ''
if(location.state){
    Message = location.state.Message
}

    useEffect(() =>{
        setTimeout(() =>{
            fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'content-type':'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setPorjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
            
        }, 3000)
    }, [])

        function removeProject(id){
            fetch(`http://localhost:5000/projects/${id}` ,{
                method:'DELETE',
                headers:{
                    'content-type':'aplication/json'
                },
            }).then(resp => resp.json)
            .then(() => {
                setPorjects(projects.filter((project)=> project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
        }

    return (
        <div className={styles.project_container}>
            <div classNae={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to='/NewProject' text='Criar Projeto'/>
            </div>
           {Message && <Message type='success' msg={Message}/>}
           {projectMessage && <Message type='success' msg={projectMessage}/>}
           <Container customClass='start'>
           {projects.length > 0 &&
           projects.map((project) => (
            <ProjectsCard
            key={project.id}
            category={project.category.name} 
            id={project.id}
            budget={project.budget}
            name={project.name}
            handleRemove={removeProject}
            />
           ))}
           {!removeLoading && <Loading/>}
           {removeLoading && projects.length === 0 && (
            <p>Não há Projetos cadastrados!</p>
           )}
           </Container>
        </div>
    )
}

export default Projects