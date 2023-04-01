import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
      showDeleteBtn: false,
      showFlushMessage: {
        state: false,
        action: null,
        context: null,
      },
      showActionsMenu: false,
      showChoiceSheet: false,
      routeData: {},
      transitData: {},
      transitFormData: {},
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
    getRouteData(state) {
      return state.routeData;
    },
    getTransitData(state) {
      return state.transitData;
    },
    getTransitFormData(state) {
      return state.transitFormData;
    },
    greyOutAction(state) {
      return state.greyOutAction;
    },
    showDeleteBtn(state) {
      return state.showDeleteBtn;
    },
    showFlushMessage(state) {
      return state.showFlushMessage;
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
    setRouteData(state, payload) {
      state.routeData = payload;
    },
    setTransitData(state, payload) {
      state.transitData = payload;
    },
    setTransitFormData(state, payload) {
      const data = { ...state.transitFormData, ...payload };
      state.transitFormData = data;
    },
    flushTransitFormData(state) {
      state.transitFormData = {};
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
    setShowFlushMessage(state, payload) {
      state.showFlushMessage = payload;
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
    setRouteData(context, payload) {
      context.commit("setRouteData", payload);
    },
    setTransitData(context, payload) {
      context.commit("setTransitData", payload);
    },
    setTransitFormData(context, payload) {
      context.commit("setTransitFormData", payload);
    },
    flushTransitFormData(context) {
      context.commit("flushTransitFormData");
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
    setShowFlushMessage(context, payload) {
      context.commit("setShowFlushMessage", payload);
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
