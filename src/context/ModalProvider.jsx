/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from "react";
import Modal from "../components/common/Modal";

const ModalContext = createContext();
const MODAL_ACTIONS = {
  SHOW: 0,
  CLOSE: 1,
}
const initialState = {
  content: null,
  visible: false,
  title: null
}

function reducer(state, action) {
  switch (action.type) {
    case MODAL_ACTIONS.SHOW:
      return {
        ...state,
        content: action.payload.content,
        title: action.payload.title,
        visible: true,
      };
    case MODAL_ACTIONS.CLOSE:
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error(`Estas intentando usar una opcion invalida: ${action.type}`);
  }
}

export function ModalProvider({ children }) {
  const [modalState, dispatch] = useReducer(reducer, initialState);

  function showModal(content, title) {
    dispatch({
      type: MODAL_ACTIONS.SHOW,
      payload: { content: content, title: title }
    });
  }

  function closeModal() {
    dispatch({
      type: MODAL_ACTIONS.CLOSE
    })
  }

  return (
    <ModalContext.Provider value={ { showModal, closeModal, modalState } }>
      { modalState.visible && (
        <Modal
          onClick={ closeModal }
          title={ modalState.title }
          content={ modalState.content }
        />
      ) }
      { children }
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Esta usando ModalContext fuera de ModalProvider");
  }

  return context;
}
