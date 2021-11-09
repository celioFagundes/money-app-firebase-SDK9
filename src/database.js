import { useState, useEffect, useContext } from "react";
import firebase from "./firebase";
import { AuthContext } from "./auth";

import {
  getDatabase,
  ref,
  onValue,
  off,
  push,
  set,
  child,
  remove,
  update,
} from "firebase/database";

export const useDatabase = (endpoint) => {
  const [data, setData] = useState();
  
  const auth = useContext(AuthContext)
  useEffect(() => {
    const database = getDatabase();
    if(auth.user){
    const userUID = auth.user.uid
    const dbref = ref(database, userUID + endpoint);
    onValue(dbref, (snapshot) => {
      setData(snapshot.val());
    })}
  }, [endpoint,auth]);

  return data;
};
export const useDatabasePush = (endpoint) => {
  const [status, setStatus] = useState("");
  const database = getDatabase();
  const auth = useContext(AuthContext)

  const save = (mes, data) => {
    const userUID = auth.user.uid
    const mesesRef = ref(database, userUID + endpoint);
    const novoMesRef = ref(database, userUID + endpoint  + mes);
    const listaMeses = [];
    onValue(mesesRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        listaMeses.push(childSnapshot.key);
      });
    });

    if (!listaMeses.includes(mes)) {
      set(novoMesRef, data);
      setStatus("Mes adicionado");
    } else {
      setStatus("Mes ja existe");
    }
  };

  return [status, save];
};
export const useMovimentacoesPush = (endpoint) => {
  const [status, setStatus] = useState("");
  const database = getDatabase();
  const auth = useContext(AuthContext)
  

  const save = (data) => {
    const userUID = auth.user.uid
    const movRef = ref(database, userUID + endpoint);
    const novaMovRef = push(movRef);
    set(novaMovRef, data);
  };

  return [status, save];
};
export const useDatabaseRemove = (endpoint) => {
  const [status, setStatus] = useState("");
  const database = getDatabase();
  const auth = useContext(AuthContext)
  

  const removeItem = (id) => {
    const userUID = auth.user.uid
    const postListRef = ref(database, userUID + endpoint + "/" + id);
    console.log(postListRef);
    const removeRef = remove(postListRef);
    console.log(removeRef);
  };

  return [status, removeItem];
};

export const useUpdateMes = (endpoint) => {
  const [status, setStatus] = useState("");
  const database = getDatabase();
  const auth = useContext(AuthContext)

  const updateMes = (mes, data) => {
    if(auth.user){
    const userUID = auth.user.uid
    const novoMesRef = ref(database, userUID + endpoint + mes);
    update(novoMesRef, data);
    setStatus("Mes atualizado")}
  };

  return [status, updateMes];
};
