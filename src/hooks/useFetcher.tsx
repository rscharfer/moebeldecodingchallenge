import { useReducer, useEffect } from "react";
import axios from "axios";



export function useFetcher(INIT_DATA: any, endpoint: string, cleanUpData: any) {
  const [state, dispatch] = useReducer(
    (
      state: { status: string; data: any; error: any },
      action: { type: string; data?: any; error?: any }
    ) => {
      switch (action.type) {
        case "started":
          return { ...state, status: "pending" };
        case "success":
          return { ...state, status: "resolved", data: action.data };
        case "error":
          return { ...state, status: "rejected", error: action.error };
        default:
          throw new Error("unhandled action type in reducer");
      }
    },
    {
      status: "idle",
      data: INIT_DATA,
      error: null,
    }
  );

  useEffect(() => {
    dispatch({ type: "started" });
    axios.get(endpoint).then(
      ({ data }) => dispatch({ type: "success", data: cleanUpData(data) }),
      (error) => {
        console.log("here is the error", error);
      }
    );
  }, [cleanUpData, endpoint]);

  return state;
}

