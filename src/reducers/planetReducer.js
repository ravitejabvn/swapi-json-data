export default function planetStore(state = {}, action){

    switch(action.type) {
        case 'LOAD_PLANETS' : 
            return Object.assign({}, state, {
                planets: action.planets,
                offset : action.offsetValues[0],
                limit: action.offsetValues[1],
                planetObj : {
                    bookmarkUrl : '',
                    searchType: '',
                    searchQuery: '',
                    data: []
                }
            });

        case 'GET_PLANETS' : 
            var currentState = JSON.parse(JSON.stringify(state));
            var offset = action.offsetValues[0];
            currentState.limit = action.offsetValues[1];
            var retState = getOffsetRecords(currentState, offset);
            return retState;

        case 'QUERY_PLANETS' : 
            var curntState = JSON.parse(JSON.stringify(state));
            var queryType = action.queryType;
            var queryValue = action.queryValue;
            var retrnState = getQueryResults(curntState, queryType, queryValue);
            return retrnState;

        default:
    }

    return state;
}

function getOffsetRecords(currentState, offset){
    let planets = currentState.planets;
    var offsetVal = offset;
    var limit = offsetVal + currentState.limit;
    var data = [];
    for(var v=offsetVal; v<limit; v++){
        data.push(planets[v]);
    }
    currentState.offset = offset;
    currentState.planetObj.data = data;
    setBookmarkUrl(currentState);

    return currentState;
}

function getQueryResults(currentState, queryType, queryValue){
    var planets = currentState.planets;
    var regex = typeof queryType == 'string' ? queryValue+'\\w?' : queryValue+'\\d';

    var filterdObj = planets.filter(x => x[queryType].match(new RegExp(regex, 'g')) );
    setBookmarkUrl(currentState, queryType, queryValue);
    currentState.planetObj.data = filterdObj;
    
    return currentState;
}

function setBookmarkUrl(currentState, queryType, queryValue) {
    var offset = currentState.offset;
    var limit = currentState.limit;
    var page = (offset/limit)+1;
    var querType = queryType ? queryType : currentState.planetObj.searchType;
    var querVal = queryValue ? queryValue : currentState.planetObj.searchQuery;
    currentState.planetObj.searchType = querType
    currentState.planetObj.searchQuery = querVal
    currentState.planetObj.bookmarkUrl = '?offset='+offset+'&limit='+limit+'&searchType='+querType+'&searchValue='+querVal+'&page='+page;

    return currentState.planetObj;
}