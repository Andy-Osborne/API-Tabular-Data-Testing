const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}

function getTableHeaders(obj) {
    const tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    const tableRows = [];
    const el = document.getElementById("data");

    getData(type, function(data) {
        data = data.results;
        const tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            const dataRow = [];
            Object.keys(item).forEach(function(key) {
                const rowData = item[key].toString();
                const truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`)
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}