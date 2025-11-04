import '../css/App.css'
import { Route, Routes } from 'react-router-dom';
import PrivatePolice from './PrivatePolice';
import Excel from './Excel.jsx';
import MainContent from './MainContent';
import { useMemo, useState } from 'react';

function App() {
    const baseLink = useMemo(() => 'citomed-page-back.vercel.app/', [])

    const [person, setPerson] = useState({
      first_name: '',
      last_name: '',
      patronymic: '',
      tel_number: '',
      email: '',
      position: '',
      company: '',
      company_city: '',
      company_activity: '',
      web_site: '',
      interest: '',
      additional_information: ''
    }) // полный объект всей персоны


  return (
    <Routes>
      <Route path='/private-police' element={<PrivatePolice />} />
      <Route path='/excel' element={<Excel person={person} baseLink={baseLink}/>} />
      <Route path='/' element={<MainContent person={person} baseLink={baseLink} setPerson={setPerson}/>} />
    </Routes>
  )
}

export default App
