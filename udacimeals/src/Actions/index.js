export const UPDATE_MEAL= 'UPDATE_MEAL'
export const CLEAR_MEAL= 'CLEAR_MEAL'
export const SELECT_RECIPE= 'SELECT_RECIPE'
export function updateMeal(Meal, day, meal){
    return {
        type: 'UPDATE_MEAL',
        Meal,
        day,
        meal
    }
}
export function clearMeal(day,meal){
    return {
        type: 'CLEAR_MEAL',
        day,
        meal
    }
}
export function selectRecipe(Meal)
{
    return{
        type: 'SELECT_RECIPE',
        Meal
    }
}