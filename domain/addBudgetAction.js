import Api from "../api";

export default class AddBudgetAction {
    do(budget, success, failure) {
        let monthValid, amountValid
        if (budget.month === '') {
          failure.month = 'Month cannot be empty'
          monthValid = false
        } else if (!(/^\d{4}-\d{2}$/g).test(budget.month)) {
          failure.month = 'Invalid month format'
          monthValid = false
        } else {
          failure.month = ''
          monthValid = true
        }
        if (budget.amount === '') {
          failure.amount = 'Amount cannot be empty'
          amountValid = false
        } else if (isNaN(parseInt(budget.amount, 10)) || budget.amount < 0) {
          failure.amount = 'Invalid amount'
          amountValid = false
        } else {
          failure.amount = ''
          amountValid = true
        }
        if (!monthValid || !amountValid) {
          return
        }
        let budgets = Api.getBudgets()
        let existing = budgets && budgets.find(budget => budget.month === budget.month)
        if (existing) {
          Api.updateBudget(budget)
        } else {
          Api.addBudget(budget)
        }
        success()
    }
}