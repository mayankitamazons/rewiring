import React from 'react'
import { deleteService } from '../../Services/CrudServices'
import API_URL from '../../Environment/ApiRoutes.js/ApiRoutes';
import toaster from '../../Helpers/Toastify';
import { ToastContainer} from 'react-toastify';



const DeleteModel = ({ data, id, name, deleteValue, setDeleteValue }) => {
    const deleteOpertion = async (id, name) => {
        console.log(`${API_URL.common_delete_operation}/${name}/${id}`)
        try {
            const response = await deleteService(`${API_URL.common_delete_operation}/${name}/${id}`);
            toaster("successfully deleted",'success')
            console.log("Response from server:", response);
            setDeleteValue(deleteValue ? false : true)
            window.location.reload();
        } catch (error) {
            toaster(error?.data?.msg,'error')
            console.error("Error occurred:", error);
        }

    }


    return (<>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Are You really want to delete?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {data}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => deleteOpertion(id, name)}>Delete</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    </>

    )
}

export default DeleteModel