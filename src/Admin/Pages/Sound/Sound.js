import React, { useEffect, useState, useRef } from "react";
import API_URL from "../../../Environment/ApiRoutes.js/ApiRoutes";
import { PostService, patchService } from "../../../Services/CrudServices";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import DeleteModel from "../../Model/DeleteModel";
import { MultiSelect } from "react-multi-select-component";
import "./sound.css";
import defaultnoimage from "../../../Assets/Images/defaultnoimage.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import toaster from "../../../Helpers/Toastify";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../Helpers/Pagination";




const Sound = () => {
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
  const [soundData, setSoundData] = useState({
    title: "",
    artist: "",
    album: "",
    duration: 0,
    problems: [],
    cover_img: "",
    icon: "",
    audio_file: "",
    status: 1,
  });

  const [showIds, setShowIds] = useState([]);

  const [createError, setCreateError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: "",
    data: "",
    name: "SOUND",
  });
  const [deleteValue, setDeleteValue] = useState(true);

  useEffect(() => {
    getalldata();
    getproblem_id();
  }, [deleteValue,currentPage]);

  const setvalues = (e) => {
    const { name, value } = e.target;
    if (name === "cover_img" || name === "icon" || name === "audio_file") {
      setSoundData({
        ...soundData,
        [name]: e.target.files[0],
      });
    } else {
      setSoundData({ ...soundData, [name]: value });    
    }
  };

  useEffect(() => {
    const value = selected?.map((value) => {
      return value.value;
    });
    
    setSoundData((s) => ({ ...s, problems: value })); 
  }, [selected]);

  //get api call

  const getalldata = async () => {

    try {
      setLoading(true);
      const status=1
      const res = await PostService(
        `${API_URL.COMMON_DOCUMENT_COUNT + "SOUND/doc_count"}`,{status}
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
    
        `${API_URL.Sound_Listing}?page=${currentPage}&limit=${limit}`
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

  const createSound = async () => {
    if (
      soundData.title &&
      soundData.artist &&
      soundData.album &&
      soundData.cover_img.name &&
      soundData.icon.name &&
      soundData.audio_file.name
    ) {
      const formData = new FormData();
      formData.append("files", soundData.cover_img);
      formData.append("files", soundData.icon);
      formData.append("files", soundData.audio_file);
      formData.append("isMultiple", true);
      formData.append("path", "blog/gallery");

      try {
        const response = await PostService(API_URL.Multi_file_upload, formData);

        if (response?.data) {
          const data = {
            title: soundData.title,
            cover_img: response?.data?.data[0],
            icon: response?.data.data[1],
            audio_file: response?.data?.data[2],
            artist: soundData.artist,
            album: soundData.album,
            duration: soundData.duration,
            problems: soundData.problems,
            status: soundData.status,
          };

          if (soundData.problems.length === 0) {
            delete data.problems;
          }

          const responses = await PostService(API_URL.Add_Sound, data);

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
    setSoundData({
      title: "",
      artist: "",
      album: "",
      duration: 0,
      problems: [],
      cover_img: "",
      icon: "",
      audio_file: "",
      status: 1,
    });

    setIsUpdate(false);

    setCreateError(false);
    setSelected([]);
  };

  const errorfunction = () => {
    ref1.current.src = defaultnoimage;
  };

  const errorfunction1 = () => {
    ref2.current.src = defaultnoimage;
  };

  //api update

  const updateSound = async () => {
    if (
      soundData.title &&
      soundData.artist &&
      soundData.album &&
      (soundData?.cover_img || soundData?.cover_img?.name) &&
      (soundData?.icon || soundData?.icon?.name) &&
      (soundData?.audio_file || soundData?.audio_file?.name)
    ) {
      let obj = {};
      for (let key in contain) {
        if (contain[key] !== soundData[key]) {
          obj[key] = soundData[key];
        }
      }

      if (obj?.audio_file?.name || obj?.cover_img?.name || obj?.icon?.name) {
        if (obj?.audio_file?.name) {
          const formData = new FormData();
          formData.append("files", obj.audio_file);
          formData.append("isMultiple", false);
          formData.append("path", "blog/gallery");

          try {
            const response = await PostService(
              API_URL.Multi_file_upload,
              formData
            );
            obj.audio_file = response.data.data[0];
          } catch (error) {
            console.error(error);
          }
        }

        if (obj?.cover_img?.name) {
          const formData = new FormData();
          formData.append("files", obj.cover_img);
          formData.append("isMultiple", false);
          formData.append("path", "blog/gallery");
          try {
            const response = await PostService(
              API_URL.Multi_file_upload,
              formData
            );
            obj.cover_img = response.data.data[0];
          } catch (error) {
            console.error(error);
          }
        }

        if (obj?.icon?.name) {
          const formData = new FormData();
          formData.append("files", obj.icon);
          formData.append("isMultiple", false);
          formData.append("path", "blog/gallery");
          try {
            const response = await PostService(
              API_URL.Multi_file_upload,
              formData
            );
            obj.icon = response.data.data[0];
          } catch (error) {
            console.error(error);
          }
        }
      }


      try {
        if (obj?.problems?.length === 0) {
          delete obj.problems;
        }

        const response = await patchService(
          API_URL.Sound_UPDATE_BY_ID + id,
          obj
        );

        console.log("Response from server:", response);
        toaster('sucessfully updated', "success");
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

  const updatefunction = (data) => {
    setIsUpdate(true);
    setCreateError(false);
    setId(data._id);

    const { problems } = data;

    const problem = problems.map((value) => {
      return { label: value.title, value: value._id };
    });

    setSelected(problem);

    const problematic = problems.map((value) => {
      return value._id;
    });

    setSoundData({ ...data, problems: problematic });
    setContain({ ...data, problems: problematic });
    setIsCreated(false);
  };

  const handlePageClick = (value) => {
    setCurrentPage(value - 1);
  };

  return (
    <>{console.log(soundData)}
      <div>
        <div className="content-header sound-component">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Sounds</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Sounds</li>
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
                          &nbsp; Add Sounds
                        </button>
                      </div>
                    </div>
                    <div className="card-body table-responsive "  >
                    
                      <table className="table table-hover text-nowrap table-bordered " >
                        <thead  >
                          <tr  >
                            <th
                              className="text-center"
                              style={{ width: "15%" }}
                            >
                              S.No
                            </th>

                            <th className="text-center" >Title</th>
                            {/* <th className="text-center" >Audio</th> */}
                            <th className="text-center" >Artist</th>
                            <th className="text-center" >Album</th>
                            <th className="text-center" >Duration/sec</th>
                            <th className="text-center" >Action</th>
                          </tr>
                        </thead>
                        {!loading && ( 
                          <tbody   >
                         
                            {datas.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-center">
                                  {currentPage * limit + index + 1}
                                  </td>
                                  <td className="text-center">{data.title}</td>
                                  {/* <td className="text-center">
                                    {data.audio_file}
                                  </td> */}
                                  <td className="text-center">{data.artist}</td>
                                  <td className="text-center">{data.album}</td>
                                  <td className="text-center">
                                    {data?.duration}
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
                                    <Link to={`/sound/view/${data._id}`}>
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
                                            name: "SOUND",
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
                <div className="form-group col-6">
                  <label htmlFor="title" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={soundData.title}
                    placeholder="title"
                    onChange={(e) => setvalues(e)}
                  />
                  {!soundData.title && createError && (
                    <div className="text-danger">Required </div>
                  )}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="artist" className="col-form-label">
                    Artist
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="artist"
                    name="artist"
                    value={soundData.artist}
                    placeholder="artist"
                    onChange={(e) => setvalues(e)}
                  />
                  {!soundData.artist && createError && (
                    <div className="text-danger">Required </div>
                  )}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="album" className="col-form-label">
                    Album
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="album"
                    name="album"
                    value={soundData.album}
                    placeholder="album"
                    onChange={(e) => setvalues(e)}
                  />
                  {!soundData.album && createError && (
                    <div className="text-danger">Required </div>
                  )}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="duration" className="col-form-label">
                    Duration/second
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={soundData.duration}
                    placeholder="duration"
                    onChange={(e) => setvalues(e)}
                  />
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
                    value={soundData.status}
                  >
                    <option value="1" >
                      Active
                    </option>
                    <option value="0" >
                      Deactive
                    </option>
                  </select>
                </div>

                <div className="col-6">
                  <p className=" font-weight-bold mb-2">Sound</p>

                  <label
                    htmlFor="audio_file"
                    style={{ borderRadius: 4, minHeight: 40 }}
                    className=" col-4 mb-0 btn btn-primary"
                  >
                    Select Sound
                  </label>

                  <input
                    style={{ display: "none" }}
                    type="file"
                    className="form-control"
                    id="audio_file"
                    accept="audio/*"
                    name="audio_file"
                    placeholder="sound"
                    onChange={setvalues}
                    onClick={() => {
                      setSoundData({
                        ...soundData,
                        audio_file: undefined,
                      });
                    }}
                  />
                  {!soundData.audio_file && createError && (
                    <p className="text-danger pl-2 mb-0">required</p>
                  )}
                </div>

                <div className="col-6  pt-4">
                  {isUpdate && (
                    <div>
                      {soundData?.audio_file &&
                        !soundData?.audio_file?.name && (
                          <AudioPlayer
                            className="col-12 "
                            style={{ borderRadius: "1rem" }}
                            src={soundData?.audio_file}
                            showSkipControls={true}
                            showJumpControls={false}
                            autoPlay={false}
                            autoPlayAfterSrcChange={false}
                          />
                        )}
                      {soundData?.audio_file?.name && (
                        <AudioPlayer
                            className="col-12 "
                            style={{ borderRadius: "1rem" }}
                            src={URL.createObjectURL(soundData?.audio_file)}
                            showSkipControls={true}
                            showJumpControls={false}
                            autoPlay={false}
                            autoPlayAfterSrcChange={false}
                          />
                     
                      )}
                      {!soundData?.audio_file && (
                        <AudioPlayer
                            className="col-12 "
                            style={{ borderRadius: "1rem" }}
                          />
                      )}
                    </div>
                  )}

                  {isCreated && (
                    <div>
                      {soundData?.audio_file && (
                        <audio controls className="col-12">
                          <source
                            src={URL.createObjectURL(soundData?.audio_file)}
                          />
                          Your browser does not support the audio element.{" "}
                        </audio>
                      )}
                      {!soundData?.audio_file && (
                        <audio controls className="col-12" />
                      )}
                    </div>
                  )}
                </div>

                <div className="col-6 mt-3" style={{height:126}}>
                  <p className="font-weight-bold " style={{ marginBottom: 6 }}>
                    Cover Image
                  </p>

                  <label
                    htmlFor="cover_img"
                    className=" col-6 d- mb-0 btn btn-primary"
                    style={{ borderRadius: 4, minHeight: 40 }}
                  >
                    Select Cover Image
                  </label>

                  <input
                    style={{ display: "none" }}
                    type="file"
                    className="form-control text-break"
                    id="cover_img"
                    name="cover_img"
                    placeholder="cover_img"
                    onChange={setvalues}
                  />
                  {!soundData.cover_img && createError && (
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
                    {!soundData.icon && createError && (
                      <p className="text-danger pl-2 mb-0">required</p>
                    )}
                  </div>

                  <div className="col-6 mt-4">
                    {isUpdate && (
                      <div className="d-flex justify-content-center alien-content-center">
                        {soundData?.icon && !soundData?.icon?.name && (
                          <img
                            className="border border-secondary "
                            ref={ref1}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 50,
                            }}
                            src={soundData.icon}
                            alt={soundData?.icon}
                            onError={errorfunction}
                          />
                        )}

                        {soundData?.icon && soundData?.icon?.name && (
                          <img
                            className="border border-secondary "
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 50,
                            }}
                            src={URL.createObjectURL(soundData.icon)}
                            alt={soundData.icon}
                          />
                        )}
                      </div>
                    )}

                    {isCreated && (
                      <div
                        className="d-flex justify-content-center alien-content-center"
                        style={{ minWidth: "auto" }}
                      >
                        {soundData.icon && (
                          <img
                            className="border border-secondary"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 50,
                            }}
                            src={URL.createObjectURL(soundData.icon)}
                            alt={soundData.icon}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6 "  >
                  {isUpdate && (
                    <div style={{ minWidth: "auto" }}>
                      {soundData?.cover_img && !soundData?.cover_img?.name && (
                        <img
                          className="border border-secondary "
                          ref={ref2}
                          style={{ width: 200, height: 200, borderRadius: 10 }}
                          onError={errorfunction1}
                          src={soundData?.cover_img}
                          alt={soundData.cover_img}
                        />
                      )}

                      {soundData?.cover_img && soundData?.cover_img?.name && (
                        <img
                          className="border border-secondary "
                          style={{ width: 200, height: 200, borderRadius: 10 }}
                          src={URL.createObjectURL(soundData.cover_img)}
                          alt={soundData?.cover_img}
                        />
                      )}
                    </div>
                  )}

                  {isCreated && (
                    <div style={{ minWidth: "auto" }}>
                      {soundData.cover_img && (
                        <img
                          className="border border-secondary"
                          style={{ width: 200, height: 200, borderRadius: 10 }}
                          src={URL.createObjectURL(soundData?.cover_img)}
                          alt={soundData.cover_img}
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
                  onClick={createSound}
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

export default Sound;
