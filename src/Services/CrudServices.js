import axios from "axios";

/*===============================================================
            Common get API
==================================================================*/



// export const GetService = async (urlString, params = {}) => {

//     if (urlString.includes("undefined")) {
//         return;
//     }

//     const Token = localStorage.getItem("token");

//     const AxiosConfig = {
//         headers: {
//             Accept: "application/json",
//             Authorization: Token,
//         },
//         ...params,
//     };
//     const response = await axios.get(urlString, AxiosConfig).catch((err) => {
//         return err.response;
//     });
//     if (response?.status === 401) {
//         localStorage.removeItem("token");
//         history.push("/login");
//         window.location.reload();
//     }

//     return response;
// };

export const GetService = async (urlString, params = {}) => {
    try {
        if (urlString.includes("undefined")) {
            return;
        }

        const Token = localStorage.getItem("token");

        const AxiosConfig = {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${Token}`,
            },
            ...params,
        };

        const response = await axios.get(urlString, AxiosConfig);

        if (response.status === 401) {
            localStorage.removeItem("token");
            // history.push("/login");
            // window.location.reload();
            window.location.pathname = "/login";

        }

        return response;
    } catch (error) {
        throw error
    }
};

/*===============================================================
            Common Post API for JSON post
==================================================================*/

// export const PostService = async (urlString, data) => {

//     const Token = localStorage.getItem("token");

//     let AxiosConfig = {
//         headers: {
//             content: "application/json",
//             Authorization: Token,
//         },
//     };
//     const response = await axios
//         .post(urlString, data, AxiosConfig)
//         .catch((err) => {
//             console.log(err);

//             return err.response;
//         });

//     if (response?.status === 401) {

//         localStorage.removeItem("token");
//         history.push("/login");
//         window.location.reload();
//     }
//     return response;
// };

export const PostService = async (urlString, data) => {
    try {
        if (urlString.includes("undefined")) {
            return;
        }

        const Token = localStorage.getItem("token");

        const AxiosConfig = {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${Token}`,
            },

        };

        const response = await axios.post(urlString, data, AxiosConfig);

        if (response.status === 401) {
            localStorage.removeItem("token");
            // history.push("/login");
            // window.location.reload();
            window.location.pathname = "/login";
        }

        return response;
    } catch (error) {
        throw error
    }
};

/*===============================================================
            Common Post API for FormData post
==================================================================*/

// export const postFormData = async (urlString, data) => {


//     let AxiosConfig = {
//         headers: {
//             mimeType: "multipart/form-data",
//             Authorization: Token,
//         },
//     };
//     const response = await axios
//         .post(urlString, data, AxiosConfig)
//         .catch((err) => {

//             return err;
//         });
//     if (response?.response?.status === 401) {

//         localStorage.removeItem("token");
//         history.push("/login");
//         window.location.reload();
//     }
//     return response;
// };

export const postFormData = async (urlString, data) => {
    try {
        if (urlString.includes("undefined")) {
            return;
        }

        const Token = localStorage.getItem("token");

        const AxiosConfig = {
            headers: {
                Accept: "application/json",
                Authorization: Token,
            },

        };

        const response = await axios.post(urlString, data, AxiosConfig);

        if (response.status === 401) {
            localStorage.removeItem("token");
            // history.push("/login");
            // window.location.reload();
            window.location.pathname = "/login";
        }

        return response;
    } catch (error) {
        throw error
    }
};

/*===============================================================
            Common Patch API for JSON update
==================================================================*/

// export const patchService = async (urlString, data) => {

//     const Token = localStorage.getItem("token");

//     let AxiosConfig = {
//         headers: {
//             content: "application/json",
//             Authorization: Token,
//         },
//     };

//     const response = await axios
//         .patch(urlString, data, AxiosConfig)
//         .catch((err) => {
//             console.log(err);
//             return err.response;
//         });

//     if (response?.status === 401) {
//         localStorage.removeItem("token");
//         history.push("/login");
//         window.location.reload();
//     }

//     return response;
// };

export const patchService = async (urlString, data) => {
    try {
        if (urlString.includes("undefined")) {
            return;
        }

        const Token = localStorage.getItem("token");
        console.log(Token)
        const AxiosConfig = {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${Token}`,
            },

        };
        const response = await axios.put(urlString, data, AxiosConfig);

        if (response.status === 401) {
            localStorage.removeItem("token");
            // history.push("/login");
            // window.location.reload();
            window.location.pathname = "/login";
        }

        return response;
    } catch (error) {
        throw error
    }
};

/*===============================================================
            Common Patch API for FormData update
==================================================================*/

// export const patchFormData = async (urlString, data) => {

//     const Token = localStorage.getItem("token");

//     let AxiosConfig = {
//         headers: {
//             mimeType: "multipart/form-data",
//             Authorization: Token,
//         },
//     };

//     const response = await axios
//         .patch(urlString, data, AxiosConfig)
//         .catch((err) => {
//             return err;
//         });

//     if (response?.response?.status === 401) {
//         localStorage.removeItem("token");
//         history.push("/login");
//         window.location.reload();
//     }

//     return response;
// };

export const patchFormData = async (urlString, data) => {
    try {
        if (urlString.includes("undefined")) {
            return;
        }

        const Token = localStorage.getItem("token");

        const AxiosConfig = {
            headers: {
                // content: "multipart/form-data",
                Authorization: Token,
            },

        };

        const response = await axios.put(urlString, data, AxiosConfig);
        console.log(response)
        if (response.status === 401) {
            localStorage.removeItem("token");
            // history.push("/login");
            // window.location.reload();
            window.location.pathname = "/login";
            window.location.reload();
        }

        return response;
    } catch (error) {
        throw error
    }
};

/*===============================================================
            Common Delete API
==================================================================*/



// export const deleteService = async (urlString) => {


//     const AxiosConfig = {
//         headers: {
//             Accept: "application/json",
//             Authorization: Token,
//         },
//     };

//     const response = await axios.delete(urlString, AxiosConfig).catch((err) => {

//         return err;
//     });
//     if (response?.response?.status === 401) {

//     }
//     return response;
// };

export const deleteService = async (urlString) => {
    try {
        if (urlString.includes("undefined")) {
            return;
        }

        const Token = localStorage.getItem("token");
        const AxiosConfig = {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${Token}`,
            },

        };
        const response = await axios.delete(urlString, AxiosConfig);

        if (response.status === 401) {
            localStorage.removeItem("token");
            // history.push("/login");
            // window.location.reload();
            window.location.pathname = "/login";
        }

        return response;
    } catch (error) {
        throw error
    }
};



// export const patchFormData = async (urlString, data) => {
//     try {
//         const Token = localStorage.getItem("token");

//         let AxiosConfig = {
//             headers: {
//                 'Content-Type': "application/json",
//                 Authorization: Token,
//             },
//         };

//         const response = await axios.patch(urlString, data, AxiosConfig);

//         if (response.status === 401) {
//             localStorage.removeItem("token");
//             //   history.push("/login");
//             //   window.location.reload();
//             window.location.pathname = "/login"
//         }

//         return response;
//     } catch (error) {
//         throw error
//     }
// };



// const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {

//         const response = await patchFormData("/your-api-endpoint", formData);


//         console.log("Response from server:", response);



//     } catch (error) {

//         console.error("Error occurred:", error);
//     }
// };



