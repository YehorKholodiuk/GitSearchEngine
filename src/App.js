import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [rep, setRep] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                console.log('Increment')
                setPage(page+1)
                setLoader(true)
                fetchData()
            }
        }
    )

    function fetchData() {

        axios({
            method: 'GET',
            url: 'https://api.github.com/search/repositories',
            params: {
                q: 'Javascript',
                sort: 'stars',
                order: 'desc',
                page: page,

            }

        }).then(
            (res) => {
                setRep(res.data.items)
                console.log(rep, '')

                setLoader(false)
            }).catch((err) => console.log(err))
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData()

        }, 3000)
    },)

    useEffect(() =>{},[page])


    return (
        <div className="App">

            {loader ? <img className="App-logo" src={logo}/> : (
                <table className={"table"}>
                    <tbody className={"theader"}>
                    <tr>
                        <td>Name</td>
                        <td>url</td>
                        <td>owner</td>
                        <td>forks</td>
                        <td>open issues</td>
                    </tr>
                    {
                        rep.map((el) => <tr className={"tbody"}>
                            <td>{el.name}</td>
                            <td>{el.url}</td>
                            <td>{el._owner}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;



