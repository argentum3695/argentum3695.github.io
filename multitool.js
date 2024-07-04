var searchQuery = "";
var toolsList = ['reverse', 'amino acid', 'capitalise', 'test', 'reversenumber'];
var selectedTool;
var prevSearchQuery;
searchTable = document.getElementById("search-table");


var searchField = document.getElementById("search-field");

function getSearchInput() {
    searchQuery = searchField.value;
    if (searchQuery != prevSearchQuery) {
        if (searchQuery.length > 0) {
            displaySearchResults(search());
        } else {
            clearSearchResults();
        }

        prevSearchQuery = searchQuery;
    }
    // console.log(searchQuery);
    
}

function search() {
    indexResults = [];
    for (i in toolsList) {
        if (toolsList[i].includes(searchQuery.toLowerCase())) {
            indexResults.push(i)
        }
    }

    for (i in indexResults) {
        // console.log(indexResults[i]);
    }

    return indexResults;
}


setInterval(getSearchInput, 100);

// function displaySearchResults(searchResultsArray) {
//     clearSearchResults();

//     for (i in searchResultsArray) {
//         var row = searchTable.insertRow();
//         var cell = row.insertCell();
//         cell.innerHTML = toolsList[searchResultsArray[i]];
//     }
// }

// function clearSearchResults() {
//     while (searchTable.hasChildNodes()) {
//         searchTable.removeChild(searchTable.firstChild);
//     }

// }


function displaySearchResults(searchResultsArray) {
    searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";

    for (i in searchResultsArray) {
        searchResults.innerHTML += `<div id="searchrow${i} class='searchrow'"><button id="searchresultbutton${i}" class='searchresultbutton' onclick='selectTool(${searchResultsArray[i]})'>${toolsList[searchResultsArray[i]]}</button></div>`;
    }
    
}

function clearSearchResults() {
    searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
}




function selectTool(index) {
    console.log("hi");
    console.log(toolsList[index])
}


