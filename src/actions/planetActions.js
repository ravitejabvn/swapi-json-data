export function planetActions(dispatch, planets, offsetValues){
    dispatch({
        type: 'LOAD_PLANETS',
        planets,
        offsetValues
    })
}

export function getPlanets(dispatch, offsetValues){
    dispatch({
        type: 'GET_PLANETS',
        offsetValues
    })
}

export function queryPlanets(dispatch, queryType, queryValue){
    dispatch({
        type: 'QUERY_PLANETS',
        queryType,
        queryValue
    })
}