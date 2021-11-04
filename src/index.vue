<template>
  <router-link to="/config">Настройка</router-link>
  <div class="main-container">
    <div class="main-title">Калькулятор займа под ПТС</div>
    <div class="wrapper flex j-between">
      <div class="type">
        <div class="type-container flex">
          <div class="type-title">Тип платежа</div>
          <div class="type-button-container">
            <button
              class="type-button"
              :class="{ active: type === 'diff' }"
              @click="type = 'diff'"
            >
              Дифференцированный
            </button>
            <button
              class="type-button"
              :class="{ active: type === 'annual' }"
              @click="type = 'annual'"
            >
              Аннуитетный
            </button>
          </div>
        </div>

        <div class="range-container">
          <div class="output flex">
            <div class="range-title">Сумма займа</div>
            <div class="range-wrapper">
              {{ formatPrice(loan) }}
              <span class="range-color">₽</span>
            </div>
          </div>
          <Slider :min="config.minLoan" :max="config.maxLoan" v-model="loan" />
          <div class="price flex">
            <div class="from">от {{ formatPrice(config.minLoan) }} ₽</div>
            до {{ formatPrice(config.maxLoan) }} ₽
          </div>
        </div>

        <div class="range-container">
          <div class="output flex">
            <div class="range-title">Срок займа</div>
            <div class="range-wrapper">
              {{ months }}
              <span class="range-color">месяцев</span>
            </div>
          </div>
          <Slider
            :min="config.minMonths"
            :max="config.maxMonths"
            v-model="months"
          />
          <div class="price flex">
            <div class="from">от {{ config.minMonths }} месяца</div>
            до {{ config.maxMonths }} месяцев
          </div>
        </div>
        <div class="codicill">
          Условия выдачи займа могут отличаться, исходя из анализа документов и
          состояния вашего автомобиля
        </div>
      </div>

      <div class="application flex">
        <div class="application-title flex">
          <span class="span">Ставка</span>
          {{ config.percent }}%
        </div>
        <div class="application-title flex">
          <div class="span">Ежемесячный платеж</div>
          {{ formatPrice(payment.toFixed(0)) }} ₽
        </div>
        <button class="application-button" @click="submit">
          Подать заявку
        </button>
        <div class="codicill">Расчет займа предварительный</div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "@vueform/slider";

export default {
  name: "HomePage",
  components: {
    Slider,
  },
  data() {
    return {
      type: "diff",
      config: null,
      months: 8,
      loan: 138100,
    };
  },
  computed: {
    payment() {
      const money = this.loan;
      const month = this.months;
      const percent = parseFloat(this.config.percent * 0.01);

      switch (this.type) {
        case "diff":
          return money * percent;
        case "annual":
          return (
            (money * percent * Math.pow(1 + percent, month)) /
            (Math.pow(1 + percent, month) - 1)
          );
        default:
          return 0;
      }
    },
  },
  created() {
    this.config = { ...this.$store.state.config };
  },
  methods: {
    formatPrice(price) {
      const string = price.toString();
      return string.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    submit() {
      alert("Заявка успешно отправлена");
    },
  },
};
</script>
<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss">
.output {
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  color: #27263d;
  font-size: 24px;
  line-height: 24px;
  padding-bottom: 20px;
  padding-left: 20px;
}
.range-wrapper {
  color: black;
}
.range-color {
  color: #27263d;
}
.slider-handle {
  box-shadow: none;
}
.slider-tooltip {
  display: none;
}
.slider-touch-area {
  background-color: #5ca64f;
  border-radius: 100%;
}
.slider-connect {
  background-color: #5ca64f;
}
.type {
  width: 100%;
}
.type-container {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.type-title {
  color: #27263d;
  font-size: 26px;
  line-height: 26px;
}
.type-button {
  position: relative;
  width: 240px;
  color: #27263d;
  font-size: 18px;
  padding: 18px 0;
  border: 2px solid #cdcfd4;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  &:last-child {
    margin-left: -2px;
    width: 180px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  &:focus,
  .active {
    z-index: 5;
    border: 2px solid #5ca64f;
  }
}
.price {
  justify-content: space-between;
  padding-top: 16px;
  font-size: 18px;
  line-height: 18px;
  color: gray;
}
.range-container {
  margin-bottom: 40px;
}
.codicill {
  color: gray;
}
.application {
  flex-direction: column;
  justify-content: space-between;
  margin-left: 200px;
}
.application-title {
  font-weight: 500;
  font-size: 60px;
  line-height: 60px;
  color: #27263d;
  flex-direction: column;
}
.span {
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: grey;
  margin-bottom: 16px;
}
.application-button {
  width: 400px;
  height: 60px;
  background-color: #5ca64f;
  color: white;
  font-size: 16px;
  line-height: 16px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    background-color: transparent;
    border: 2px solid #5ca64f;
    color: #5ca64f;
  }
  &:active {
    opacity: 0.5;
  }
}
@media (max-width: 1440px) {
  .type-container {
    flex-wrap: wrap;
  }
  .type-title {
    font-size: 20px;
  }
  .type-button {
    width: 200px;
    font-size: 12px;
    &:last-child {
      width: 100px;
    }
  }
  .codicill {
    font-size: 12px;
  }
  .application {
    margin-left: 100px;
  }
  .application-title {
    font-size: 46px;
    line-height: 46px;
  }
  .span {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .application-button {
    width: 340px;
  }
}
@media (max-width: 1024px) {
  .type-button-container {
    margin-top: 12px;
  }
  .output {
    font-size: 16px;
    padding-left: 0;
  }
  .price {
    font-size: 12px;
  }
  .application {
    margin-left: 50px;
  }
  .application-title {
    font-size: 40px;
  }
  .span {
    font-size: 12px;
    margin-bottom: 4px;
  }
  .application-button {
    width: 300px;
  }
}
@media (max-width: 960px) {
  .wrapper {
    flex-wrap: wrap;
  }
  .type-button-container {
    margin-top: 0;
  }
  .application {
    width: 100%;
    justify-content: normal;
    margin-top: 40px;
    margin-left: 0;
  }
  .application-title {
    // align-items: center;
    font-size: 60px;
    margin-bottom: 0;
    &:first-child {
      margin-bottom: 30px;
    }
  }
  .span {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .application-button {
    margin-top: 40px;
    width: 100%;
  }
}
@media (max-width: 768px) {
  .type-button {
    width: 150px;
    font-size: 10px;
    border-radius: 4px;
    border: 1px solid #cdcfd4;
    &:last-child {
      width: 150px;
      border-radius: 4px;
      margin-top: 10px;
    }
  }
  .application-title {
    font-size: 46px;
  }
  .span {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
@media (max-width: 425px) {
  .type-title {
    font-size: 16px;
  }
  .type-button-container {
    margin-top: 10px;
  }
}
@media (max-width: 375px) {
  .type-container {
    margin-bottom: 30px;
  }
  .output {
    font-size: 12px;
  }
  .range-container {
    margin-bottom: 30px;
  }
  .price {
    font-size: 10px;
  }
  .codicill {
    font-size: 10px;
  }
  .application {
    margin-top: 30px;
  }
  .application-title {
    font-size: 26px;
    margin-bottom: 0;
    &:first-child {
      margin-bottom: 10px;
    }
  }
  .span {
    font-size: 12px;
    margin-bottom: 0;
  }
  .application-button {
    font-size: 12px;
    margin-top: 20px;
  }
}
</style>
