
export const firebaseConfig = {
  apiKey: "AIzaSyAU_Or5QzwZcJEfwUIr2Db2d3O1bVpMvl0",
  authDomain: "project3-pokequizr-server.firebaseapp.com",
  projectId: "project3-pokequizr-server",
  storageBucket: "project3-pokequizr-server.appspot.com",
  messagingSenderId: "144894638234",
  appId: "1:144894638234:web:e4732234bc632398074723"
};

export const isAuth = () => {
  return localStorage.getItem('token') ? true : false
}
