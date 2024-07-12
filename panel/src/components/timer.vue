<template>
  <div class="base-timer" v-show="timerVisible">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          :stroke-dasharray="circleDasharray"
          class="base-timer__path-remaining"
          :class="remainingPathColor"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>
import { inject } from 'vue';
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 6;
const ALERT_THRESHOLD = 3;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

export default {
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
      timerVisible: false,
      time_limit: 10,
      emitter: null
    };
  },

  mounted () {
    const emitter = inject('emitter')
    emitter.on('show_timer', () => { this.timerVisible = true; this.onTimesUp(); })
    emitter.on('hide_timer', () => {this.timerVisible = false; this.onTimesUp(); })
    emitter.on('set_timer', (time) => { this.time_limit = time })
    emitter.on('start_timer', () => { this.startTimer() })
    this.emitter = emitter
  },

  computed: {
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (minutes === 0) return `${seconds}`;
      return `${minutes}:${seconds}`;
    },

    timeLeft() {
      return this.time_limit - this.timePassed;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.time_limit;
      return rawTimeFraction - (1 / this.time_limit) * (1 - rawTimeFraction);
    },

    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES;

      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    }
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
        this.emitter.emit("timer_signal")
      }
    }
  },

  methods: {
    onTimesUp() {
      clearInterval(this.timerInterval);
      this.timerInterval = null
    },

    startTimer() {
      if (this.timerInterval !== null) { return false }
      this.timePassed = 0
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    }
  }
};
</script>

<style scoped>
.base-timer {
  position: relative;
  width: 20px;
  height: 20px;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;

}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
}
</style>
