import React, { useEffect, useState } from "react";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import { PostService } from "../../../Services/CrudServices";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import DeleteModel from "../../Model/DeleteModel";


const Problem = () => {


  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [problemData, setProblemData] = useState({
    title: "",
    description: "",
    status: 1,
    icon: "",
    image: "",
  });

  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "PROBLEM",
  });

  const [deleteValue, setDeleteValue] = useState(true);
  useEffect(() => {
    getalldata();
  }, []);

  

  //get api call

  const getalldata = async () => {
    const data = {
      status: 1,
    };
    try {
      setLoading(true);
      const res = await PostService(API_URL.Problem_filter, data);

      console.log(res.data.data);
      setDatas(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  const reset = () => {
    setProblemData({
      title: "",
      description: "",
      status: 1,
      icon: "",
      image: "",
    });
  };

  const setvalues = (e) => {
    const { name, value } = e.target;
    if (name === "icon" || name === "image") {
      setProblemData({ ...problemData, [name]: e.target.files[0] });
    } else {
      setProblemData({ ...problemData, [name]: value });
    }
  };



  return (
    <>
      {console.log(problemData)}
      <div>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Mental Problem</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Mental Problem</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content  d-flex justify-content-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card wrap cddr2">
                  <div className="card-body">
                    <div className="row p-3">
                      <div className="col-md-5">
                        <button
                          className="btn btn-outline-success"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={reset}
                        >
                          {" "}
                          <i
                            className="fas fa-plus"
                            data-toggle="modal"
                            data-target="#exampleModal"
                          ></i>
                          &nbsp; Add Problem
                        </button>
                      </div>
                    </div>
                    <div className="card-body table-responsive">
                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              style={{ width: "15%" }}
                            >
                              S.No
                            </th>
                            <th className="text-center">Title</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Days</th>
                          </tr>
                        </thead>
                        {!loading && (
                          <tbody>
                            {datas.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center">{index + 1}</td>
                                  <td className="text-center">{data.title}</td>
                                  <td className="text-center">
                                    {data.description}
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
                                  <td className="text-center ">
                                    {/* <Link to={`/problem/view/${data._id}`}>
                                      <span
                                        className="fw-bold badge p-2 pr-2 badge-danger "
                                        style={{ cursor: "pointer" }}
                                      >
                                        <sapn className="fas fa-eye mr-1"></sapn>
                                        Days
                                      </span>
                                    </Link> */}

                                    <span
                                      title="delete"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i
                                        className="mx-2  fa fa-trash text-danger"
                                        aria-hidden="true"
                                        onClick={() => {
                                          setDeleteData({
                                            id: data._id,
                                            data: data.title,
                                            name: "PROBLEM",
                                          });
                                        }}
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                      ></i>
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
      </div>

      {/* add model */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Problem
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="title"
                    value={problemData.title}
                    onChange={(e) => {
                      setvalues(e);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="col-form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="description"
                    value={problemData.description}
                    onChange={(e) => {
                      setvalues(e);
                    }}
                  />
                </div>

                <div className="form-group ">
                  <label htmlFor="role" className="col-form-label">
                    Status
                  </label>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="status"
                    id="status"
                    onChange={(e) => {
                      setvalues(e);
                    }}
                    value={problemData.status}
                  >
                    <option value="0" >
                      Deactive
                    </option>
                    <option value="1" >
                      Active
                    </option>
                  </select>
                </div>

                <div className="row">
                  <div className="form-group col-3">
                  <div className="fw-bold">Icon</div>
                    <label htmlFor="icon" className="btn btn-primary mt-2   col-form-label">
                      Icon
                    </label>
                    <input style={{display:'none'}}
                      type="file"
                      className="form-control"
                      id="icon"
                      name="icon"
                      onChange={(e) => {
                        setvalues(e);
                      }}
                    />
                  </div>

                  <div className="col-3 mt-4">
                    <div className="d-flex justify-content-start alien-content-center">
                      {problemData?.icon && !problemData?.icon?.name && (
                        <img
                          className="border border-secondary "
                          // ref={ref1}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                          }}
                          src={problemData?.icon}
                          alt={problemData?.icon}
                          // onError={errorfunction}
                        />
                      )}

                      {problemData?.icon?.name && (
                        <img
                          className="border border-secondary "
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                          }}
                          src={URL.createObjectURL(problemData.icon)}
                          alt={problemData.icon}
                        />
                      )}
                    </div>
                  </div>
               

           
                  <div className="form-group col-3">
                  <div className="fw-bold">Image</div>
                    <label htmlFor="image" className="mt-2 btn btn-primary col-form-label">
                      Image
                    </label>
                    <input
                    style={{ display:'none'}}
                    
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={(e) => {
                        setvalues(e);
                      }}
                    />
                  </div>

                  <div className="col-3 mt-4">
                    <div className="d-flex justify-content-start alien-content-center">
                      {problemData?.image && !problemData?.image?.name && (
                        <img
                          className="border border-secondary "
                          // ref={ref1}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                          }}
                          src={problemData?.image}
                          alt={problemData?.image}
                          // onError={errorfunction}
                        />
                      )}

                      {problemData?.image?.name && (
                        <img
                          className="border border-secondary "
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                          }}
                          src={URL.createObjectURL(problemData.image)}
                          alt={problemData.image}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
              <button type="button" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* delete model */}
      <DeleteModel
        data={deleteData.data}
        id={deleteData.id}
        name={deleteData.name}
        deleteValue={deleteValue}
        setDeleteValue={setDeleteValue}
      />
    </>
  );
};

export default Problem;
