import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { GetService } from '../../../Services/CrudServices';
import API_URL from '../../../Environment/ApiRoutes.js/ApiRoutes';
import './QuestionView.css'
import { FadeLoader } from "react-spinners";


const QuestionView = () => {

    const { id } = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUserData();
    }, []);


    const getUserData = async () => {
        try {
            setLoading(true)
            const res = await GetService(API_URL.GET_QUESTOINS_BY_ID + '/' + id);
            console.log(res.data.data)
            setData(res.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Error occurred:", error);
        }
    };

    return (
        <>
            <div className="ng-star-inserted hg">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="default_color d-flex align-items-center">

                                    <Link
                                        to="/questions"
                                        className="fas fa-arrow-left back-button bg-secondary user-backbutton d-flex align-items-center justify-content-center mr-3"
                                    >
                                    </Link>
                                    <span> View Question</span>
                                </h1>
                            </div>

                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard" href="/panel/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li className="breadcrumb-item">
                                        <Link to="/questions" href="/panel/User">
                                            questions
                                        </Link>
                                    </li>

                                    <li className="breadcrumb-item active">View Question</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content  d-flex justify-content-center">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card wrap cddr2">
                                    <div className="card-body">

                                        <div className="card-body table-responsive">
                                            <div className='mb-4 fs-2 '>{data.question}</div>

                                            <table className="table table-hover text-nowrap table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            className="text-center"
                                                            style={{ width: "15%" }}
                                                        >
                                                            S.No
                                                        </th>
                                                        <th className="text-center" style={{ width: "20%" }}>Options</th>
                                                        <th className="text-center" style={{ width: "45%" }}>Score</th>
                                                        <th className="text-center" style={{ width: "20%" }}>Porblem id</th>
                                                    </tr>
                                                </thead>
                                                {!loading && <tbody>
                                                    {data?.answers?.map((data, index) => {
                                                        return (
                                                            <tr key={index}>

                                                                <td className="text-center">{index + 1}</td>

                                                                <td className="text-center">{data?.text}</td>
                                                                <td className="text-center">{data?.score}</td>
                                                                <td className="text-center">
                                                                    {data?.problem_id?.map((Value, index) => {
                                                                        return <>< span > {Value.title}</span>
                                                                            {index !== data.problem_id.length - 1 ? ', ' : ''}
                                                                        </>
                                                                    })}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    }

                                                </tbody>}

                                            </table>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <FadeLoader speedMultiplier={2} loading={loading} />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}


export default QuestionView
