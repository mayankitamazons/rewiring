import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostService } from "../../../Services/CrudServices";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import { FadeLoader } from "react-spinners";
import imageDefault from "../../../Assets/Images/defaultuserimage.png";

const ChallengeViewDays = () => {
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(false);
  const { id, day } = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async () => {
    try {
      setLoading(true);
      const res = await PostService(API_URL.GET_CHALLENGE_BY_ID + "/" + id);
      setDatas(res.data.data.daywiseactivity[day - 1]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  const fornavigate = () => {
    Navigate(-1);
  };

  const defaultcoverImage = (data) => {
    const imageElement = document.getElementById(data);
    imageElement.src = imageDefault;
  };

  return (
    <>
      <div className="ng-star-inserted challenges-page">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="default_color d-flex align-items-center">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={fornavigate}
                    className="fas fa-arrow-left back-button bg-secondary user-backbutton d-flex align-items-center justify-content-center mr-3"
                  ></span>
                  <span> Day</span>
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
                    <Link to="/challenges" href="/panel/User">
                      Challenges
                    </Link>
                  </li>

                  <li className="breadcrumb-item text-primary">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={fornavigate}
                      href="/panel/User"
                    >
                      ViewChallenges
                    </span>
                  </li>

                  <li className="breadcrumb-item active">Day</li>
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
                      <div className="mb-4 fs-2 ">{datas.day_label}</div>

                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              style={{ width: "15%" }}
                            >
                              Seq_no
                            </th>
                            <th className="text-center">Title</th>
                            <th className="text-center">BgColor</th>
                            <th className="text-center">Icon</th>
                          </tr>
                        </thead>
                        {!loading && (
                          <tbody>
                            {datas?.data?.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center">{data.seq_no}</td>
                                  <td className="text-center">{data?.title}</td>
                                  <td className="text-center">
                                    {data?.bgcolor}
                                  </td>
                                  <td className="text-center">
                                    <div className="">
                                      <img
                                        id={index}
                                        style={{
                                          width: 50,
                                          height: 50,
                                          borderRadius: 10,
                                        }}
                                        src={data?.icon}
                                        onError={() => defaultcoverImage(index)}
                                        alt={data?.icon}
                                      />
                                    </div>
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
    </>
  );
};

export default ChallengeViewDays;
