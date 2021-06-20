function readTable() 
{
    let tableData = {}
    let table = document.getElementsByTagName('table')[0].children[1]
    let rows = table.getElementsByTagName('tr')

    for (let i = 1; i < rows.length; i++)
    {
        if (rows[i].childNodes.length !== 0) 
        {
            let rowData = extractRowData(rows[i])
            console.log(rowData)
            if (tableData[rowData.stageTime] === undefined)
            {
                tableData[rowData.stageTime] = {}
            }
    
            let waveRoutes = tableData[rowData.stageTime]
    
            let found = false
            if (waveRoutes[rowData.route] !== undefined)
            {
                waveRoutes[rowData.route].carts.push(rowData.carts)
                found = true
            }
    
            if (!found)
            {
                let temp = {[rowData.route]: { loc: rowData.loc, carts: [rowData.carts] }}
                tableData[rowData.stageTime] = { ...tableData[rowData.stageTime], ...temp }
            }
        }
    }

    return tableData
}

function extractRowData(rowData)
{
    let children = rowData.children

    let stationPair = children[0].children[0].innerHTML
    let pickByTime = children[1].children[0].textContent
    let route = children[2].children[0].children[0].innerHTML
    let status = children[3].children[0].innerHTML.trim()
    let progress = children[5].children[0].innerHTML
    let duration = children[6].children[0].innerHTML

    if (status.slice(0, 3) === "Not")
    {
        status = "Not Ready"
    }

    return { stationPair, pickByTime, route, status, progress, duration }
}

function compileData()
{
    return readTable()
    //clickNextPage()
}

console.log(window.location)

if (window.location.hash === '#/pick')
{
    console.log("Content script for pick is loaded.")

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "ST_getPickData")
        {
            console.log(compileData())
            //return Promise.resolve({ data: compileData() })
        }
    })
}