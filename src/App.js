import React, { useReducer } from "react";
import { login } from "./Promise";

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case "login": {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    }
    case "success": {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: "Incorrect username or password!",
        isLoading: false,
        username: "",
        password: "",
      };
    }
    case "logout": {
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: "",
      };
    }
    default:
      break;
  }
  return state;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onsubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch {
      dispatch({ type: "error" });
    }
  };

  return (
    <div className="form">
      <div className="form__container">
        {isLoggedIn ? (
          <>
            <h1>welcome {username}!</h1>
            <button onClick={() => dispatch({ type: "logout" })}>
              Log out
            </button>
          </>
        ) : (
          <form onSubmit={onsubmit}>
            {error && <p>{error}</p>}
            <h1>Log in Form</h1>
            <input
              type="text"
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "username",
                  value: e.target.value,
                })
              }
              placeholder="Username..."
              style={{
                width: "400px",
                height: "50px",
                padding: "5px",
                border: "1px solid rgb(216, 214, 214)",
                borderRadius: "10px",
                outline: "none",
                fontSize: "1.3rem",
                marginTop: "5px",
              }}
            />
            <input
              type="password"
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.target.value,
                })
              }
              placeholder="Password..."
              style={{
                width: "400px",
                height: "50px",
                padding: "5px",
                border: "1px solid rgb(216, 214, 214)",
                borderRadius: "10px",
                outline: "none",
                fontSize: "1.3rem",
                marginTop: "5px",
              }}
            />
            <button
              type="submit"
              style={{
                width: "400px",
                height: "50px",
                border: "1px solid rgb(216, 214, 214)",
                borderRadius: "10px",
                outline: "none",
                marginTop: "5px",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Log in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
