import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
      switchHeaderBtn: {
        showAddBtn: true,
        showDeleteBtn: false,
        showEditBtn: false,
      },
      flusMessageContext: null,
      showFlushMessage: {
        state: false,
        action: null,
        context: null,
      },
      showActionsMenu: false,
      showChoiceSheet: false,
      dashboardData: {},
      baseApiRoute: null,
      routeData: {
        data: [],
        backUpData: [],
        paginatedData: [],
      },
      dbData: {},
      transitData: {},
      transitFormData: {},
      rows: 7,
      pageNumbers: [],
      currentPage: 1,
      greyOutAction: {
        specs: false,
        update: false,
      },
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getRowsPerPage(state) {
      return state.rows;
    },
    getPageNumbers(state) {
      return state.pageNumbers;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getDashboardData(state) {
      return state.dashboardData;
    },
    getBaseApiRoute(state) {
      return state.baseApiRoute;
    },
    getRouteData(state) {
      return state.routeData.data;
    },
    getRouteBackUpData(state) {
      return state.routeData.backUpData;
    },
    getPaginatedData(state) {
      return state.routeData.paginatedData;
    },
    getDbData(state) {
      return state.dbData;
    },
    getTransitData(state) {
      return state.transitData;
    },
    getTransitFormData(state) {
      return state.transitFormData;
    },
    getRouteData(state) {
      return state.routeData.data;
    },
    getFlushMessageContext(state) {
      return state.flushMessageContext;
    },
    greyOutAction(state) {
      return state.greyOutAction;
    },
    switchHeaderBtn(state) {
      return state.switchHeaderBtn;
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
    setDashboardData(state, payload) {
      state.dashboardData = payload;
    },
    setBaseApiRoute(state, payload) {
      state.baseApiRoute = payload;
    },
    setRouteData(state, payload) {
      state.routeData.data = payload;
    },
    setRouteBackUpData(state, payload) {
      state.routeData.backUpData = payload;
    },
    setPaginatedData(state, payload) {
      state.routeData.paginatedData = payload;
    },
    setDbData(state, payload) {
      state.dbData = payload;
    },
    flushRouteData(state) {
      state.routeData = {
        data: [],
        paginatedData: [],
      };
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
      state.greyOutAction = { ...state, payload };
    },
    setRowsPerPage(state, payload) {
      if (payload === "increase") {
        state.rows = state.rows + 1;
      } else {
        state.rows = state.rows - 1;
      }
    },
    setPageNumbers(state, payload) {
      state.pageNumbers = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    switchHeaderBtn(state, payload) {
      state.switchHeaderBtn = { ...state.switchHeaderBtn, payload };
    },
    setFlushMessageContext(state, payload) {
      state.flushMessageContext = payload;
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
    setDashboardData(context, payload) {
      context.commit("setDashboardData", payload);
    },
    setBaseApiRoute(context, payload) {
      context.commit("setBaseApiRoute", payload);
    },
    setRouteData(context, payload) {
      context.commit("setRouteData", payload);
    },
    setRouteBackUpData(context, payload) {
      context.commit("setRouteBackUpData", payload);
    },
    setPaginatedData(context, payload) {
      context.commit("setPaginatedData", payload);
    },
    setDbData(context, payload) {
      context.commit("setDbData", payload);
    },
    flushRouteData(context) {
      context.commit("flushRouteData");
    },
    setShowActionsMenu(context, payload) {
      context.commit("setShowActionsMenu", payload);
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
    setPageNumbers(context, payload) {
      context.commit("setPageNumbers", payload);
    },
    setCurrentPage(context, payload) {
      context.commit("setCurrentPage", payload);
    },
    switchHeaderBtn(context, payload) {
      context.commit("switchHeaderBtn", payload);
    },
    setFlushMessageContext(context, payload) {
      context.commit("setFlushMessageContext", payload);
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
