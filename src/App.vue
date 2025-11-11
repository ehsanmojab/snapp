<script setup>
import { onMounted, ref } from "vue";
import DataTable from "./components/DataTable.vue";
import Popup from "./components/Popup.vue";

const data = ref(); //create reactive variable
const state = ref(); //button change color
const login = ref(false);
const admin = ref(false);
const user = ref(false);
const driver = ref(false);
const Username = ref("");
const Password = ref("");

const selected_fields = ref([]);

const passenger_fields = [
  { key: "passenger_id", label: "Passenger ID" },
  { key: "passenger_name", label: "Name" },
  { key: "passenger_last_name", label: "LastName" },
  { key: "age", label: "Age" },
  { key: "phone_number", label: "Phone Number" },
];
const drivers_fields = [
  { key: "driver_id", label: "Driver ID" },
  { key: "driver_name", label: "Name" },
  { key: "driver_last_name", label: "LastName" },
  { key: "birthday", label: "Birthday" },
  { key: "avg_rate", label: "Driver Rating" },
  { key: "time_spent_driving", label: "Time Spent Driving" },
];
const trips_fields = [
  { key: "trip_id", label: "Trip ID" },
  { key: "cost", label: "Cost $" },
  { key: "passenger_id", label: "Passenger ID" },
  { key: "passenger_name", label: "Passenger Name" },
  { key: "passenger_last_name", label: "Passenger LastName" },
  { key: "trip_date", label: "Date" },
  { key: "driver_id", label: "Driver ID" },
  { key: "driver_name", label: "Driver Name" },
  { key: "driver_last_name", label: "Driver LastName" },
];
const donetrips_fields = [
  { key: "trip_id", label: "Trip ID" },
  { key: "driver_name", label: "Driver Name" },
  { key: "driver_last_name", label: "Driver LastName" },
  { key: "total_distance", label: "Total Distance" },
  { key: "time_spent", label: "Total Time" },
  { key: "passenger_rate", label: "Passenger Rate" },
  { key: "payment_method", label: "Payment Method" },
  { key: "driver_id", label: "Driver ID" },
];
const discount_field = [
  { key: "trip_id", label: "Trip ID" },
  { key: "passenger_name", label: "Passenger Name" },
  { key: "passenger_last_name", label: "Passenger LastName" },
  { key: "trip_date", label: "Trip Date" },
  { key: "cost", label: "Trip Cost $" },
  { key: "discount", label: "Payed To Snapp" },
  { key: "discount_price", label: "Discount $" },
];
const mostRequest_fields = [
  { key: "passenger_id", label: "Passenger ID" },
  { key: "passenger_name", label: "Name" },
  { key: "passenger_last_name", label: "LastName" },
  { key: "count", label: "Number of Requests" },
];
const drivertrip_fields = [
  { key: "driver_id", label: "Driver ID" },
  { key: "driver_name", label: "Name" },
  { key: "driver_last_name", label: "LastName" },
  { key: "trip_id", label: "Trip ID" },
  { key: "trip_date", label: "Date" },
  { key: "cost", label: "Payed to Driver" },
];
const NotActive_drivers_fields = [
  { key: "driver_id", label: "Driver ID" },
  { key: "driver_name", label: "Name" },
  { key: "driver_last_name", label: "LastName" },
  { key: "time_spent_driving", label: "Time Spent Driving" },
  { key: "from_date", label: "Membership from" },
  { key: "to_date", label: "Membership until" },
  { key: "membership_status", label: "Membership Status" },
  { key: "credit_amount", label: "Driver Credit amount" },
];

// onMounted(() => {
//   fetch("/api/data")
//     .then(
//       (
//         res //async func
//       ) => res.json() //returns by default  async func
//     )
//     .then((res) => {
//       data.value = res;
//     });
// });

// const f = function ()
// {

// }

// function f()
// {

// }
// arrow function
const Drivers = () => {
  fetch("/api/drivers")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      data.value = res;
      selected_fields.value = drivers_fields;
      state.value = "drivers";
    });
};

const showPopup3 = ref(false);
const Passenger_choose = () => {
  showPopup3.value = true;
  state.value = "passenger";
};

const Passenger = (date1, date2, input) => {
  const SendData = ref([date1, date2, input]);
  sendDataToServer(SendData, "passenger");
  fetch("/api/passenger")
    .then(
      (
        res //async func
      ) => res.json() //returns by default async func
    )
    .then((res) => {
      data.value = res;
      selected_fields.value = passenger_fields;
      state.value = "passenger";
    });
  showPopup3.value = false;
};

const Trips = () => {
  fetch("/api/trips")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      data.value = res;
      selected_fields.value = trips_fields;
      state.value = "trips";
    });
};

const DoneTrips = () => {
  fetch("/api/donetrips")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      data.value = res;
      selected_fields.value = donetrips_fields;
      state.value = "donetrips";
    });
};

const showPopup2 = ref(false);
const Discount_to_passenger = () => {
  state.value = "discounttrip";
  showPopup2.value = true;
};

const Discount_Trip = (date1, date2, input) => {
  const SendData = ref([date1, date2, input]);
  sendDataToServer(SendData, "discounttrip");
  fetch("/api/discounttrip")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      // console.log(res);
      data.value = res;
      selected_fields.value = discount_field;
      closePopup();
    });
};

const TopRequests = () => {
  fetch("/api/mostreq")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      // console.log(res);
      data.value = res;
      selected_fields.value = mostRequest_fields;
      state.value = "mostreq";
    });
};

const Login = () => {
  if (Username.value === "admin" && Password.value === "admin") {
    login.value = true;
    admin.value = true;
    driver.value = true;
    user.value = true;
  } else if (Username.value === "user" && Username.value === "user") {
    login.value = true;
    user.value = true;
  } else if (Username.value === "driver" && Username.value === "driver") {
    login.value = true;
    driver.value = true;
  }
};
//_____________________________________________________________
const sendDataToServer = (dataToSend, api) => {
  fetch(`/api/${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server if needed
      console.log(data);
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error sending data to server:", error);
    });
};

const DriverTrips = () => {
  openPopup();
  state.value = "drivertrip";
};
//-----------------------------------------------------------

const Least_avg_drivers = () => {
  fetch("/api/avgdriver")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      data.value = res;
      selected_fields.value = drivers_fields;
      state.value = "avgdriver";
    });
};

const showPopup4 = ref(false);
const NotActive_drivers = () => {
  state.value = "notactive";
  showPopup4.value = true;
};
const NotActive_drivers_enter = (date1, date2, input) => {
  const SendData = ref([date1, date2, input]);
  sendDataToServer(SendData, "notactive");
  fetch("/api/notactive")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      // console.log(res);
      data.value = res;
      selected_fields.value = NotActive_drivers_fields;
      closePopup();
    });
};

//__________popup script for driver trips

const showPopup = ref(false);

const openPopup = () => {
  showPopup.value = true;
};
const closePopup = () => {
  showPopup.value = false;
  showPopup2.value = false;
  showPopup3.value = false;
  showPopup4.value = false;
};
const handleEnter = (date1, date2, input) => {
  const SendData = ref([date1, date2, input]);
  sendDataToServer(SendData, "drivertrip"); //sends driver name and dates to server
  fetch("/api/drivertrip")
    .then(
      (
        res //async func
      ) => res.json() //returns by default  async func
    )
    .then((res) => {
      // console.log(res);
      data.value = res;
      selected_fields.value = drivertrip_fields;
    });
  closePopup();
};

//------------------------------------------------------------
</script>

<template>
  <div v-if="!login" class="login">
    <div class="login-container">
      <div class="login-form">
        <div class="form-group">
          <span>Sign in to </span>
          <span class="snapp">Snapp Panel</span>
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="Username" id="username" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="Password" id="password" />
        </div>
        <div class="form-login">
          <button @click="Login">Login</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="login">
    <div class="button-container">
      <button
        v-if="admin"
        class="button"
        @click="Drivers"
        :class="{ active_button: state === 'drivers' }"
      >
        Drivers
      </button>
      <button
        v-if="user"
        class="button"
        @click="Passenger_choose"
        :class="{ active_button: state === 'passenger' }"
      >
        Passengers4
      </button>
      <button
        v-if="admin"
        class="button"
        @click="Trips"
        :class="{ active_button: state === 'trips' }"
      >
        Trips
      </button>
      <button
        v-if="admin"
        class="button"
        @click="DoneTrips"
        :class="{ active_button: state === 'donetrips' }"
      >
        Done Trips
      </button>
      <button
        v-if="admin"
        class="button"
        @click="Discount_to_passenger"
        :class="{ active_button: state === 'discounttrip' }"
      >
        Discount Trip2
      </button>
      <button
        v-if="admin"
        class="button"
        @click="TopRequests"
        :class="{ active_button: state === 'mostreq' }"
      >
        Most Requests3
      </button>
      <button
        v-if="driver"
        class="button"
        @click="DriverTrips"
        :class="{ active_button: state === 'drivertrip' }"
      >
        Driver Trips1
      </button>
      <button
        v-if="admin"
        class="button"
        @click="Least_avg_drivers"
        :class="{ active_button: state === 'avgdriver' }"
      >
        Least AVG Driver5
      </button>
      <button
        v-if="admin"
        class="button"
        @click="NotActive_drivers"
        :class="{ active_button: state === 'notactive' }"
      >
        NotActive Driver6
      </button>
    </div>
    <!-- @close="closePopup" @submit="submitDates" -->
    <Popup v-if="showPopup" @close="closePopup" @enter="handleEnter" />
    <Popup v-if="showPopup2" @close="closePopup" @enter="Discount_Trip" />
    <Popup v-if="showPopup3" @close="closePopup" @enter="Passenger" />
    <Popup
      v-if="showPopup4"
      @close="closePopup"
      @enter="NotActive_drivers_enter"
    />

    <DataTable :data="data" :fields="selected_fields" v-show="data" />
  </div>
</template>

<!-- <style scoped>
/* scoped is only for this vu file */
</style> -->

<style>
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.button {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.button {
  background-color: #0d9861;
  color: #f2f2f2f2;
}
.active_button {
  background-color: #3498db;
}
/* ------------------------------------------------------------- */
.login {
  margin: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  justify-content: end;
}

.login-container {
  margin: 20px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px #3e3e3e;
  background-color: #3e3e3e;
  width: 500px;
  height: 500px;
  text-align: center;
  justify-content: center;
  color: #fff;
  display: flex;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  display: flex;
  font-size: 18px;
}
.form-login {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}
.form-login button {
  border-radius: 5px;
  font-weight: bold;
  font-size: 24px;
  margin: 0;
  width: 100%;
  border: none;
  padding: 15px 10px;
  margin-top: 40px;
  background-color: #28804b;
  color: #ededed;
}

.form-group input {
  padding: 10px 42px;
  border: 0px solid #3e3e3e;
  font-size: 20px;
  border-radius: 5px;
  background-color: #676767;
  color: #ededed;
}
.snapp {
  color: #17d170;
}
.form-group span {
  font-weight: bold;
  font-size: 30px;
}
</style>
