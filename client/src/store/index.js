import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
      showDeleteBtn: false,
      showActionsMenu: false,
      showChoiceSheet: false,
      transitData: {},
      rows: 8,
      greyOutAction: false,
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getRowsPerPage(state) {
      return state.rows;
    },
    getTransitData(state) {
      return state.transitData;
    },
    greyOutAction(state) {
      return state.greyOutAction;
    },
    showDeleteBtn(state) {
      return state.showDeleteBtn;
    },
    showActionsMenu(state) {
      return state.showActionsMenu;
    },
    showChoiceSheet(state) {
      return state.showChoiceSheet;
    },
  },
  mutations: {
    login(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
    },
    addEmail(state, payload) {
      state.signup = payload;
    },
    setTransitData(state, payload) {
      state.transitData = payload;
    },
    setGreyOutAction(state, payload) {
      state.greyOutAction = payload;
    },
    setRowsPerPage(state, payload) {
      if (payload === "increase") {
        state.rows = state.rows + 1;
      } else {
        state.rows = state.rows - 1;
      }
    },
    setShowDeleteBtn(state, payload) {
      state.showDeleteBtn = payload;
    },

    setShowActionsMenu(state, payload) {
      state.showActionsMenu = payload;
    },

    setShowChoiceSheet(state, payload) {
      state.showChoiceSheet = payload;
    },

    closeActionsMenu(state, payload) {
      state.showActionsMenu = payload;
    },
  },
  actions: {
    login(context, payload) {
      context.commit("login", payload);
    },
    logout(context) {
      context.commit("logout");
    },
    addEmail(context, payload) {
      context.commit("addEmail", payload);
    },
    setTransitData(context, payload) {
      context.commit("setTransitData", payload);
    },
    setGreyOutAction(context, payload) {
      context.commit("setGreyOutAction", payload);
    },

    setRowsPerPage(context, payload) {
      context.commit("setRowsPerPage", payload);
    },

    setShowDeleteBtn(context, payload) {
      context.commit("setShowDeleteBtn", payload);
    },

    setShowChoiceSheet(context, payload) {
      context.commit("setShowChoiceSheet", payload);
    },

    closeActionsMenu(context, payload) {
      context.commit("closeActionsMenu", payload);
    },
  },
});

export default store;
