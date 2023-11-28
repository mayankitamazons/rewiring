import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { PostService, patchService } from "../../../Services/CrudServices";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import "./ViewChallenges.css";
import defaultnoimage from "../../../Assets/Images/defaultnoimage.png";
import toaster from "../../../Helpers/Toastify";
import { ToastContainer } from "react-toastify";

const Viewchallenges = () => {
  const ref1 = useRef();
  const [check, setCheck] = useState();
  const [btn, setbtn] = useState("Add");
  const [addError, setAddError] = useState(false);
  const [showingData, setShowingsData] = useState([]);
  const [label, setLabel] = useState();
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async (e) => {
    try {
      setLoading(true);
      const res = await PostService(API_URL.GET_CHALLENGE_BY_ID + "/" + id);
      console.log(res.data.data);
      setDatas(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  const mover = (day) => {
    const dayer = day.slice(4);
    Navigate(`/challenges/view/${id}/${dayer}`);
  };

  const [dayData, setdayData] = useState({
    title: "",
    bgcolor: "",
    seq_no: "",
    icon: "",
  });

  const setday = (e) => {
    const { name, value } = e.target;
    if (name === "icon") {
      setdayData({ ...dayData, [name]: e.target.files[0] });
    } else {
      setdayData({ ...dayData, [name]: value });
    }
  };

  const putdata = () => {
    if (dayData.title && dayData.bgcolor && dayData.icon) {
      if (btn === "Add") {
        setShowingsData([
          ...showingData,
          { ...dayData, seq_no: showingData.length },
        ]);
        setdayData({
          title: "",
          bgcolor: "",
          seq_no: "",
          icon: "",
        });
        setAddError(false);
      }

      if (btn === "Edit") {
        const value = showingData.map((data, index) => {
          if (index === dayData.seq_no) {
            return dayData;
          } else {
            return data;
          }
        });
        setShowingsData(value);
        setdayData({
          title: "",
          bgcolor: "",
          seq_no: "",
          icon: "",
        });
        setAddError(false);
        setbtn("Add");
      }
    } else {
      setAddError(true);
    }
  };

  const editfun = (i) => {
    const datanew = showingData[i];
    setdayData(datanew);
  };

  const deleteobj = (i) => {
    const newarr = showingData.filter((value, index) => {
      return index !== i;
    });
    setShowingsData(newarr);
  };

  const errorfunction = () => {
    ref1.current.src = defaultnoimage;
  };

  //update  api

  const create = async () => {
    if (showingData.length > 0) {
      let flag = 0;
      const newArray = [];

      for (let i = 0; i < showingData.length; i++) {
        if (showingData[i]?.icon?.name) {
          newArray.push(i);
          flag = 1;
        }
      }

      const data = [...showingData];

      if (flag === 1) {
        const formData = new FormData();

        for (let i = 0; i < newArray.length; i++) {
          formData.append("files", showingData[newArray[i]].icon);
        }

        if (newArray.length === 1) {
          formData.append("isMultiple", false);
        } else {
          formData.append("isMultiple", true);
        }

        formData.append("path", "blog/gallery");

        try {
          const response = await PostService(
            API_URL.Multi_file_upload,
            formData
          );

          if (response?.data) {
            for (let i = 0; i < newArray.length; i++) {
              data[newArray[i]].icon = response.data.data[i];
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      let box = {};
      if (flag === 1) {
        box = {
          day_label: label,
          data,
        };
      } else {
        box = {
          day_label: label,
          showingData,
        };
      }

      const daywiseactivity = datas?.daywiseactivity?.map((newobj, index) => {
        if (index === check) {
          return box;
        } else {
          return newobj;
        }
      });

      const contain = { ...datas, daywiseactivity: daywiseactivity };

      try {
        const responses = await patchService(
          API_URL.UPDATE_CHALLENGE_BY_ID + id,
          contain
        );
        toaster('successful updated', "success");
        console.log("Response from server:", responses);
        getalldata();
        const button = document.getElementById("modelClose");

        button.click();
      } catch (error) {
        toaster(error?.data?.msg, "error");
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="ng-star-inserted challenges-page">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="default_color d-flex align-items-center">
                  <Link
                    to="/challenges"
                    className="fas fa-arrow-left back-button bg-secondary user-backbutton d-flex align-items-center justify-content-center mr-3"
                  ></Link>
                  <span> View Challenge</span>
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

                  <li className="breadcrumb-item active">View Challenge</li>
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
                      <div className="mb-4 fs-2 ">{datas?.title}</div>

                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              style={{ width: "15%" }}
                            >
                              S.No
                            </th>
                            <th className="text-center">Days</th>

                            <th
                              className="text-center"
                              style={{ width: "20%" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {!loading && (
                          <tbody>
                            {datas?.daywiseactivity?.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center">{index + 1}</td>
                                  <td className="text-center">
                                    {data.day_label}
                                  </td>
                                  <td className="text-center ">
                                    <span
                                      className=" fw-bold badge p-2 pr-2 badge-danger mr-2  "
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setdayData({
                                          title: "",
                                          bgcolor: "",
                                          seq_no: "",
                                          icon: "",
                                        });
                                        setbtn("Add");
                                        setAddError(false);
                                        setLabel(data.day_label);
                                        setShowingsData(data.data);
                                        setCheck(index);
                                      }}
                                    >
                                      <span className=" fas fa-pen mr-1"></span>
                                      Edit
                                    </span>

                                    <span
                                      className="fw-bold badge p-2 pr-2 badge-danger "
                                      style={{ cursor: "pointer" }}
                                      onClick={() => mover(data?.day_label)}
                                    >
                                      <span className="fas fa-eye mr-1"></span>
                                      View
                                    </span>
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
        <ToastContainer />
      </div>

      {/* create model */}

      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Day
                </h5>
                <button
                  id="modelClose"
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form className="row">
                  <div className="form-group col-12  ">
                    <h1>{label}</h1>
                  </div>

    

                  <div className="form-group col-4">
                    <label htmlFor="title" className="col-form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="title"
                      value={dayData.title}
                      onChange={(e) => {
                        setday(e);
                      }}
                    />
                    {addError && !dayData.title && (
                      <div className="text-danger">Required </div>
                    )}
                  </div>

                  <div className="form-group col-4">
                    <label htmlFor="bgcolor" className="col-form-label">
                      Background Color
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bgcolor"
                      name="bgcolor"
                      placeholder="background color"
                      value={dayData.bgcolor}
                      onChange={(e) => {
                        setday(e);
                      }}
                    />
                    {addError && !dayData.bgcolor && (
                      <div className="text-danger">Required </div>
                    )}
                  </div>

                  <div className="form-group col-2">
                    <div className="fw-bold text-dark">Icon</div>
                    <label
                      style={{ marginTop: "10px" }}
                      htmlFor="icon"
                      className="col-form-label btn btn-primary icon-button "
                    >
                      Select Icon
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      className="form-control"
                      id="icon"
                      name="icon"
                      onChange={(e) => {
                        setday(e);
                      }}
                    />
                    {addError && !dayData.icon && (
                      <div className="text-danger">Required </div>
                    )}
                  </div>

                  <div
                    className=" form-group col-1"
                    style={{ marginTop: "35px" }}
                  >
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={putdata}
                    >
                      {btn}
                    </button>
                  </div>
                </form>
                <section className="content  d-flex justify-content-center">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card-body table-responsive">
                          <table className="table table-hover text-nowrap table-bordered">
                            <thead>
                              <tr>
                                <th className="text-center">seq_no</th>
                                <th className="text-center">title</th>
                                <th className="text-center">bgcolor</th>
                                <th className="text-center">icon</th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              { showingData?.length > 0 &&
                                showingData?.map((data, index) => {
                                  return (
                                    <tr key={index}>
                                      <td
                                        className="text-center"
                                        style={{ width: "10%" }}
                                      >
                                        {data?.seq_no}
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{ width: "50%" }}
                                      >
                                        {data?.title}
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{ width: "15%" }}
                                      >
                                        {data?.bgcolor}
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{ width: "15%" }}
                                      >
                                        <div className="d-flex justify-content-center alien-content-center">
                                          {data?.icon && !data?.icon?.name && (
                                            <img
                                              className="border border-secondary "
                                              ref={ref1}
                                              style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50,
                                              }}
                                              src={data?.icon}
                                              alt={data?.icon}
                                              onError={errorfunction}
                                            />
                                          )}

                                          {data?.icon && data?.icon?.name && (
                                            <img
                                              className="border border-secondary "
                                              style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50,
                                              }}
                                              src={URL.createObjectURL(
                                                data?.icon
                                              )}
                                              alt={data?.icon}
                                            />
                                          )}
                                        </div>
                                      </td>
                                      <td
                                        className="text-center "
                                        style={{ width: "10%" }}
                                      >
                                        <span
                                          title="Update"
                                          style={{ cursor: "pointer" }}
                                          className="mx-2 fas fa-pen cursor"
                                          onClick={(e) => {
                                            editfun(index);
                                            setbtn("Edit");
                                          }}
                                        ></span>
                                        <span
                                          title="delete"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => deleteobj(index)}
                                        >
                                          <i
                                            className="mx-2 fa fa-trash text-danger"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                        { showingData?.length === 0 && (
                          <h3 className="d-flex justify-content-center text-secondary mt-2 fs-6">
                            No Data Available
                          </h3>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={create}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewchallenges;
