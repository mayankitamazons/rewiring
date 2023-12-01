import React, { useEffect, useState, useRef } from "react";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import { PostService, patchService } from "../../../Services/CrudServices";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import DeleteModel from "../../Model/DeleteModel";
import { MultiSelect } from "react-multi-select-component";
import "./Meditation.css";
import defaultMeditationImage from "../../../Assets/Images/defaultMeditationImage.jpg";

import toaster from "../../../Helpers/Toastify";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../Helpers/Pagination";

const Meditation = () => {
  const limit = 10
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [contain, setContain] = useState({});
  const ref1 = useRef();
  const ref2 = useRef();
  const [id, setId] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [selected, setSelected] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [containData, setContainData] = useState({
    title: "",
    description:"",
    problems: [],
    image:'',
    icon: "",
    // bg_color:"",
    status: 1,
  });

  const [showIds, setShowIds] = useState([]);

  const [createError, setCreateError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "MEDITATION",
  });
  const [deleteValue, setDeleteValue] = useState(true);

  useEffect(() => {
    getalldata();
    getproblem_id();
  }, [deleteValue,currentPage]);

  const setvalues = (e) => {
    const { name, value } = e.target;
    if (name === "image" || name === "icon" ) {
      setContainData({
        ...containData,
        [name]: e.target.files[0],
      });
    } else {
      setContainData({ ...containData, [name]: value });    
    }
  };

  useEffect(() => {
    const value = selected?.map((value) => {
      return value.value;
    });
    
    setContainData((s) => ({ ...s, problems: value })); 
  }, [selected]);

  //get api call

  const getalldata = async () => {

    try {
      setLoading(true);
      const res = await PostService(
        `${API_URL.COMMON_DOCUMENT_COUNT + "MEDITATION/doc_count"}`
      );
      console.log(res.data.data.count,"ssss");
      setTotal(res.data.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }



    const data = {
      status: 1,
    };
    try {
      setLoading(true);
      const res = await PostService(
        `${API_URL.MEDITATION_FILTER}?page=${currentPage}&limit=${limit}`
        , data);
      console.log(res.data.data);
      setDatas(res.data.data);
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

      console.log(res.data.data);
      const databox = res?.data?.data.map((data) => {
        return { label: data.title, value: data._id };
      });

      setShowIds(databox);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  //create sound api

  const create = async () => {
    if (
      containData.title &&
      containData.description &&
      // containData.bg_color &&
      containData.image.name &&
      containData.icon.name 
     
    ) {
      const formData = new FormData();
      formData.append("files", containData.image);
      formData.append("files", containData.icon);
      formData.append("isMultiple", true);
      formData.append("path", "blog/gallery");

      try {
        const response = await PostService(API_URL.Multi_file_upload, formData);

        if (response?.data) {
          const data = {
            title: containData.title,
            description: containData.description,
            // bg_color: containData.bg_color,
            image: response?.data?.data[0],
            icon: response?.data.data[1],
            problems: containData.problems,
            status: containData.status,
          };

          if (containData.problems.length === 0) {
            delete data.problems;
          }

          const responses = await PostService(API_URL.ADD_MEDITATION, data);

          console.log("Response from server:", responses);
          toaster('successful created', "success");
          getalldata();
          const button = document.getElementById("modelClose");

          button.click();
        }
      } catch (error) {
        toaster(error?.data?.msg, "error");
        console.error(error);
      }
    }
    setCreateError(true);
  };

  const reset = () => {
    setIsCreated(true);
    setContainData({
      title: "",
      description:"",
      problems: [],
      image:'',
      icon: "",
      // bg_color:"",
      status: 1,
    });

    setIsUpdate(false);

    setCreateError(false);
    setSelected([]);
  };

  const errorfunction = () => {
//     ref1.current.src = defaultnoimage;
  };

  const errorfunction1 = () => {
//     ref2.current.src = defaultnoimage;
  };

  //api update

  const updateSound = async () => {
  //   if (
  //     containData.title &&
  //     containData.description &&
  //     // containData.bg_color &&
  //     (containData?.image || containData?.image?.name) &&
  //     (containData?.icon || containData?.icon?.name) 
  //   ) {
  //     let obj = {};
  //     for (let key in contain) {
  //       if (contain[key] !== containData[key]) {
  //         obj[key] = containData[key];
  //       }
  //     }

  //     if (obj?.audio_file?.name || obj?.cover_img?.name || obj?.icon?.name) {
  //       if (obj?.audio_file?.name) {
  //         const formData = new FormData();
  //         formData.append("files", obj.audio_file);
  //         formData.append("isMultiple", false);
  //         formData.append("path", "blog/gallery");

  //         try {
  //           const response = await PostService(
  //             API_URL.Multi_file_upload,
  //             formData
  //           );
  //           obj.audio_file = response.data.data[0];
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }

  //       if (obj?.cover_img?.name) {
  //         const formData = new FormData();
  //         formData.append("files", obj.cover_img);
  //         formData.append("isMultiple", false);
  //         formData.append("path", "blog/gallery");
  //         try {
  //           const response = await PostService(
  //             API_URL.Multi_file_upload,
  //             formData
  //           );
  //           obj.cover_img = response.data.data[0];
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }

  //       if (obj?.icon?.name) {
  //         const formData = new FormData();
  //         formData.append("files", obj.icon);
  //         formData.append("isMultiple", false);
  //         formData.append("path", "blog/gallery");
  //         try {
  //           const response = await PostService(
  //             API_URL.Multi_file_upload,
  //             formData
  //           );
  //           obj.icon = response.data.data[0];
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //     }


  //     try {
  //       if (obj?.problems?.length === 0) {
  //         delete obj.problems;
  //       }

  //       const response = await patchService(
  //         API_URL.Sound_UPDATE_BY_ID + id,
  //         obj
  //       );

  //       console.log("Response from server:", response);
  //       toaster('sucessfully updated', "success");
  //       getalldata();
  //       const button = document.getElementById("modelClose");

  //       button.click();
  //     } catch (error) {
  //       toaster(error?.data?.msg, "error");
  //       console.error(error);
  //     }
  //   }
  //   setCreateError(true);
  };

  const updatefunction = (data) => {
    setIsUpdate(true);
    setCreateError(false);
    setId(data._id);
    const { problems } = data;
console.log(data,"updatawe")
    const problem = problems.map((value) => {
      return { label: value.title, value: value._id };
    });

    setSelected(problem);

    const problematic = problems.map((value) => {
      return value._id;
    });

    setContainData({ ...data, problems: problematic });
    setContain({ ...data, problems: problematic });
    setIsCreated(false);
  };

  const handlePageClick = (value) => {
    setCurrentPage(value - 1);
  };

  const defaultimage = (index) => {
    const id = document.getElementById(index);
    id.src = defaultMeditationImage;
  };

  return (
    <>{console.log(containData)}
      <div>
        <div className="content-header meditation-component">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Meditations</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Meditations</li>
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
                          style={{ cursor: "pointer" }}
                          className="btn btn-outline-success "
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={reset}
                        >
                          {" "}
                          <i className="fas fa-plus"></i>
                          &nbsp; Add Meditations
                        </button>
                      </div>
                    </div>
                    <div className="card-body table-responsive">
                      <table className="table table-hover text-nowrap table-bordered " >
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              style={{ width: "10%" }}
                            >
                              S.No
                            </th>
                            <th className="text-center">icon</th>  
                            <th className="text-center"       style={{ width: "30%" }}>Title</th>
                            {/* <th className="text-center">Description</th> */}
                          
                            {/* <th className="text-center">Image</th> */}
                            <th className="text-center">Created Date</th>
                            {/* <th className="text-center">Updated Date</th> */}
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
                                  <td className="text-center ">
                                    <img
                                    style={{width:40,height:40}}
                                      className="icon-image-home"
                                      id={index}
                                      src={data?.icon}
                                      alt={data?.icon}
                                      onError={() => defaultimage(index)}
                                    />
                                  </td>
                                  <td className="text-center">
                                    {data?.title}
                                  </td>
                                  <td className="text-center">{data?.created_date?.slice(0,10)}</td>
                                  
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
                                        updatefunction(data);
                                      }}
                                    ></span>
                                    <Link to={`/meditation/view/${data._id}`}>
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
                                            name: "MEDITATION",
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
                {isUpdate ? "Update" : "Add"} Sound
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
                  <label htmlFor="title" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={containData.title}
                    placeholder="title"
                    onChange={(e) => setvalues(e)}
                  />
                  {!containData.title && createError && (
                    <div className="text-danger">Required </div>
                  )}
                </div>

                {/* <div className="form-group col-6">
                  <label htmlFor="bg_color" className="col-form-label">
                    Background Color
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bg_color"
                    name="bg_color"
                    value={containData.bg_color}
                    placeholder="    Baackground Color"
                    onChange={(e) => setvalues(e)}
                  />
                  {!containData.bg_color && createError && (
                    <div className="text-danger">Required </div>
                  )}
                </div> */}

                <div className="form-group col-12">
                  <label htmlFor="album" className="col-form-label">
                    Description
                  </label>
                  <textarea
                  row="3"
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={containData.description}
                    placeholder="description"
                    onChange={(e) => setvalues(e)}
                  ></textarea>
                  {!containData.description && createError && (
                    <div className="text-danger">Required </div>
                  )}
                </div>

         

                <div className="form-group col-6">
                  <label htmlFor="problems" className="col-form-label">
                    Problem
                  </label>

                  <MultiSelect
                    id="problems"
                    options={showIds}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                    isCreatable={true}
                  />
                </div>

                <div className="form-group col-6">
                  <label htmlFor="status" className="col-form-label">
                    status
                  </label>

                  <select
                    className="form-select select"
                    aria-label="Default select example"
                    name="status"
                    id="status"
                    onChange={(e) => {
                      setvalues(e);
                    }}
                    value={containData.status}
                  >
                    <option value="1" >
                      Active
                    </option>
                    <option value="0" >
                      Deactive
                    </option>
                  </select>
                </div>

                <div className="col-6 mt-3" style={{height:126}}>
                  <p className="font-weight-bold " style={{ marginBottom: 6 }}>
                     Image
                  </p>

                  <label
                    htmlFor="image"
                    className=" col-6 d- mb-0 btn btn-primary"
                    style={{ borderRadius: 4, minHeight: 40 }}
                  >
                    Select  Image
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
                  {!containData.image && createError && (
                    <p className="text-danger pl-2 mb-0">required</p>
                  )}
                </div>

                <div className="col-6 row p-0 mr-0">
                  <div className="col-6 mt-3">
                    <p
                      className="font-weight-bold "
                      style={{ marginBottom: 6 }}
                    >
                      Icon
                    </p>
                    <label
                      htmlFor="icon"
                      className=" btn btn-primary mb-0"
                      style={{ borderRadius: 4, minHeight: 40 }}
                    >
                      Selct Icon
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      className="form-control text-break"
                      id="icon"
                      name="icon"
                      placeholder="icon"
                      onChange={setvalues}
                    />
                    {!containData.icon && createError && (
                      <p className="text-danger pl-2 mb-0">required</p>
                    )}
                  </div>

                  <div className="col-6 mt-4">
                    {isUpdate && (
                      <div className="d-flex justify-content-center alien-content-center">
                        {containData?.icon && !containData?.icon?.name && (
                          <img
                            className="border border-secondary "
                            ref={ref1}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 50,
                            }}
                            src={containData.icon}
                            alt={containData?.icon}
                            onError={errorfunction}
                          />
                        )}

                        {containData?.icon && containData?.icon?.name && (
                          <img
                            className="border border-secondary "
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 50,
                            }}
                            src={URL.createObjectURL(containData.icon)}
                            alt={containData.icon}
                          />
                        )}
                      </div>
                    )}

                    {isCreated && (
                      <div
                        className="d-flex justify-content-center alien-content-center"
                        style={{ minWidth: "auto" }}
                      >
                        {containData.icon && (
                          <img
                            className="border border-secondary"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 50,
                            }}
                            src={URL.createObjectURL(containData.icon)}
                            alt={containData.icon}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6 "  >
                  {isUpdate && (
                    <div style={{ minWidth: "auto" }}>
                      {containData?.image && !containData?.image?.name && (
                        <img
                          className="border border-secondary "
                          ref={ref2}
                          style={{ width: 200, height: 200, borderRadius: 10 }}
                          onError={errorfunction1}
                          src={containData?.image}
                          alt={containData.image}
                        />
                      )}

                      {containData?.image && containData?.image?.name && (
                        <img
                          className="border border-secondary "
                          style={{ width: 200, height: 200, borderRadius: 10 }}
                          src={URL.createObjectURL(containData.image)}
                          alt={containData?.cover_img}
                        />
                      )}
                    </div>
                  )}

                  {isCreated && (
                    <div style={{ minWidth: "auto" }}>
                      {containData.image && (
                        <img
                          className="border border-secondary"
                          style={{ width: 100, height: 100, borderRadius: 10 }}
                          src={URL.createObjectURL(containData?.image)}
                          alt={containData.image}
                        />
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer ">
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Clear</button> */}
              {isCreated && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={create}
                >
                  Create
                </button>
              )}

              {isUpdate && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateSound}
                >
                  Update
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

export default Meditation;
