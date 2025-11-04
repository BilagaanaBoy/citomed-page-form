import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';  
import { exportExcel } from "./excel.js";

const Excel = ({ person, baseLink }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState("");
    

    useEffect(() => {
        console.log(users)
        axios.get(baseLink + "users").then((r) => {
            setUsers(r.data);
        });
    }, []);


    const clearExcel = () => {
        axios.get(baseLink + "clear-data-base").then((r) => {
            alert('Таблица Excel очищена!')
            window.location.reload()
        });
    }
    

    return (
        <>        
        <section
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            {/* {password == "пьяный мишка" ? ( */}
            {password == "1" ? (
                <>
                <button
                style={{
                    marginRight: "60px",
                    padding: "20px 50px",
                    fontSize: "30px",
                    cursor: "pointer",
                }}
                onClick={() => exportExcel(person, users)}
                >
                Excel
                </button>
                <button
                style={{
                    padding: "20px 50px",
                    fontSize: "30px",
                    cursor: "pointer",
                }}
                onClick={() => clearExcel()}
                >
                Clear
                </button>
                </>
            ) : (
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                style={{
                    width: "300px",
                    height: "40px",
                    fontSize: "24px",
                    padding: "5px 20px",
                }}
                />
            )}
        </section>
        </>
    )
}

export default Excel
