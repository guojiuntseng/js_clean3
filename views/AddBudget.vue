<template>
  <div>
    <h2>Add Budget</h2>
    <div class="form-item">
      <div class="label">
        <label>Month</label>
      </div>
      <div class="editor">
        <input type="text" v-model="budget.month" placeholder="Month YYYY-MM">
      </div>
      <div class="error">
        <span>{{errors.month}}</span>
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <label>Amount</label>
      </div>
      <div class="editor">
        <input type="number" v-model.number="budget.amount" placeholder="Amount">
      </div>
      <div class="error">
        <span>{{errors.amount}}</span>
      </div>
    </div>
    <div class="form-item">
      <button @click="save" class="button">Save</button>
      <button @click="cancel" class="button">Cancel</button>
    </div>
  </div>
</template>

<script>
  import Api from "../api"
  import AddBudgetPresenter from "../domain/addBudgetAction";
  
  let presenter  = new AddBudgetPresenter();

  export default {
    data() {
      return {
        budget: presenter.budget,
        errors: presenter.errors
      }
    },
    methods: {
      _goToBudgetList() {
        this.$router.push('/budgets')
      },
      save() {
        presenter.save(() => this._goToBudgetList())
      },
      cancel() {
        this._goToBudgetList()
      }
    }
  }
</script>