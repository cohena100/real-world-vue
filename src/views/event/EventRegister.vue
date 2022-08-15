<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me!</button>
</template>

<script>
export default {
  props: ["event"],
  methods: {
    register() {
      const flashMessage =
        "You are successfully registered for " + this.event.title;
      this.$store.dispatch("updateFlashMessage", flashMessage);
      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>
