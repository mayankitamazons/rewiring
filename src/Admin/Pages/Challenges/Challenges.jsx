import React, { useEffect, useState } from "react";
import "./Challenges.css";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import { PostService } from "../../../Services/CrudServices";
import { Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import toaster from "../../../Helpers/Toastify";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../Helpers/Pagination";
import { FadeLoader } from "react-spinners";
import DeleteModel from "../../Model/DeleteModel";


const Challenges = () => {
  const limit =10 ;
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [showIds, setShowIds] = useState([]);
  const [selected, setSelected] = useState([]);
  const [datas, setDatas] = useState([]);
  const [number, setNumber] = useState();
  const [createChallenge, setCreateChallenge] = useState({
    title: "",
    description: "",
    problems: [],
  });

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "CHALLENGE",
  });
  const [deleteValue, setDeleteValue] = useState(true);

  useEffect(() => {
    getproblem_id();
    getalldata();
  }, [currentPage]);

  //get api call

  const getalldata = async (e) => {

    try {
      setLoading(true)
      const res = await PostService(`${API_URL.COMMON_DOCUMENT_COUNT + 'CHALLENGE/doc_count' }`);
      // console.log(res.data.data.count)
      setTotal(res.data.data.count)
      setLoading(false)


  } catch (error) {
      setLoading(false)
      console.error("Error occurred:", error);
  }

    try {
      setLoading(true);
      const data = { status: "1" };
      const res = await PostService(
        // API_URL.LIST_CHALLENGES
        `${API_URL.LIST_CHALLENGES}page=${currentPage}&limit=${limit}`
        , data);
      setDatas(res.data.data[0].ChallegeRecords);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  // post api service

  const getproblem_id = async () => {
    const data = {
      status: 1,
    };
    try {
      const res = await PostService(API_URL.Problem_filter, data);

      const databox = res?.data?.data.map((data) => {
        return { label: data.title, value: data._id };
      });

      setShowIds(databox);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  //post api call

  const create = async () => {
    if (createChallenge.title && createChallenge.description && number) {
      let daywiseactivity = [];
      for (let i = 1; i <= number; i++) {
        let datas = {
          day_label: `Day ${i}`,
          data: [],
        };
        daywiseactivity.push(datas);
      }

      const data = {
        title: createChallenge.title,
        description: createChallenge.description,
        end_date: "2023/11/22 12:00",
        daywiseactivity,
      };

      if (createChallenge.problems[0]) {
        data["problems"] = createChallenge.problems;
      }

      try {
        const response = await PostService(API_URL.ADD_CHALLENGE, data);
        toaster("successful created", "success");
        console.log("Response from server:", response);

        const button = document.getElementById("modelClose");

        button.click();
      } catch (error) {
        toaster(error?.data?.msg, "error");
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  const setvalues = (e) => {
    const { name, value } = e.target;
    setCreateChallenge({ ...createChallenge, [name]: value });
  };

  useEffect(() => {
    const value = selected?.map((value) => {
      return value.value;
    });

    setCreateChallenge((s) => ({ ...s, problems: value }));
  }, [selected]);

  const reset = () => {
    setCreateChallenge({
      title: "",
      description: "",
      problems: [],
    });

    setError(false);
  };

  const handlePageClick = (value) => {
    setCurrentPage(value - 1);
  };

  return (
    <>
      <div>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Challenges</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Challenges</li>
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
                          &nbsp; Add Challenges
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
                            <th className="text-center">Starting Date</th>
                            <th className="text-center">action</th>
                          </tr>
                        </thead>
                        {!loading && (
                          <tbody>
                            {datas.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center">
                                  {currentPage * limit + index + 1}
                                  
                                  </td>
                                  <td className="text-center">{data.title}</td>
                                  <td className="text-center">
                                    {data.description}
                                  </td>
                                  <td className="text-center">
                                    {data?.start_date?.slice(0, 10)}
                                  </td>
                                  <td className="text-center ">
                                    {/* <span
                                      title="Update"
                                      style={{ cursor: "pointer" }}
                                      className="mx-2  text-dark fas fa-pen cursor"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                    ></span> */}

                                    <Link to={`/challenges/view/${data._id}`}>
                                      <span
                                        title="View"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className=" mx-2 text-warning fas fa-eye"></i>
                                      </span>
                                    </Link>

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
                                            name: "CHALLENGES",
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
                              <div className="d-flex justify-content-end mr-4 mt-3">
          <Pagination
            totalData={total}
            onChangePage={handlePageClick}
            activePage={currentPage + 1}
          ></Pagination>
        </div>
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

      {/* add model */}

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
                  Add Challenge
                </h5>
                <button
                  type="button"
                  id="modelClose"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form className="row">
                  <div className="form-group col-6">
                    <label htmlFor="title" className="col-form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="name"
                      value={createChallenge.title}
                      onChange={(e) => {
                        setvalues(e);
                      }}
                    />
                    {error && !createChallenge.title && (
                      <div className="text-danger">Required </div>
                    )}
                  </div>

                  <div className="form-group col-6">
                    <label htmlFor="pid" className="col-form-label">
                      Problem
                    </label>

                    <MultiSelect
                      id="pid"
                      options={showIds}
                      value={selected}
                      onChange={setSelected}
                      labelledBy={"Select"}
                      isCreatable={true}
                    />
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="description" className="col-form-label">
                      Description
                    </label>
                    <textarea
                      row="3"
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="description"
                      value={createChallenge.description}
                      onChange={(e) => {
                        setvalues(e);
                      }}
                    />
                    {error && !createChallenge.description && (
                      <div className="text-danger">Required </div>
                    )}
                  </div>

                  <div className="form-group col-12">
                    <label htmlFor="day_label" className="col-form-label">
                      Day
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="day_label"
                      name="day_label"
                      placeholder="30"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                    />
                    {error && !number && (
                      <div className="text-danger">Required </div>
                    )}
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={create}
                >
                  Create
                </button>
              </div>
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

export default Challenges;
