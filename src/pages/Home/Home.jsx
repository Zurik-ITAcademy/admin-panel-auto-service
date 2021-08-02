import React from 'react'
import cls from './Home.module.scss'
import { useState } from 'react'
import { useEffect } from "react"
import {AiOutlineClockCircle, AiOutlineDelete, AiOutlineSearch} from 'react-icons/ai'
import {BsEyeSlash} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import ReactPaginate from "react-paginate";
import './Home.css'

const Home = () => {
    const BASE_URL = `https://data-base-auto-service-default-rtdb.asia-southeast1.firebasedatabase.app`
    // Хуки получения данных из базы
    const [dataBase, setDataBase] = useState([]);
    // Хуки Пагинации
    const [baseChangeState, setBasaChangeState] = useState('')
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 9;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(dataBase?.length / usersPerPage);
    // Хуки поискавика
    const [search, setSearch]= useState('')
    const [isOpen, setIsOpen] = useState(true)

    // Сам Поиск + Select  
    const filteredPosts = dataBase?.filter( item => item.names.toUpperCase().includes(search.toUpperCase()))

    const itemClickHendler = (e) =>{
        setSearch(e.target.textContent)
        setIsOpen(!isOpen)
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const inputClickHendler = () =>{
        setIsOpen(true)
    }

    // Получения данных

    useEffect( () =>{
        fetch(`${BASE_URL}/user.json`)
        .then(res => res.json())
        .then(r =>{
            if(r){
                const data = Object.entries(r).map(item =>{
                    const id = item[0]
                    return{
                        ...item[1],
                        id
                    }
                })
                setDataBase(data)
                console.log(data);
            }
        })
    }, [ baseChangeState ]) 

    // Удаления

    const onDeletePost = (id) =>{
        const askDelete = window.confirm('Вы действительно хотите удалить данную заявку?🤔')
        if(askDelete){
        fetch(`${BASE_URL}/user/${id}.json`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(() =>{
            setBasaChangeState(id)
            console.log(id);
        })
        }
    }

    // Выполнения

    const completePost = (id, names, phone, carBrand, post) =>{
        fetch(`${BASE_URL}/user/${id}.json`,{
            method: 'PATCH',
            body: JSON.stringify(
                {
                    names,
                    phone,
                    carBrand,
                    post,
                    completedPost: "✅"
                },
                id
            )
        })
        .then(res => res.json)
        .then(r => {
            setBasaChangeState({
                id,
                r
            })
        })
    }

    // Пагинация
    
    const displayUsers = filteredPosts?.reverse().slice(pagesVisited, pagesVisited + usersPerPage).map((item) => {

        return (
            <tr className={cls.SatausPost}>
            <td>{item.data}</td>
            <td style={{
                textAlign:'center',
                backgroundColor: '#fff'
            }} >{item.completedPost}</td>
            <td>{item.names}</td>
            <td style={{backgroundColor:"#fff"}}>{item.phone}</td>
            <td>{item.carBrand}</td>
            <td style={{backgroundColor:'#fff'}}>{item.post}</td>
            <td className={cls.TDIcons}>
                <BsEyeSlash 
                    onClick={() => completePost(item.id)}
                    className={cls.See} 
                />
                <AiOutlineDelete
                onClick={() => onDeletePost(item.id)}
                className={cls.Del}
            />
            </td>
        </tr>
        )
    });

    // Получаем данных на наш сайт

    return (
        <div className={cls.Home}>
            <div className={cls.HomeChilde}>
                <div className={cls.RightContent}>
                    <div className={cls.texts}>
                        <div className={cls.userContent}>
                            <FaUser className={cls.UserIcon} />
                            <p>Админ панел</p>
                        </div>
                        <form>
                            <AiOutlineSearch className={cls.searchIcon} />
                            <input 
                                onChange={(e)=> setSearch(e.target.value)}
                                onClick={inputClickHendler}
                                value={search}
                                type='text' 
                                placeholder='Поиск по имени'
                            />
                            <ul className='autocomplete' >
                            {
                                search && isOpen ?
                                    filteredPosts?.reverse().slice(pagesVisited, pagesVisited + usersPerPage).map((item) => {
                                        return (
                                            <li 
                                                onClick={itemClickHendler}
                                                className="autocomplete__item">
                                                {item.names}
                                            </li>
                                        )
                                    })
                                : null
                            }
                                

                            </ul>
                        </form>
                    </div>
                    <div  className={cls.Contents}>
                        <table>
                            <tr>
                                <th><AiOutlineClockCircle /></th>
                                <th>Статус</th>
                                <th>Имя</th>
                                <th>Тел Номер</th>
                                <th>Марка</th>
                                <th>Проблемы</th>
                                <th>Команды</th>
                            </tr>
                            {displayUsers}
                        </table>
                        <div className={cls.topContent}>
                            <ol>
                                <li>
                                    <h4>Данное таблица состоит из полученных заявки </h4>
                                </li>
                            </ol>
                            <ol>
                                <li>  
                                    <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />
                                </li>
                            </ol>

                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.adminFooter}>
                <h3>© Все права защищены. Информация сайта защищена законом об авторских правах. 2021! </h3>
            </div>
        </div>
    )
}

export default Home
