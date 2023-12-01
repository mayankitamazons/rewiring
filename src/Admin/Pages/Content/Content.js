import React, { useEffect, useState, useRef } from "react";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import {
  GetService,
  PostService,
  patchService,
} from "../../../Services/CrudServices";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import DeleteModel from "../../Model/DeleteModel";
import Pagination from "../../../Helpers/Pagination";
import defaultnoimage from "../../../Assets/Images/defaultnoimage.png";
import toaster from "../../../Helpers/Toastify";
import { ToastContainer} from 'react-toastify';

const Content = () => {
  const [viewData, setViewData] = useState({});
  const ref1 = useRef();
  const limit =10 ;
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCreated, setIsCreated] = useState(false);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState("");
  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "PAGE",
  });
  const [deleteValue, setDeleteValue] = useState(true);

  useEffect(() => {
    getalldata();
  }, [currentPage]);

  const [data, setData] = useState({
    title: "",
    content: "",
    status: 1,
    image: "",
  });

  //get api call

  const getalldata = async () => {



    try {
      setLoading(true)
      const res = await PostService(`${API_URL.COMMON_DOCUMENT_COUNT + 'PAGE/doc_count' }`);
      // console.log(res.data.data.count)
      setTotal(res.data.data.count)
      setLoading(false)


  } catch (error) {
      setLoading(false)
      console.error("Error occurred:", error);
  }

    try {

      
      setLoading(true);
      const res = await GetService(
        `${API_URL.GET_ALL_PAGES}page=${currentPage}&limit=${limit}`,data
      );

      setDatas(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  const reset = () => {
    setData({
      title: "",
      content: "",
      status: 1,
      image: "",
    });
    setError(false);
    setIsCreated(true);
    setIsUpdate(false);
  };

  const setvalues = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setData({ ...data, [name]: e.target.files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const createfun = async () => {
    if (data.title && data.content && data.image.name) {
      const formData = new FormData();
      formData.append("files", data.image);
      formData.append("isMultiple", false);
      formData.append("path", "blog/gallery");

      try {
        const response = await PostService(API_URL.Multi_file_upload, formData);
        if (response?.data) {
          const sendData = {
            title: data.title,
            content: data.content,
            status: data.status,
            image: response.data.data[0],
          };
          const res = await PostService(API_URL.ADD_PAGE, sendData);
          console.log(res.data.data);
          toaster('successful created', "success");
          getalldata();

          const button = document.getElementById("modelClose");
          button.click();
        }
      } catch {
        toaster(error?.data?.msg, "error");
        console.error("Error occurred:", error);
      }
    }
    setError(true);
  };

  const updatefun = async () => {
    if (data.title && data.content && data.image) {
      const sendData = {
        title: data.title,
        content: data.content,
        status: data.status,
        image: data.image,
      };

      if (data?.image?.name) {
        const formData = new FormData();
        formData.append("files", data.image);
        formData.append("isMultiple", false);
        formData.append("path", "blog/gallery");

        try {
          const response = await PostService(
            API_URL.Multi_file_upload,
            formData
          );
          sendData.image = response.data.data[0];
        } catch (error) {
          console.error(error);
        }
      }


      try {
        const res = await patchService(API_URL.UPDATA_PAGE + id, sendData);
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

  const errorfunction = () => {
    ref1.current.src = defaultnoimage;
  };

  return (
    <>
      <div>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Content</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Content</li>
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
                          &nbsp; Add Content
                        </button>
                      </div>
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
                            <th
                              className="text-center"
                              style={{ width: "20%" }}
                            >
                              About Us
                            </th>
                            <th
                              className="text-center"
                              style={{ width: "35%" }}
                            >
                              Description
                            </th>
                            <th
                              className="text-center"
                              style={{ width: "15%" }}
                            >
                              Status
                            </th>
                            <th
                              className="text-center"
                              style={{ width: "20%" }}
                            >
                              Action
                            </th>
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
                                  <td className="text-center"  >{data.title}</td>
                                  <td className="text-center" style={{ whiteSpace: 'pre-wrap' }}>
                                    {data.content}
                                  </td>

                                  {/* <td className="text-center">
                                    {data.created_date.slice(0, 10)}
                                  </td> */}

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
                                        setIsCreated(false);
                                        setIsUpdate(true);
                                        setId(data._id);
                                        setError(false);
                                        setData({
                                          title: data.title,
                                          content: data.content,
                                          image: data.image,
                                          status: data.status,
                                        });
                                      }}
                                    ></span>

                                    <span
                                      title="View"
                                      data-toggle="modal"
                                      data-target="#ViewModal"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => setViewData(data)}
                                    >
                                      <i className=" mx-2 text-warning fas fa-eye"></i>
                                    </span>

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
                                            name: "PAGE",
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
                {isUpdate ? "Update" : "Add"} Content
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
              <form className="row">
                <div className="form-group col-6">
                  <label htmlFor="title" className="col-form-label">
                    About Us
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="about us"
                    value={data.title}
                    onChange={(e) => {
                      setvalues(e);
                    }}
                  />
                  {error && !data.title && (
                    <div className="text-danger">required</div>
                  )}
                </div>

                <div className="form-group col-6">
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
                    value={data.status} 
                  >
                    <option value="0" >
                      Deactive
                    </option>
                    <option value="1" >
                      Active
                    </option>
                  </select>
                </div>

                <div className="form-group col-12">
                  <label htmlFor="content" className="col-form-label word-break">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    type="text"
                    className="form-control"
                    id="content"
                    name="content"
                    placeholder="description"
                    value={data.content}
                    onChange={(e) => {
                      setvalues(e);
                    }}
                  ></textarea>
                  {error && !data.content && (
                    <div className="text-danger">required</div>
                  )}
                </div>

                <div className="col-4 mt-3">
                  <p className="font-weight-bold " style={{ marginBottom: 6 }}>
                    Image
                  </p>

                  <label
                    htmlFor="image"
                    className=" col-6 d- mb-0 btn btn-primary"
                    style={{ borderRadius: 4, minHeight: 40 }}
                  >
                    Select Image
                  </label>

                  <input
                    style={{ display: "none" }}
                    type="file"
                    className="form-control text-break"
                    id="image"
                    name="image"
                    placeholder="image"
                    onChange={setvalues}
                  />
                  {!data.image && error && (
                    <p className="text-danger pl-2 mb-0">required</p>
                  )}
                </div>

                <div className="col-8 ">
                  {isUpdate && (
                    <div className="d-flex justify-content-end">
                      {data?.image && !data?.image?.name && (
                        <img
                          className="border border-secondary mt-3"
                          ref={ref1}
                          style={{ width: 100, height: 100, borderRadius: 10 }}
                          onError={errorfunction}
                          src={data?.image}
                          alt={data?.image}
                        />
                      )}

                      {data?.image?.name && (
                        <img
                          className="border border-secondary mt-3"
                          style={{ width: 100, height: 100, borderRadius: 10 }}
                          src={URL.createObjectURL(data?.image)}
                          alt={data?.image}
                        />
                      )}
                    </div>
                  )}

                  {isCreated && (
                    <div className="d-flex justify-content-end">
                      {data.image && (
                        <img
                          className="border border-secondary mt-3"
                          style={{ width: 100, height: 100, borderRadius: 10 }}
                          src={URL.createObjectURL(data?.image)}
                          alt={data.image}
                        />
                      )}
                    </div>
                  )}
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
                  onClick={createfun}
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* view model */}
      <div
        className="modal fade"
        id="ViewModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {viewData.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // id="modelClose"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row pl-3" style={{backgroundColor:'#E5EAF2' , borderRadius:10 , paddingBottom:20}}>
                <div className="p-2">
                  <span>Image : </span>
                  <span>
                             <img
                          className="border border-secondary mt-3"
                          ref={ref1}
                          style={{ width: 100, height: 100, borderRadius: 10 }}
                          onError={errorfunction}
                          src={viewData?.image}
                          alt={viewData?.image}
                        /></span>
                </div>
                <div className="p-1">
                  <span>About Us : </span>
                  <span>{viewData?.title}</span>
                </div>
                <div className="p-1">
                  <span>Description : </span>
                  <span>{viewData?.content}</span>
                </div>
                <div className="p-1">
                  <span>
                  Status : </span>
                  <span>{viewData?.status}</span>
                </div>
                <div className="p-1">
                  <span>Created Date : </span>
                  <span>{viewData?.created_date?.slice(0,10)}
                  </span>
                </div>


              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
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

      {/*view model*/}
    </>
  );
};

export default Content;
