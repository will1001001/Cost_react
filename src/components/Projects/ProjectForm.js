import {useState, useEffect} from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'


function ProjectForm({handleSubmit, btnText, projectData}){
    const [project, setProject] = useState(projectData || {})
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/categories",{
        method: 'GET',
        headers:{
            'Content-type': 'application/json',
        },
    })
    .then((resp) => resp.json(resp))
    .then((data) => {
        setCategories(data)
    })
    .catch(err => console.log(err))
    }, [])

    const submit = (e) =>{
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project,[e.target.name]: e.target.value})
        console.log(project)
    }


    function handleCategory(e){
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
       
    }
    

    return (
        <form  onSubmit={submit} className={styles.form}>
            <Input 
            type='text' 
            text='Nome do projeto' 
            name='name' 
            placeholder='Insira o nome do projeto'
            handleOnchange={handleChange}
            value = {project.name}
            />
            <Input 
            type='number' 
            text='Orçamento do projeto' 
            name='budget' 
            placeholder='Insira o orçamento total'
            handleOnchange={handleChange}
            value = { project.budget}
            />
            <Select 
            name='category_id' 
            text='Selecione uma categoria' 
            options={categories}
            handleOnchange={handleCategory}
            value = {project.category ? project.category.id : ''}
            />
            <Submit text={btnText}/>
        </form>
    )
}
export default ProjectForm