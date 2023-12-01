import React ,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { GetService, PostService } from "../../../Services/CrudServices";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import { BiRun } from 'react-icons/bi';
import ErrorIcon from '@mui/icons-material/Error';
import { FadeLoader } from "react-spinners";
import defaultuserimage from "../../../Assets/Images/defaultuserimage.png";


const Home = () => {

  const [totalQuestions,setTotalQuestions] = useState("...")
const [totalChallenges,setTotalChallenges] = useState("...")
const [totalUsers,setTotalUsers] = useState("...")
const [totalProblems,setTotalProblems] = useState("...")
const [loading, setLoading] = useState(false);
const [datas, setDatas] = useState([]);


  useEffect(() => {
    getalldata();
  }, []);
  
  //get api call
  
  const getalldata = async (e) => {
    try {
      setLoading(true);
      const res1 = await PostService(
        `${API_URL.COMMON_DOCUMENT_COUNT + "QUESTION/doc_count"}`
      );
      // const res2 = await PostService(
      //   `${API_URL.COMMON_DOCUMENT_COUNT + "CHALLENGE/doc_count"}`
      // );
      const res3 = await PostService(
        `${API_URL.COMMON_DOCUMENT_COUNT + "USER/doc_count"}`
      );
      const res4 = await PostService(
        `${API_URL.COMMON_DOCUMENT_COUNT + "PROBLEM/doc_count"}`
      );
      setTotalQuestions(res1?.data?.data?.count);
      // setTotalChallenges(res2?.data?.data?.count);
      setTotalUsers(res3?.data?.data?.count);
      setTotalProblems(res4?.data?.data?.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  

    try {
      setLoading(true);
      const res = await GetService(
        `${API_URL.ALL_USERS}?page=0$&limit=5&userRole=2`
      );
      setDatas(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  const defaultimage = (index) => {
    const id = document.getElementById(index);
    id.src = defaultuserimage;
  };

  return (
    <div>
      <div>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Dashboard </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{totalQuestions}</h3>
                    <p>Questions</p>
                  </div>
                  <div className="icon">
                    <i className=" fas fa-question" />
                  </div>
                  <Link to="/questions" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      {totalChallenges}
                      {/* <sup style={{ fontSize: 20 }}>%</sup> */}
                    </h3>
                    <p>Challenges</p>
                  </div>
                  <div className="icon">
                    {/* <i className="ion ion-stats-bars" /> */}
                    <BiRun className='nav-icon' />
                  </div>
                  <Link to="/challenges" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{totalUsers}</h3>
                    <p>Users</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <Link to="/users" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{totalProblems}</h3>
                    <p>Problems</p>
                  </div>
                  <div className="icon">
                    {/* <i className="ion ion-pie-graph" /> */}
                    <ErrorIcon className='nav-icon' />
                  </div>
                  <Link to="/problem" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content  d-flex justify-content-center mt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card wrap ">
                  <div className="card-body">
                  <div className="row ">
                      <div className="ml-3  fs-2"> New Users</div>
                    </div>
                    <div className="card-body table-responsive">
                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              style={{ width: "10%" }}
                            >
                              S.No
                            </th>
                            <th className="text-center">Profile Pic</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">DOB</th>
                            <th className="text-center">email</th>
                            <th className="text-center">Created Date</th>
                            <th className="text-center">Status</th>
                      
                          </tr>
                        </thead>
                        {!loading && (
                          <tbody>
                            {datas.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center">
                                    {   index + 1}
                                  </td>
                                  <td className="text-center ">
                                    <img style={{width:30, height:30, borderRadius:10}}
                                      className="Usertable-image"
                                      id={index}
                                      src={data.profile_pic}
                                      alt={data.profile_pic}
                                      onError={() => defaultimage(index)}
                                    />
                                  </td>
                                  <td>{data.full_name}</td>
                                  <td className="text-center">
                                    {data?.dob?.slice(0, 10)}
                                  </td>
                                  <td className="text-center">{data.email}</td>
                                  <td className="text-center">
                                    {data?.registration_time?.slice(0, 10)}
                                  </td>

                                  <td className="text-center">
                                    {data.status === 1 && (
                                      <span className="fw-bold badge p-2 badge-success">
                                        Active
                                      </span>
                                    )}
                                    {data.status === 0 && (
                                      <span className="fw-bold badge p-2 badge-danger">
                                        Deactive
                                      </span>
                                    )}
                                  </td>
                         
                                </tr>
                              );
                            })}
                          </tbody>
                        )}
                      </table>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <FadeLoader speedMultiplier={2} loading={loading} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
};

export default Home;
