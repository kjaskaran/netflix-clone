import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }

      return unsubscribe;
    });
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/profile" element={<ProfileScreen />}></Route>
          <Route exact path="/" element={<HomeScreen />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
