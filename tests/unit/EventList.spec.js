import { mount, flushPromises } from "@vue/test-utils";
import EventList from "@/views/EventList";
import { createStore } from "@/store";
import router from "@/router";
import { events as mockEvents } from "../../db.json";

function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  config.props = config.props || {};
  return mount(EventList, {
    global: {
      plugins: [createStore(config.plugins.store), router],
    },
    ...config.mountOptions,
    ...config.props,
  });
}

let wrapper;

describe("EventList", () => {
  beforeEach(() => {
    wrapper = mountEventList();
  });

  it("should render the events", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  describe("page title", () => {
    it("is rendered with the correct text", () => {
      const title = wrapper.get('[data-testid="event-list-title"]');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toContain("Events for Good");
    });
  });

  // it("gets the list of events", () => {
  //   wrapper = mountEventList({
  //     plugins: {
  //       store: {
  //         state: () => ({
  //           events: mockEvents,
  //         }),
  //       },
  //     },
  //   });
  //   const events = wrapper.findAll('[data-testid="event"]');
  //   expect(events).toHaveLength(mockEvents.length);
  //   events.forEach((event, i) => {
  //     const eventText = event.text();
  //     expect(eventText).toContain(mockEvents[i].title);
  //     expect(eventText).toContain(mockEvents[i].date);
  //   });
  // });

  it("gets the list of events", async () => {
    wrapper = mount(EventList, {
      global: {
        plugins: [createStore(), router],
      },
      props: {
        page: 1,
      },
    });
    await flushPromises();
    const events = wrapper.findAll('[data-testid="event"]');
    expect(events).toHaveLength(2);
    expect(events[0].text()).toContain(mockEvents[0].title);
    expect(events[1].text()).toContain(mockEvents[1].title);
  });
});
