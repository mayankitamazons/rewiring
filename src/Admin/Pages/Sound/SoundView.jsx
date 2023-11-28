import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { GetService, PostService } from '../../../Services/CrudServices';
import API_URL from '../../../Environment/ApiRoutes.js/ApiRoutes';
import { FadeLoader } from "react-spinners";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import imageDefault from '../../../Assets/Images/defaultuserimage.png'
import './Soundview.css'

const SoundView = () => {

    const { id } = useParams();
    const [data, setData] = useState({})
    const refIcon = useRef()
    const refImage = useRef()
    const [loading, setLoading] = useState(false)
    const [showIds, setShowIds] = useState([])

    useEffect(() => {
        getUserData();
        getproblem_id()
    }, []);


    const getUserData = async () => {
        try {
            setLoading(true)
            const res = await GetService(API_URL.GET_SOUND_BY_ID + '/' + id);
            setData(res.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Error occurred:", error);
        }
    };

    const getproblem_id = async () => {
        const data = {
            "status": 1,
        }
        try {
            const res = await PostService(API_URL.Problem_filter, data);

            console.log(res.data.data)
            const databox = res?.data?.data.map((data) => {
                return { label: data.title, value: data._id }
            })

            setShowIds(databox)

        } catch (error) {
            console.error("Error occurred:", error);
        }


    };

    const defaultImage = () => {
        refIcon.current.src = imageDefault
    }

    const defaultcoverImage = () => {
        refImage.current.src = imageDefault
    }

    return (
        <>
            <div className="ng-star-inserted soundview">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="default_color d-flex align-items-center">
                                    <Link
                                        to="/sound"
                                        className="fas fa-arrow-left back-button bg-secondary user-backbutton d-flex align-items-center justify-content-center mr-3"
                                    >
                                    </Link>
                                    <span>View Sound</span>
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
                                        <Link to="/sound" href="/panel/User">
                                            Sound
                                        </Link>
                                    </li>

                                    <li className="breadcrumb-item active">View sound</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="content d-flex justify-content-center">
                    <div className="container p-2">
                        <div className="card p-3">
                            <div className="card-body">
                                {!loading && <div className="row">
                                    <div className="col-md-12">
                                        <div className="ms-3 row">

                                            <div className='col-6'>

                                                <h6 className="text-muted "  >
                                                    Title : {data?.title}
                                                </h6>

                                                <h6 className="text-muted "  >
                                                    Artist : {data?.artist}
                                                </h6>

                                                <h6 className="text-muted "  >
                                                    Album : {data?.album}
                                                </h6>

                                                <h6 className="text-muted "  >
                                                    Duration : {data?.duration}
                                                </h6>

                                                <td className="text-center">
                                                    <span className="text-muted mr-1" >
                                                        Problem :
                                                    </span>
                                                    {data?.problems && data.problems.length > 0 ? (
                                                        data.problems.map((name, index) => (
                                                            <span className='text-muted' key={index}>
                                                                {showIds.find((datavalue) => datavalue?.value === name)?.label || ''}
                                                                {index !== data.problems.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))
                                                    ) : ''}
                                                </td>

                                                <div className='mt-3'>
                                                    <span className="text-muted fs-5">Cover_image : </span>
                                                    <img style={{ width: 200, height: 200, borderRadius: 10 }} ref={refImage} src={data?.cover_img} onError={defaultcoverImage} alt={data?.cover_img} />
                                                </div>

                                            </div>

                                            <div className='col-6'>
                                                <div >
                                                    <span className="text-muted fs-5">Icon : </span>
                                                    <img style={{ width: 100, height: 100, borderRadius: 10 }} ref={refIcon}
                                                        src={data?.icon} onError={defaultImage} alt={data?.icon} />
                                                </div>



                                                <p className='mb-2 text-muted mt-4'>AudioPlayer :</p>
                                                <td className="text-center">

                                                    <span>
                                                        <AudioPlayer
                                                            style={{ borderRadius: "1rem" }}
                                                            src={data.audio_file}
                                                            showSkipControls={true}
                                                            showJumpControls={false}
                                                        /></span>
                                                </td>
                                            </div >
                                        </div>
                                    </div>
                                </div>}
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <FadeLoader speedMultiplier={2} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




            </div>
        </>
    )
}





export default SoundView




