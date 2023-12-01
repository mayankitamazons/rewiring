import React, { useEffect, useState, } from "react";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import {
  GetService,
  PostService,
  patchService,
} from "../../../Services/CrudServices";
import { Link } from "react-router-dom";
import defaultuserimage from "../../../Assets/Images/defaultuserimage.png";
import "./Users.css";
import { FadeLoader } from "react-spinners";
import DeleteModel from "../../Model/DeleteModel";
import Pagination from "../../../Helpers/Pagination";
import toaster from "../../../Helpers/Toastify";
import { ToastContainer} from 'react-toastify';

const Users = () => {
  const limit = 10
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [datas, setDatas] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    dob: "",
    email: "",
    profile_pic: "",
    nickname: "",
    password: "",
    repassword: "",
    role: 2,
  });
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "USER",
  });
  const [deleteValue, setDeleteValue] = useState(true);

  useEffect(() => {
    getalldata();
  }, [deleteValue, currentPage]);

  //get api call

  const getalldata = async (e) => {
    try {
      setLoading(true);
      const res = await PostService(
        `${API_URL.COMMON_DOCUMENT_COUNT + "USER/doc_count"}`
      );
      setTotal(res.data.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }

    try {
      setLoading(true);
      const res = await GetService(
        `${API_URL.ALL_USERS}page=${currentPage}&limit=${limit}&userRole=2`
      );
      setDatas(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
    }
  };

  //post api call

  const createUser = async () => {
    if (
      userData.name &&
      userData.nickname &&
      userData.dob &&
      userData.email &&
      !emailError &&
      userData.profile_pic
    ) {
      if (userData.password !== userData.repassword) {
        setPasswordError(true);
        return;
      } else {
        setPasswordError(false);
      }

      const data = {
        full_name: userData.name,
        email: userData.email,
        dob: userData.dob,
        nickname: userData.nickname,
        userRole: userData.role,
        password: userData.password,
      };

      const formData = new FormData();
      formData.append("files", userData.profile_pic);
      formData.append("isMultiple", false);
      formData.append("path", "blog/gallery");

      try {
        const response = await PostService(API_URL.Multi_file_upload, formData);

        if (response?.data) {
          data.profile_pic = response.data.data[0];
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await PostService(API_URL.ADD_USER, data);

        console.log("Response from server:", response);
        toaster("succesfully created", "success");
        getalldata();

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

  //update api call

  const updateUser = async () => {
    if (
      userData.name &&
      userData.nickname &&
      userData.dob &&
      userData.email &&
      !emailError &&
      userData.profile_pic
    ) {
      const data = {
        full_name: userData.name,
        email: userData.email,
        dob: userData.dob,
        nickname: userData.nickname,
        userRole: userData.role,
        profile_pic :userData.profile_pic
      };

      if (userData?.profile_pic?.name) {
        const formData = new FormData();
        formData.append("files", data.profile_pic);
        formData.append("isMultiple", false);
        formData.append("path", "blog/gallery");

        try {
          const response = await PostService(
            API_URL.Multi_file_upload,
            formData
          );
          data.profile_pic = response.data.data[0];
        } catch (error) {
          console.error(error);
        }
      }


      try {
         await patchService(
          API_URL.UPDATE_USER + "/" + userId,
          data
        );

        toaster("successfully updated", "success");
        getalldata();

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
    if (name === "profile_pic") {
      setUserData({ ...userData, [name]: e.target.files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const reset = () => {
    setUserData({
      name: "",
      dob: "",
      email: "",
      profile_pic: "",
      nickname: "",
      password: "",
      repassword: "",
      role: 2,
    });
    setError(false);
    setEmailError(false);
    setPasswordError(false);
    setUpdated(false);
  };

  const defaultimage = (index) => {
    const id = document.getElementById(index);
    id.src = defaultuserimage;
  };

  const defaultimages = () => {
    const id = document.getElementById("imagenot");
    id.src = defaultuserimage;
  };

  const emailValidation = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(userData.email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      return;
    }
  };

  const setrestpassword = () => {
    setPasswordError(false);
  };

  const handlePageClick = (value) => {
    setCurrentPage(value - 1);
  };

  return (
    <>
      <div className="user">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Users</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Users </li>
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
                          &nbsp; Add Users
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
                            <th className="text-center">Profile Pic</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">DOB</th>
                            <th className="text-center">email</th>
                            <th className="text-center">Created Date</th>
                            <th className="text-center">Status</th>
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
                                  <td className="text-center ">
                                    <img
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
                                  <td className="text-center ">
                                    <span
                                      title="Update"
                                      style={{ cursor: "pointer" }}
                                      className="mx-2  text-dark fas fa-pen cursor"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      onClick={() => {
                                        setUserData({
                                          name: data.full_name,
                                          dob: data?.dob?.slice(0, 10),
                                          email: data.email,
                                          profile_pic: data.profile_pic,
                                          nickname: data.nickname,
                                          password: "",
                                          repassword: "",
                                          role: data.userRole,
                                        });
                                        setUpdated(true);
                                        setUserId(data._id);
                                      }}
                                    ></span>
                                    <Link to={`/users/view/${data._id}`}>
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
                                            data: data.full_name,
                                            name: "USER",
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
        className="modal fade add-user-model "
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {updated ? (
                <h5 className="modal-title" id="exampleModalLabel">
                  Update User
                </h5>
              ) : (
                <h5 className="modal-title" id="exampleModalLabel">
                  Add User
                </h5>
              )}
              <button
                type="button"
                className="close"
                id="modelClose"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <form className="row">
                <div className="form-group col-6">
                  <label htmlFor="name" className="col-form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={userData.name}
                    placeholder="name"
                    onChange={(e) => setvalues(e)}
                  />
                  {error
                    ? !userData.name && (
                        <div className="text-danger">required</div>
                      )
                    : null}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="nickname" className="col-form-label">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    name="nickname"
                    value={userData.nickname}
                    placeholder="nick name"
                    onChange={(e) => setvalues(e)}
                  />
                  {error
                    ? !userData.nickname && (
                        <div className="text-danger">required</div>
                      )
                    : null}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="dob" className="col-form-label">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    id="dob"
                    value={userData.dob}
                    placeholder="date of birth"
                    onChange={(e) => setvalues(e)}
                  />
                  {error && !userData.dob && (
                    <div className="text-danger">required</div>
                  )}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="email" className="col-form-label">
                    Email
                  </label>
                  <input
                  autoComplete="email"
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={userData.email}
                    placeholder="email"
                    onChange={(e) => {
                      setvalues(e);
                      emailValidation();
                    }}
                  />
                  {error && !userData.email && (
                    <div className="text-danger">required</div>
                  )}
                  {error && userData.email ? (
                    emailError ? (
                      <div className="text-danger">Invalid email</div>
                    ) : null
                  ) : null}
                </div>

                {!updated && (
                  <div className="form-group col-6">
                    <label htmlFor="password" className="col-form-label">
                      Password
                    </label>
                    <input
                         autoComplete="new-password" 
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      value={userData.password}
                      placeholder="password"
                      onChange={(e) => {
                        setvalues(e);
                      }}
                      onClick={setrestpassword}
                    />
                    {error && !userData.password && (
                      <div className="text-danger">required</div>
                    )}
                    {passwordError && (
                      <div className="text-danger">password not match</div>
                    )}
                  </div>
                )}

                {!updated && (
                  <div className="form-group col-6">
                    <label htmlFor="repassword" className="col-form-label">
                      Re-password
                    </label>
                    <input
                     autoComplete="new-password" 
                      type="password"
                      className="form-control"
                      name="repassword"
                      id="repassword"
                      value={userData.repassword}
                      placeholder="Re-password"
                      onChange={(e) => {
                        setvalues(e);
                      }}
                      onClick={setrestpassword}
                    />
                    {error && !userData.repassword && (
                      <div className="text-danger">required</div>
                    )}
                    {passwordError && (
                      <div className="text-danger">password not match</div>
                    )}
                  </div>
                )}

                <div className="form-group col-6 mt-2 ">
                  <div className="text-bold mb-2 ">Image</div>
                  <label
                    htmlFor="profile_pic"
                    className="btn btn-primary col-5 d-flex justify-content-center align-items-center"
                  >
                    Select Profile Pic
                  </label>

                  <input
                    type="file"
                    id="profile_pic"
                    className="form-control d-none"
                    name="profile_pic"
                    onChange={(e) => setvalues(e)}
                  />
                  {error && !userData.profile_pic && (
                    <div className="text-danger">required</div>
                  )}

                  {
                          
                    <div   className="addModel-showimage">
                      {!updated && userData.profile_pic && (
                        <img
                          className="addModel-showimage"
                          src={URL.createObjectURL(userData.profile_pic)}
                          alt={userData.profile_pic}
                        />
                      )}

                      {updated ? (
                        userData.profile_pic && !userData.profile_pic.name ? (
                          <img
                            id="imagenot"
                            className="addModel-showimage"
                            src={userData.profile_pic}
                            onError={defaultimages}
                            alt={userData.profile_pic}
                          />
                        ) : userData.profile_pic &&
                          userData.profile_pic.name ? (
                          <img
                            className="addModel-showimage"
                            src={URL.createObjectURL(userData.profile_pic)}
                            alt={userData.profile_pic}
                          />
                        ) : null
                      ) : null}
                    </div>
                  }
                </div>

                <div className="form-group col-6 ">
                  <label htmlFor="role" className="col-form-label ">
                    User Role
                  </label>

                  <select
                    className="form-select "
                    aria-label="Default select example"
                    name="role"
                    id="role"
                    onChange={(e) => {
                      setvalues(e);
                    }}
                    value={userData?.role}
                  >
                    <option value="1" >
                      admin
                    </option>
                    <option value="2" >
                      user
                    </option>
                  </select>

                  {error && !userData.role && (
                    <div className="text-danger">required</div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer ">
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Clear</button> */}
              {updated ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateUser}
                >
                  update
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createUser}
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

export default Users;
