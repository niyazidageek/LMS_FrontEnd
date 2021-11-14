import { getStudentHome } from "../services/studentHomeService";
import { actionTypes } from "./const";

export const getStudentHomeAction = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getStudentHome(token, id);

    let payload = {
      data: resp.data,
      count: resp.header["Count"],
    };
    console.log(resp.header);
    dispatch({
      type: actionTypes.GET_STUDENT_HOME_CONTENT,
      payload: payload,
    });

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error.response.data,
      });
    }
    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  }
};
