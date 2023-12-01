import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom";
import { GetService, PostService, patchService } from "../../../../Services/CrudServices";
import API_URL from "../../../../Environment/ApiRoutes.js/ApiRoutes";
import defaultuserimage from "../../../../Assets/Images/defaultuserimage.png";

import "./Profilesetting.css";
import { FadeLoader } from "react-spinners";
import toaster from "../../../../Helpers/Toastify";

const Profile = () => {
    const addModelImage = useRef();
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    nickname: "",
    profile_pic: "",
    dob: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async () => {
    try {
      setLoading(true);
      const id = localStorage.getItem("_id");
      const res = await GetService(API_URL.GET_USER_BY_ID + "/" + id);
      setData({
        full_name: res.data.data.full_name,
        nickname: res.data.data.nickname,
        dob: res.data.data.dob,
        profile_pic: res.data.data.profile_pic,
        email: res.data.data.email,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error occurred:", error);
    }
  };

  const emailValidation = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(data.email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      return;
    }
  };

  const setvalues = (e) => {
    const { name, value } = e.target;
    if (name === "profile_pic") {
      setData({ ...data, [name]: e.target.files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const defaultimages = () => {
    const id = document.getElementById("imagenot");
    id.src = defaultuserimage;
  };

  const updateUser = async (e) => {
    e.preventDefault()
    console.log(data,error,emailError)
    if (
      data.full_name &&
      data.nickname &&
      data.dob &&
      data.email &&
      !emailError &&
      data.profile_pic
    ) {
        console.log("000")
      const sendData = {
        full_name: data?.full_name,
        email: data?.email,
        dob: data?.dob,
        nickname: data?.nickname,
        profile_pic : data?.profile_pic
      };

      if (data?.profile_pic?.name) {
        const formData = new FormData();
        formData.append("files", data.profile_pic);
        formData.append("isMultiple", false);
        formData.append("path", "blog/gallery");

        try {
          const response = await PostService(
            API_URL.Multi_file_upload,
            formData
          );
          sendData.profile_pic = response?.data?.data[0];

          

        } catch (error) {
          console.error(error);
        }
      }
      try {
        const id = localStorage.getItem("_id");
         await patchService(
          API_URL.UPDATE_USER + "/" + id,
          sendData
        );

        toaster("successfully updated", "success");
        getalldata();

      
      } catch (error) {
        toaster(error?.data?.msg, "error");
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      {console.log(data,error,emailError)}
      <div className="ng-star-inserted profile_setting">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div
                className="col-sm-6"
                style={{ marginBottom: "-8px", boxSizing: "borderBox" }}
              >
                <h1 className="default_color d-flex align-items-center ml-2">
                  <span>Profile setting</span>
                </h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard" href="/panel/dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li className="breadcrumb-item active">Profile setting</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content d-flex justify-content-center ">
          <div className="container p-2 ">
            <div className="card p-3 ">
              <div className="card-body">
                {!loading && (
                  <div>
                    <form className="row">
                      <div className="form-group col-6">
                        <label htmlFor="full_name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="full_name"
                          name="full_name"
                          value={data.full_name}
                          placeholder="name"
                          onChange={(e) => setvalues(e)}
                        />
                        {error
                    ? !data.full_name && (
                        <div className="text-danger">required</div>
                      )
                    : null}
                      </div>

                      <div className="form-group col-6">
                        <label htmlFor="nickname">Nick Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nickname"
                          name="nickname"
                          value={data.nickname}
                          placeholder="nick name"
                          onChange={(e) => setvalues(e)}
                        />
                        {error
                    ? !data.nickname && (
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
                          value={data?.dob?.slice(0, 10)}
                          placeholder="date of birth"
                          onChange={(e) => setvalues(e)}
                        />
                        {error && !data.dob && (
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
                          value={data.email}
                          placeholder="email"
                          onChange={(e) => {
                            setvalues(e);
                            emailValidation();
                          }}
                        />
                        {error && !data.email && (
                    <div className="text-danger">required</div>
                  )}
                        {error && data.email ? (
                    emailError ? (
                      <div className="text-danger">Invalid email</div>
                    ) : null
                  ) : null}
                      </div>

                      <div className="form-group col-6 mt-2 ">
                        <div className="text-bold mb-2 ">Image</div>
                        <label
                          htmlFor="profile_pic"
                          className="btn btn-primary col-5 d-flex justify-content-center align-items-center"
                        >
                          Select Profile Pic
                        </label>

                        <input
                          ref={addModelImage}
                          type="file"
                          id="profile_pic"
                          className="form-control d-none"
                          name="profile_pic"
                          onChange={(e) => setvalues(e)}
                        />
                        {error && !data.profile_pic && (
                    <div className="text-danger">required</div>
                  )}

                        <div
                          className="profilesetting-image mt-4"
                          style={{ marginLeft: 30 }}
                        >
                          {data?.profile_pic && !data.profile_pic.name ? (
                            <img
                              style={{ border: "1px solid rgb(185, 182, 182" }}
                              id="imagenot"
                              className="profilesetting-image"
                              src={data.profile_pic}
                              onError={defaultimages}
                              alt={data.profile_pic}
                            />
                          ) : data?.profile_pic && data?.profile_pic.name ? (
                            <img
                              style={{ border: "1px solid rgb(146, 142, 142)" }}
                              className="profilesetting-image"
                              src={URL.createObjectURL(data.profile_pic)}
                              alt={data.profile_pic}
                            />
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <button
                    
                          className="btn btn-primary"
                          onClick={(e)=>updateUser(e)}
                          style={{ float: "right" }}
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FadeLoader speedMultiplier={2} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
