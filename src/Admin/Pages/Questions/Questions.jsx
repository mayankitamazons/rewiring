import React, { useEffect, useState } from "react";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import { PostService } from "../../../Services/CrudServices";
import { Link } from "react-router-dom";
import "./Questions.css";
import { FadeLoader } from "react-spinners";
import DeleteModel from "../../Model/DeleteModel";
import { MultiSelect } from "react-multi-select-component";
import Pagination from "../../../Helpers/Pagination";
import toaster from "../../../Helpers/Toastify";
import { ToastContainer } from "react-toastify";

const Questions = () => {
  const limit =10
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [selected, setSelected] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [QuestionData, setQuestionData] = useState({
    text: "",
    score: 0,
    problem_id: [],
  });
  const [addQuestions, setAddQuestions] = useState("");
  const [showIds, setShowIds] = useState([]);
  const [showingData, setShowingsData] = useState([]);
  const [newError, setNewError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [updateQues, setUpdateQuestion] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "QUESTION",
  });
  const [deleteValue, setDeleteValue] = useState(true);

  useEffect(() => {
    getalldata();
    getproblem_id();
  }, [deleteValue, currentPage]);

  const setvalues = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...QuestionData, [name]: value });
  };

  useEffect(() => {
    const value = selected?.map((value) => {
      return value.value;
    });
    setQuestionData( { ...QuestionData, problem_id: value });
  }, [selected]);

  //get api call

  const getalldata = async () => {
    const parameter = {
      status: 1,
    };
    try {
      setLoading(true);
      const res = await PostService(
        `${API_URL.COMMON_DOCUMENT_COUNT + "QUESTION/doc_count"}`,
        parameter
      );

      setTotal(res.data.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }

    const data = {
      status: 1,
      filter_case: "status",
    };
    try {
      setLoading(true);
      const res = await PostService(
        `${API_URL.QUESTIONS_LIST_WITH_FILTER}limit=${limit}&page=${currentPage}`,
        data
      );
      console.log(res.data.data);
      setDatas(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  const handlePageClick = (value) => {
    setCurrentPage(value);
  };

  // post api service

  const getproblem_id = async () => {
    const data = {
      status: 1,
    };
    try {
      const res = await PostService(API_URL.Problem_filter, data);

      console.log(res.data.data);
      const databox = res?.data?.data.map((data) => {
        return { label: data.title, value: data._id };
      });

      setShowIds(databox);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  //create user api
  const createquestion = async () => {
    if (addQuestions && showingData[0]?.text) {
      const data = {
        question: addQuestions,
        answers: showingData,
        status: 1,
        question_type: 1,
      };
      try {
        const response = await PostService(
          API_URL.MULTI_CHOICE_QUESTION_CREATE,
          data
        );

        console.log("Response from server:", response);
        toaster("successfully", "success");
        getalldata();
        const button = document.getElementById("modelClose");

        button.click();
      } catch (error) {
        toaster(error?.data?.msg, "error");
        console.error(error);
      }
    }
    setCreateError(true);
  };

  const addingData = (e) => {
    e.preventDefault();
    if (QuestionData.text) {
      if (QuestionData.problem_id[0]) {
        setShowingsData([...showingData, QuestionData]);
      } else {
        const { problem_id, ...items } = QuestionData;
        setShowingsData([...showingData, items]);
      }

      setQuestionData({
        text: "",
        score: 0,
        problem_id: [],
      });

      setSelected([]);

      setNewError(false);
    } else {
      setNewError(true);
    }
  };

  const reset = () => {
    setUpdateQuestion(false);
    setAddQuestions("");
    setNewError(false);
    setQuestionData({
      text: "",
      score: 0,
      problem_id: [],
    });
    setEdit(false);
    setShowingsData([]);
    setCreateError(false);
    setSelected([]);
  };

  const deleteobj = (i) => {
    const updatedData = showingData.filter((value, index) => index !== i);
    setShowingsData(updatedData);
  };

  const editfun = (i) => {
    setEdit(true);
    const editdata = showingData.find((value, index) => index === i);
    const newdata = { ...editdata };
    newdata.objs = i;
    setQuestionData(newdata);

    const editSelectData = newdata?.problem_id?.map((data) => {
      return showIds.find((dataIds) => {
        return dataIds.value === data;
      });
    });
    editSelectData ? setSelected(editSelectData) : setSelected([]);
  };

  const editdata = (e) => {
    e.preventDefault();
    if (QuestionData.text) {
      const newArray = showingData.map((item, index) => {
        if (index === QuestionData.objs) {
          if (QuestionData.problem_id[0]) {
            const { text, score, problem_id } = QuestionData;

            return { ...item, text, score, problem_id };
          } else {
            const { problem_id, ...rest } = item;
            const { text, score } = QuestionData;
            return { ...rest, text, score };
          }
        }
        return item;
      });
      setShowingsData(newArray);
      setQuestionData({
        text: "",
        score: 0,
        problem_id: [],
      });
      setSelected([]);
      setEdit(false);
      setNewError(false);
    } else {
      setNewError(true);
    }
  };

  return (
    <>
      <div>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Questions</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Questions</li>
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
                          <i className="fas fa-plus"></i>
                          &nbsp; Add Questions
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
                            <th className="text-center">Questions</th>
                            <th className="text-center">Created Date</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        {!loading && (
                          <tbody>
                            {datas.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center">
                                    {" "}
                                    {(currentPage - 1) * limit + index + 1}
                                  </td>
                                  <td className="text-center">
                                    {data.question}
                                  </td>

                                  <td className="text-center">
                                    {data?.created_date?.slice(0, 10)}
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
                                    <span
                                      title="Update"
                                      style={{ cursor: "pointer" }}
                                      className="mx-2  text-dark fas fa-pen cursor"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      onClick={() => {
                                        setUpdateQuestion(true);
                                        setShowingsData([...data.answers]);
                                        setQuestionData({
                                          text: "",
                                          score: 0,
                                          problem_id: [],
                                        });
                                        setAddQuestions(data.question);
                                        setSelected([]);
                                      }}
                                    ></span>
                                    <Link to={`/questions/view/${data._id}`}>
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
                                            data: data.question,
                                            name: "QUESTION",
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
        <div className="d-flex justify-content-end mr-4 mt-3">
          <Pagination
            totalData={total}
            onChangePage={handlePageClick}
            activePage={currentPage}
          ></Pagination>
        </div>
        <ToastContainer />
      </div>

      {/* add model */}

      <div
        className="modal fade "
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
                {updateQues ? "Update" : "Add"} Question
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
            <div className="modal-body ">
              <form className="row">
                <div className="form-group col-12">
                  <label htmlFor="question" className="col-form-label">
                    Questions
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="question"
                    placeholder="question"
                    value={addQuestions}
                    onChange={(e) => setAddQuestions(e.target.value)}
                  />
                  {createError && !addQuestions && (
                    <div className="text-danger">Required </div>
                  )}
                </div>

                <div className="row">
                  <div className="form-group col-3">
                    <label htmlFor="text" className="col-form-label">
                      Options
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="text"
                      name="text"
                      value={QuestionData.text}
                      placeholder="options"
                      onChange={(e) => setvalues(e)}
                    />
                    {!QuestionData.text && newError && (
                      <div className="text-danger">Required </div>
                    )}
                  </div>

                  <div className="form-group col-3">
                    <label htmlFor="score" className="col-form-label">
                      Score
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="score"
                      name="score"
                      placeholder="score"
                      value={QuestionData.score}
                      onChange={(e) => setvalues(e)}
                    />
                  </div>

                  <div className="form-group col-4">
                    <label htmlFor="pid" className="col-form-label">
                      Problem
                    </label>

                    <MultiSelect
                      options={showIds}
                      value={selected}
                      onChange={setSelected}
                      labelledBy={"Select"}
                      isCreatable={true}
                    />
                  </div>

                  {!edit ? (
                    <div className="form-group col-2 d-flex justify-content-center ">
                      <button
                        className="btn btn-primary ques-addmodel-button"
                        onClick={(e) => {
                          addingData(e);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <div className="form-group col-2 d-flex justify-content-center ">
                      <button
                        className="btn btn-primary ques-addmodel-button"
                        onClick={(e) => editdata(e)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
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
                              <th className="text-center">Options</th>
                              <th className="text-center">Score</th>
                              <th className="text-center">Problem</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {showingData[0]?.text &&
                              showingData?.map((data, index) => {
                                return (
                                  <tr key={index}>
                                    <td
                                      className="text-center"
                                      style={{ width: "50%" }}
                                    >
                                      {data?.text}
                                    </td>
                                    <td
                                      className="text-center"
                                      style={{ width: "15%" }}
                                    >
                                      {data?.score}
                                    </td>
                                    <td
                                      className="text-center"
                                      style={{ width: "15%" }}
                                    >
                                      {data?.problem_id &&
                                      data.problem_id.length > 0
                                        ? data.problem_id.map((name, index) => (
                                            <span key={index}>
                                              {showIds.find(
                                                (datavalue) =>
                                                  datavalue?.value === name
                                              )?.label || ""}
                                              {index !==
                                              data.problem_id.length - 1
                                                ? ", "
                                                : ""}
                                            </span>
                                          ))
                                        : ""}
                                    </td>

                                    <td
                                      className="text-center "
                                      style={{ width: "20%" }}
                                    >
                                      <span
                                        title="Update"
                                        style={{ cursor: "pointer" }}
                                        className="mx-2 fas fa-pen cursor"
                                        onClick={(e) => editfun(index)}
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
                      {!showingData[0]?.text && (
                        <h3 className="d-flex justify-content-center text-secondary mt-2 fs-6">
                          No Data Available
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="modal-footer ">
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Clear</button> */}

              <button
                type="button"
                className="btn btn-primary"
                onClick={createquestion}
              >
                {updateQues ? "Update" : "Create"}{" "}
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

export default Questions;
