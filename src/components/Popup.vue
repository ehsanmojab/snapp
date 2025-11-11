<template>
  <div class="popup-container">
    <div class="popup">
      <label for="date1">Date 1:</label>
      <input type="date" id="date1" v-model="date1" />

      <label for="date2">Date 2:</label>
      <input type="date" id="date2" v-model="date2" />

      <label for="input">Input form</label>
      <input type="text" id="input" v-model="input" />

      <div class="button-container">
        <button @click="close">Close</button>
        <button @click="enter">Enter</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date1: "",
      date2: "",
      input: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    enter() {
      this.$emit("enter", this.date1, this.date2, this.input);
    },
  },
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.popup {
  background: #282828;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

input {
  background-color: #676767;
  color: aliceblue;
  margin-right: 30px;
}
</style>
