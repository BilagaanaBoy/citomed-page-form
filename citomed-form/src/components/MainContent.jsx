import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { useState, useEffect } from 'react';
import axios, { all } from 'axios';

import logo from "../assets/cm_logo_norm.55800c7a53f91998bcd3.jpg";

const MainContent = ({ person, baseLink, setPerson }) => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false)
    const [check, setCheck] = useState(false)

    const changePersonState = (e) => {
        e.target.name == 'first_name' && setPerson(state => ({ ...state, first_name: e.target.value }))
        e.target.name == 'last_name' && setPerson(state => ({ ...state, last_name: e.target.value }))
        e.target.name == 'patronymic' && setPerson(state => ({ ...state, patronymic: e.target.value }))
        e.target.name == 'email' && setPerson(state => ({ ...state, email: e.target.value }))
        e.target.name == 'company' && setPerson(state => ({ ...state, company: e.target.value }))
        e.target.name == 'company_city' && setPerson(state => ({ ...state, company_city: e.target.value }))
        e.target.name == 'company_activity' && setPerson(state => ({ ...state, company_activity: e.target.value }))
        e.target.name == 'position' && setPerson(state => ({ ...state, position: e.target.value }))
        e.target.name == 'web_site' && setPerson(state => ({ ...state, web_site: e.target.value }))
        e.target.name == 'interest' && setPerson(state => ({ ...state, interest: e.target.value }))
        e.target.name == 'additional_information' && setPerson(state => ({ ...state, additional_information: e.target.value }))
    }
    
    const sendUserData = () => {

        if(!check){
            alert('Подтвердите согласие на обработку персональных данных')
            return
        }

        if (!person.first_name) setPerson(state => ({ ...state, first_name: 'обязательное поле *' }))
        if (!person.last_name) setPerson(state => ({ ...state, last_name: 'обязательное поле *' }))
        if (!person.patronymic) setPerson(state => ({ ...state, patronymic: 'обязательное поле *' }))
        if (!person.email) setPerson(state => ({ ...state, email: 'обязательное поле *' }))
        if (!person.tel_number) setPerson(state => ({ ...state, tel_number: 'обязательное поле *' }))
        if (!person.company) setPerson(state => ({ ...state, company: 'обязательное поле *' }))
        if (!person.company_city) setPerson(state => ({ ...state, company_city: 'обязательное поле *' }))
        if (!person.company_activity) setPerson(state => ({ ...state, company_activity: 'обязательное поле *' }))
        if (!person.position) setPerson(state => ({ ...state, position: 'обязательное поле *' }))
        if (!person.web_site) setPerson(state => ({ ...state, web_site: 'обязательное поле *' }))
        if (!person.interest) setPerson(state => ({ ...state, interest: 'обязательное поле *' }))
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(person.email.toLocaleLowerCase())) alert('Некорректная почта')
        if (!/^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/.test(person.web_site.toLocaleLowerCase())) alert('Некорретный адрес сайта')
    
        for (let key in person) {
            if (!person[key] && key != 'additional_information') return
        }

        if (check)
            axios.post(baseLink + 'create-new-user', { person }).then(r => {
                console.log('Response:', r);
                
                setIsSuccess(true)
                setTimeout(() => { window.location.reload() }, 1500)
        })
        else {
            alert('Подтвердите согласие на обработку персональных данных')
        }
    }


    return (
        <>
        <section className='form'>
        {!isSuccess ?
            <div className='MRL40px'>
                <div className='form_logo'>
                    <img src={logo} />
                </div>
                
                <div className='MT15px'>
                    <h2>Ваши ФИО</h2>
                    <div className='form_input_gap_min'>
                        <input name='first_name' type="text" placeholder="Имя" style={person.first_name[person.first_name.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.first_name} onChange={changePersonState}
                            onFocus={(e) => { if (person.first_name == 'обязательное поле *') setPerson(state => ({ ...state, first_name: '' })) }}/>
                        <input name='last_name' type="text" placeholder="Фамилия" style={person.last_name[person.last_name.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.last_name} onChange={changePersonState}
                            onFocus={(e) => { if (person.last_name == 'обязательное поле *') setPerson(state => ({ ...state, last_name: '' })) }}/>
                        <input name='patronymic' type="text" placeholder="Отчество" style={person.patronymic[person.patronymic.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.patronymic} onChange={changePersonState}
                            onFocus={(e) => { if (person.patronymic == 'обязательное поле *') setPerson(state => ({ ...state, patronymic: '' })) }}/>
                    </div>
                </div>

                <div className='MT15px'>
                    <h2>Ваши контакты</h2>
                    <div className='form_input_gap_min'>
                        <IMaskInput
                            mask={'+{7}(000)000-00-00'}
                            radix="."
                            value={person.tel_number}
                            unmask={true}
                            style={person.tel_number == '7' ? { border: '1px solid red' } : {}}
                            onAccept={
                            (value, mask) => setPerson(state => ({ ...state, tel_number: value }))
                            }
                            placeholder='Номер телефона'
                        />
                        <input name='email' type="text" placeholder="Адрес электронной почты" style={person.email[person.email.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.email} onChange={changePersonState}
                            onFocus={(e) => { if (person.email == 'обязательное поле *') setPerson(state => ({ ...state, email: '' })) }}/>
                    </div>
                </div>

                <div className='MT15px'>
                    <h2>Информация о Вашей компании</h2>
                    <div className='form_input_gap_max'>
                        <input name='company' type="text" placeholder="Компания" style={person.company[person.company.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.company} onChange={changePersonState}
                            onFocus={(e) => { if (person.company == 'обязательное поле *') setPerson(state => ({ ...state, company: '' })) }}/>
                        <input name='company_city' type="text" placeholder="Город / месторасположение компании" style={person.company_city[person.company_city.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.company_city} onChange={changePersonState}
                            onFocus={(e) => { if (person.company_city == 'обязательное поле *') setPerson(state => ({ ...state, company_city: '' })) }}/>
                        <input name='company_activity' type="text" placeholder="Деятельность компании" style={person.company_activity[person.company_activity.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.company_activity} onChange={changePersonState}
                            onFocus={(e) => { if (person.company_activity == 'обязательное поле *') setPerson(state => ({ ...state, company_activity: '' })) }}/>
                        <input name='position' type="text" placeholder="Ваша должность" style={person.position[person.position.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.position} onChange={changePersonState}
                            onFocus={(e) => { if (person.position == 'обязательное поле *') setPerson(state => ({ ...state, position: '' })) }}/>
                        <input name='web_site' type="text" placeholder="Адрес сайта" style={person.web_site[person.web_site.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.web_site} onChange={changePersonState}
                            onFocus={(e) => { if (person.web_site == 'обязательное поле *') setPerson(state => ({ ...state, web_site: '' })); else if (person.web_site == '') setPerson(state => ({ ...state, web_site: 'www.' })) }}/>
                    </div>
                </div>

                <div className='MT15px'>
                    <h2>Дополнительная информация</h2>
                    <div className='form_input_gap_max'>
                        <input name='interest' type="text" placeholder="Продукты в которых Вы заинтересованы" style={person.interest[person.interest.length - 1] == '*' ? { border: '1px solid red' } : {}} value={person.interest} onChange={changePersonState}
                            onFocus={(e) => { if (person.interest == 'обязательное поле *') setPerson(state => ({ ...state, interest: '' })) }}/>
                        <input value={person.additional_information} onChange={changePersonState} name='additional_information' type="text" placeholder="Дополнительная информация"/>
                    </div>
                </div>

                <div className='form_submit_and_private_police'>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{marginRight: '20px'}}>
                            <label className="custom-checkbox">Согласие на обработку персональных данных
                                <input type="checkbox" name="myCheckbox" checked={check} onChange={() => setCheck(!check)}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <div>
                            <a onClick={() => navigate('private-police')}>Политика конфиденциальности и обработки персональных данных</a>
                        </div>
                    </div>
                    

                    <div className='MT15Button'>
                        <button onClick={sendUserData} >Отправить</button>
                    </div>
                </div>
            </div> : <>
                <div className='form_logo'>
                    <img className='imgFinal' src={logo} />
                </div>
                <div>
                    <h1>Данные успешно переданы!</h1>
                    <h1>Спасибо!</h1>
                </div>
                
            </>}
        </section>
        </>
    )
}

export default MainContent
