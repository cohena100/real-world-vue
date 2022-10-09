<template>
  <h1>Events for Good</h1>
  <div class="events">
    <router-link
      class="event-link"
      :to="{ name: 'EventDetails', params: { id: event.id } }"
      v-for="event in events"
      :key="event.id"
    >
      <EventCard :event="event" />
    </router-link>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Previous</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  beforeRouteUpdate() {
    return this.$store.dispatch("fetchEvents");
  },
  computed: {
    hasNextPage() {
      const totalEvents = this.$store.state.events.length;
      var totalPages = Math.ceil(totalEvents / 2);
      return this.page < totalPages;
    },
    events() {
      const start = (this.page - 1) * 2;
      return this.$store.state.events.slice(start, start + 2);
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
