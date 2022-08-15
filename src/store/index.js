import { createStore } from "vuex";
import EventService from "@/services/EventService";

export default createStore({
  state: { user: "Avi C", events: [], event: null, flashMessage: "" },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_FLASH_MESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
        commit("SET_EVENT", event);
      });
    },
    fetchEvents({ commit }) {
      return EventService.getAllEvents().then((response) => {
        commit("SET_EVENTS", response.data);
      });
    },
    fetchEvent({ commit }, id) {
      return EventService.getEvent(id).then((response) => {
        commit("SET_EVENT", response.data);
      });
    },
    updateFlashMessage({ commit }, flashMessage) {
      commit("SET_FLASH_MESSAGE", flashMessage);
      setTimeout(() => {
        commit("SET_FLASH_MESSAGE", "");
      }, 3000);
    },
  },
  modules: {},
});
