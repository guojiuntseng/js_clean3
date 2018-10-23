
export default class AddBudgetAction {
    budget = {}
    errors = {}
    do(success) {
        let monthValid, amountValid
        if (this.budget.month === '') {
          this.errors.month = 'Month cannot be empty'
          monthValid = false
        } else if (!(/^\d{4}-\d{2}$/g).test(this.budget.month)) {
          this.errors.month = 'Invalid month format'
          monthValid = false
        } else {
          this.errors.month = ''
          monthValid = true
        }
        if (this.budget.amount === '') {
          this.errors.amount = 'Amount cannot be empty'
          amountValid = false
        } else if (isNaN(parseInt(this.budget.amount, 10)) || this.budget.amount < 0) {
          this.errors.amount = 'Invalid amount'
          amountValid = false
        } else {
          this.errors.amount = ''
          amountValid = true
        }
        if (!monthValid || !amountValid) {
          return
        }
        let budgets = Api.getBudgets()
        let existing = budgets && budgets.find(budget => budget.month === this.budget.month)
        if (existing) {
          Api.updateBudget(this.budget)
        } else {
          Api.addBudget(this.budget)
        }
        success()
    }
}