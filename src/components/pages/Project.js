import {parse, v4 as uuidv4} from 'uuid'
import styles from './project.module.css'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../Projects/ProjectForm.module.css'
import Menssage from '../layout/Message'
import ServiceForm from '../Service/ServiceForm'
import ServiceCard from '../Service/ServieCard'
function Project(){

    let {id} = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [menssage, setMenssage] = useState()
    const [type, setType] = useState('success')

    useEffect(() => {

        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method:'GET',
            headers: {
                'Content-Type':'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log)
        },5000)
    }, [id])

    function editPost(project){
        //budget validation 
        if(project.budget <  project.cost){
            setMenssage('O orçarmento não pode ser menor que o custo do projeto!')
            setType('error')
            return  false
        }
        fetch(`http://localhost:5000/project/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMenssage('O projeto foi atualizado!')
            setType('Sucesso')
        })
    }
    function createService(project){
        //last service
        const lastService = project.services(project.services.length - 1)
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        //Validando o valor maximo
        if(newCost > parseFloat(project.budget)){
            setMenssage('Orçamento ultrapassada, verifique o valor do serviço')
            type('erro')
            project.services.pop()
            return false
        }
        //add o seviço cost ao projeto total cost 
        project.cost = newCost
        // up para o projeto 
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp)=> resp.json())
        .then((data) =>{
            console.log(data)
            //exibir os serviços
        }) 
        .catch((err) => console.log(err))
    }
    function removeService(id, cost){
        const servicesUpdate = project.services.filter(
            (services) => services.id !== id
        )
        const projectUpdate = project
        projectUpdate.services = servicesUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/project/${projectUpdate.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':' application/json'
            },
            body: JSON.stringify(projectUpdate)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdate)
            setServices((servicesUpdate))
            setMenssage('Serviço removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container custmClass = 'column'>
                    {menssage && <Menssage type={type} msg={menssage}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto:{project.name}</h1>
                        <buttom className={styles.btn}onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'fechar'}</buttom>
                        {!showProjectForm ? (
                            <div  className={styles.form}>
                                <p>
                                    <span>Categoria:</span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span>{project.cost}
                                </p>
                            </div>
                        ):(
                            <div className={styles.project_inf}>
                                <ProjectForm handleSubmit={editPost} btnText='Concluir ediçaõ' projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço</h2>
                        <buttom className={styles.btn}onClick={toggleProjectForm}>{!toggleServiceForm ? 'Adicionar serviço' : 'fechar'}</buttom>
                    </div>
                    <div className={styles.project_inf}>
                            {showServiceForm && <ServiceForm 
                            handleSubmit = {createService}
                            btntext ='Adicionar serviço'
                            projectData = {project}
                            />}
                            
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                     {services.length > 0 &&
                        services.map((service) =>  (
                        <ServiceCard
                         id={service.id}
                         name={service.name}
                         cost={service.cost}
                         description={service.description}
                         key={service.id}
                         heandleRemove={removeService}
                         />
                        ))
                     }
                     {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
        ): (
            <Loading/>
        )}
        </>
    )
}

export default Project