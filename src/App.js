import {useState} from 'react'

import pathBurger from './images/burger16.jpg'

import  pathBurgerImage from './images/burger.jpg'

import './App.css';

const MEAT = [              // создаем объект который хранит данные названия котлет 
  {id:'1', name: 'Говядина'},
  {id:'2', name: 'Свинина'},
  {id:'3', name: 'Курица'},
  {id:'4', name: 'Рыба'},
]

const CHEESE = [                  // объект с сырами 
  {id:'1', name: 'Моцарелла'},
  {id:'2', name: 'Пармезан'},
  {id:'3', name: 'Чедер'},
  {id:'4', name: 'Рокфор'},
]

const SAUCES = [                  // массив с соусами 
  {id:'1', name: 'Кетчуп'},
  {id:'2', name: 'Майонез'},
  {id:'3', name: 'Чили'},
  {id:'4', name: 'Сырный'},
]

const App = () => {

  const [meat, setMeat] = useState(MEAT[0].id)                      // создаем переменные сосотояния одна переменная хранилища и переменная состояния которая меняет хранилище с дефолтными значениями 
  const [cheese, setCheese] = useState(CHEESE[0].id)  
  const [sauces, setSauces] = useState(SAUCES[0].id) 
  const [hasOnion, setHasOnion] = useState(true) 
  const [countTomatoes, setCountTomatoes] = useState(2)
  const [countCucumbers, setCountCucumbers] = useState(2)
  const [hasOrdered, setHasOrdered] = useState(false)
  

   
  
  
  
  const handleChangeMeat = (event) => {
      setMeat(event.target.value)                         // тут храним айдишник что бы посмотреть заказ номер на другой форме
  }

  const handleIncreaseCountTomatoes = (event) => {          // метод для увеличения и уменьшения томатов
    event.preventDefault()                                  // евент превент что бы заблокировать перезагрузку страницы
    setCountTomatoes(prevValue => prevValue >= 4 ? 4 : prevValue +1)      // количество томатов от 1 до 4  больше 4 нельзя поэтом уесли больше илил равно 4 то уменьшаем 
  }

  const handleDecreaseCountTomatoes = (event) => {
    event.preventDefault()  
    setCountTomatoes(prevValue => prevValue <= 0 ? 0 : prevValue -1)        // тут наоборот при нуле не уменьшаем 
  }

  const handleIncreaseCountCucumbers = (event) => {
    event.preventDefault()  
    setCountCucumbers(prevValue => prevValue >= 4 ? 4 : prevValue +1)
  }

  const handleDecreaseCountCucumbers = (event) => { 
    event.preventDefault()                                              // заблокирует перезагрузку страницы
    setCountCucumbers(prevValue => prevValue <= 0 ? 0 : prevValue -1)
  }

  const handleSubmitButton = (event) =>{
    event.preventDefault()  
    setHasOrdered(!hasOrdered)
  }

  const handleOnionChange = () => {
    setHasOnion(!hasOnion)
  }



  return (
    <section>
      <div className="form-app">
          {!hasOrdered && <form className= "form-app__form">
            <h2>Заполните свои данные</h2>
                  <div className= "contact-information">
                      <div className = "field-input">
                        <p>Имя</p>
                        <input type = "text"/>
                      </div>
                      <div className = "field-input">
                        <p>Почта</p>
                        <input type = "text"/>
                      </div>
                      <div className = "field-input">
                        <p>Телефон</p>
                        <input type = "text"/> 
                      </div>
                  </div>   
                  <div className = "selection">
                    <p className = "selection__text">Выбор котлеты:</p>     
                    <select onChange= {handleChangeMeat}>                                                       
                      {MEAT.map(elem =><option key={elem.id} value ={elem.id}>{elem.name}</option>)}                 
                    </select>

                    <p className = "selection__text">Количество ломтиков помидора:</p>
                    <div className="number">
                        <button className ="number-minus" onClick={handleDecreaseCountTomatoes}>-</button>          
                        <input type = "number" value={countTomatoes} readOnly/>
                        <button className ="number-plus" onClick={handleIncreaseCountTomatoes}>+</button>
                    </div>

                    <p className="selection__text">Лук:</p>
                    <div className="selection__container">
                          <div className = "field-input">
                              <input type = "checkbox" name ="onion" value checked={hasOnion}  onChange={handleOnionChange}/>
                          </div>
                    </div>

                    <p className = "selection__text">Количество ломтиков огурцов:</p>
                    <div className="number">
                        <button className ="number-minus" onClick={handleDecreaseCountCucumbers}>-</button>          
                        <input type = "number" value={countCucumbers} readOnly/>
                        <button className ="number-plus" onClick={handleIncreaseCountCucumbers}>+</button>
                    </div>

                    <button type="submit" onClick={handleSubmitButton}>Сформировать заказ</button>

                    <button type="submit" onClick={handleSubmitButton}>Сбросить все настройки</button>

                    <img className="image-decaration" src ={pathBurger} alt="Иконка бургера"/>          
                      

                  </div>
            
          </form>}

          {hasOrdered && <div className="modal-window">
            <h2>Ваш бургер готовится!</h2>
            <p>Котлета: {MEAT.find(elem => elem.id === meat)?.name}</p>
            <p>Лук: {hasOnion ? 'Есть' : 'Нет'}</p>
            <p>Количество ломтиков помидора: {countTomatoes}</p>
            <p>Количество ломтиков огурцов: {countCucumbers}</p>
            <img src ={pathBurgerImage} alt = "Фотография бургера"></img>
            <button onClick={handleSubmitButton}>Сделать еще один заказ</button>
          </div>}
        </div>
      
    </section>
  )
}

    

export default App;


// в select пробегаемся мапом по массиву и рендерим опшоны передаем туда айдишник
// в numder при нажатии на кнопку увеличиваем или уменьшаем количество томатов то же самое с огурцами 
// image-decaration  вставляем переменную бургера которую мы импортировали из папки src
// hasOrdered оборачивает форму и она пропадет при нажатии на кнопку сформироать заказ всплывает модалка Ваш бургер готовится
// button onClick={handleSubmitButton}>Назад</button> кнопка назад 
// Котлета: {MEAT.find(elem => elem.id === meat)?.name} с помощью файнд выбираем название котлеты в соответствии с айдишником
