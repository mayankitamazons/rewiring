// import React, {
    //  useEffect, 
    // useState } from 'react'
// import API_URL from '../../../Environment/ApiRoutes.js/ApiRoutes';
// import { PostService } from '../../../Services/CrudServices';
// import { FadeLoader } from "react-spinners";
// import { Link } from 'react-router-dom'


// const ProblemView = () => {
    // const [datas, setDatas] = useState([])
    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     getalldata()
    // }, [])



    //get api call

    // const getalldata = async () => {

    //     const data = {
    //         "status": 1,
    //     }
    //     try {
    //         setLoading(true)
    //         const res = await PostService(API_URL.Problem_filter, data);
    //         console.log(res.data.data)
    //         setDatas(res.data.data)
    //         setLoading(false)
    //     } catch (error) {
    //         setLoading(false)
    //         console.error("Error occurred:", error);
    //     }
    // };


//     return (
//         <>
//             <div>
//                 <div className="content-header">
//                     <div className="container-fluid">
//                         <div className="row mb-2">
//                             <div className="col-sm-6">
//                                 <h1 className="m-0">Problem View</h1>
//                             </div>
//                             <div className="col-sm-6">
//                                 <ol className="breadcrumb float-sm-right">
//                                     <li className="breadcrumb-item"><Link to='/dashboard' >Dashboard</Link></li>
//                                     <li className="breadcrumb-item"><Link to='/problem' >Mental Problem</Link></li>
//                                     <li className="breadcrumb-item active">Problem View</li>
//                                 </ol>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 <section className="content  d-flex justify-content-center">
//                     <div className="container-fluid">
//                         <div className="row">
//                             <div className="col-12">
//                                 <div className="card wrap cddr2">
//                                     <div className="card-body">

//                                         <div className="card-body table-responsive">

//                                             <table className="table table-hover text-nowrap table-bordered">
//                                                 <thead>
//                                                     <tr>
//                                                         <th
//                                                             className="text-center"
//                                                             style={{ width: "15%" }}
//                                                         >
//                                                             S.No
//                                                         </th>
//                                                         <th className="text-center" style={{ width: "60%" }}>Days</th>
//                                                         <th className="text-center">Activity</th>

//                                                     </tr>
//                                                 </thead>
//                                                 {!loading && <tbody>
//                                                     <tr >
//                                                         <td className="text-center">0</td>
//                                                         <td className="text-center">Day 1</td>
//                                                         <td className="text-center ">
//                                                             <span className="fw-bold badge p-2 pr-2 badge-danger " style={{ cursor: 'pointer' }} >
//                                                                 <sapn className='fas fa-plus mr-1'></sapn>
//                                                                 Activity
//                                                             </span>
//                                                         </td>
//                                                     </tr>
//                                                     <tr >
//                                                         <td className="text-center">1</td>
//                                                         <td className="text-center">Day 2</td>



//                                                         <td className="text-center ">
//                                                             <span className="fw-bold badge p-2 pr-2 badge-danger " style={{ cursor: 'pointer' }} >
//                                                                 <sapn className='fas fa-plus mr-1'></sapn>
//                                                                 Activity
//                                                             </span>
//                                                         </td>
//                                                     </tr>
//                                                     <tr >
//                                                         <td className="text-center">2</td>
//                                                         <td className="text-center">Day 3</td>
//                                                         <td className="text-center ">
//                                                             <span className="fw-bold badge p-2 pr-2 badge-danger " style={{ cursor: 'pointer' }} >
//                                                                 <sapn className='fas fa-plus mr-1'></sapn>
//                                                                 Activity
//                                                             </span>
//                                                         </td>
//                                                     </tr>


//                                                 </tbody>}

//                                             </table>
//                                             <div style={{ display: "flex", justifyContent: "center" }}>
//                                                 <FadeLoader speedMultiplier={2} loading={loading} />
//                                             </div>

//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section >
//             </div >

//         </>

//     )
// }




// export default ProblemView