<template>
  <div class="config-page">
    <router-link to="/">Калькулятор</router-link>
    <div class="main-container">
      <div class="main-title">Настройки</div>
      <div class="wrapper flex column">
        <div class="input-title">Минимальная сумма займа</div>
        <input
          v-model="config.minLoan"
          type="number"
          name="min-amount"
          placeholder="Минимальная сумма займа, руб"
        />
        <div class="input-title">Максимальная сумма займа</div>
        <input
          v-model="config.maxLoan"
          type="number"
          name="min-amount"
          placeholder="Максимальная сумма займа, руб"
        />
        <div class="input-title">Минимальный срок займа</div>
        <input
          v-model="config.minMonths"
          type="number"
          name="min-amount"
          placeholder="Минимальный срок займа, мес"
        />
        <div class="input-title">Максимальный срок займа</div>
        <input
          v-model="config.maxMonths"
          type="number"
          name="min-amount"
          placeholder="Максимальный срок займа, мес"
        />
        <div class="input-title">Процентная ставка</div>
        <input
          v-model="config.percent"
          type="number"
          name="min-amount"
          placeholder="Процентная ставка ежемесячного платежа, %"
        />
      </div>
      <button class="save-button" @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigPage",
  data() {
    return {
      config: null,
    };
  },
  created() {
    this.config = { ...this.$store.state.config };
  },
  methods: {
    save() {
      this.$store.commit("setConfig", { ...this.config });
      alert("Настройки сохранены");
    },
  },
};
</script>

<style lang="scss" scoped>
.config-page {
  .input-title {
    color: #27263d;
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 10px;
  }
  input {
    width: 340px;
    height: 50px;
    border: 2px solid #ced0d4;
    border-radius: 4px;
    padding-left: 20px;
    font-size: 12px;
    color: #27263d;
    outline: none;
    &:not(:last-child) {
      margin-bottom: 40px;
    }
    &:focus {
      border-color: #5ca64f;
    }
  }
  .save-button {
    width: 340px;
    height: 60px;
    background-color: #5ca64f;
    color: white;
    font-size: 16px;
    line-height: 16px;
    border-radius: 4px;
    margin-top: 40px;
    &:hover {
      background-color: transparent;
      border: 2px solid #5ca64f;
      color: #5ca64f;
    }
    &:active {
      opacity: 0.5;
    }
  }
  @media (max-width: 1024px) {
    .input-title {
      font-size: 16px;
    }
    input {
      width: 100%;
    }
    .save-button {
      width: 100%;
    }
  }
  @media (max-width: 425px) {
    .input-title {
      font-size: 10px;
    }
    input {
      margin-bottom: 20px !important;
    }
    .save-button {
      margin-top: 10px;
      font-size: 10px;
    }
  }
}
</style>
