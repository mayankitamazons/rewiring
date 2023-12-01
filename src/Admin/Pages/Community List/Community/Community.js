import React, { useEffect, useState } from "react";
import API_URL from "../../../../Environment/ApiRoutes.js/ApiRoutes";
import {
  GetService,
  PostService,
  patchService,
} from "../../../../Services/CrudServices";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import DeleteModel from "../../../Model/DeleteModel";
import Pagination from "../../../../Helpers/Pagination";
import toaster from "../../../../Helpers/Toastify";
import { ToastContainer } from "react-toastify";

const Community = () => {
  const limit = 10
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState("");
  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "COMMUNITY",
  });
  const [deleteValue, setDeleteValue] = useState(true);

  useEffect(() => {
    getalldata();
  }, [currentPage]);

  const [community, setcommunity] = useState({
    name: "",
    status: 1,
  });

  //get api call

  const getalldata = async () => {

    try {
      setLoading(true)
      const res = await PostService(`${API_URL.COMMON_DOCUMENT_COUNT + 'COMMUNITY/doc_count' }` );

      setTotal(res.data.data.count)
      setLoading(false)


  } catch (error) {
      setLoading(false)
      console.error("Error occurred:", error);
  }

    try {
      setLoading(true);
      const res = await GetService(
        `${API_URL.COMMUNITY_LIST}page=${currentPage}&limit=${limit}`
      );

      console.log(res, "response");
      setDatas(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  const reset = () => {
    setIsUpdate(false)
    setcommunity({
      name: "",
      status: 1,
    });
    setError(false);
  };

  const setvalues = (e) => {
    const { name, value } = e.target;
    setcommunity({ ...community, [name]: value });
  };

  const create = async () => {
    if (community.name) {
      try {
        const res = await PostService(API_URL.COMMUNITY_ADD, community);
        console.log(res.data.data);
        toaster("successfully created", "success");
        getalldata();

        const button = document.getElementById("modelClose");
        button.click();
      } catch {
        toaster(error?.data?.msg, "error");
        console.error("Error occurred:", error);
      }
    }
    setError(true);
  };

  const updatefun = async () => {
    if (community.name) {
      try {
        const res = await patchService(API_URL.COMMUNITY_ADD + id, community);
        console.log(res.data.data);
        toaster("successfully updated", "success");
        getalldata();

        const button = document.getElementById("modelClose");
        button.click();
      } catch {
        toaster(error?.data?.msg, "error");
        console.error("Error occurred:", error);
      }
    }
    setError(true);
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
                <h1 className="m-0">Community</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Community</li>
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
                          &nbsp; Add Community
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
                            <th className="text-center">Name</th>
                            <th className="text-center">Created Data</th>
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
                                    {currentPage * limit + index + 1}
                                  </td>
                                  <td className="text-center">{data.name}</td>
                                  <td className="text-center">
                                    {data.created_date.slice(0, 10)}
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
                                        setIsUpdate(true);
                                        setId(data._id);
                                        setError(false);
                                        setcommunity({
                                          name: data.name,
                                          status: data.status,
                                        });
                                      }}
                                    ></span>
                                    {/* <Link to={`/questions/view/${data._id}`}>
                                      <span
                                        title="View"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className=" mx-2 text-warning fas fa-eye"></i>
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
                                            data: data.name,
                                            name: "COMMUNITY",
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
            activePage={currentPage + 1}
          ></Pagination>
        </div>
        <ToastContainer />
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
                {isUpdate ? "Update" : "Add"} Community
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="modelClose"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="name"
                    value={community.name}
                    onChange={(e) => {
                      setvalues(e);
                    }}
                  />
                  {error && !community.name && (
                    <div className="text-danger">required</div>
                  )}
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
                    value={community.status}
                  >
                    <option value="0">
                      Deactive
                    </option>
                    <option value="1" >
                      Active
                    </option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
              {isUpdate ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updatefun}
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={create}
                >
                  Create
                </button>
              )}
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

export default Community;
