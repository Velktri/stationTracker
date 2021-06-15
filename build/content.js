function readTable() 
{
    let table = document.getElementsByTagName('table')[0]//.children[1]
    //let rows = table.getElementsByTagName('tr')

    console.log('hi')
    console.log(table)
    console.log(rows)
    /*for (let i = 1; i < rows.length; i++)
    {
        if (rows[i].childNodes.length !== 0) 
        {
            let rowData = extractRowData(rows[i])
            if (waveData[rowData.stageTime] === undefined)
            {
                waveData[rowData.stageTime] = {}
            }
    
            let waveRoutes = waveData[rowData.stageTime]
    
            let found = false
            if (waveRoutes[rowData.route] !== undefined)
            {
                waveRoutes[rowData.route].carts.push(rowData.carts)
                found = true
            }
    
            if (!found)
            {
                let temp = {[rowData.route]: { loc: rowData.loc, carts: [rowData.carts] }}
                waveData[rowData.stageTime] = { ...waveData[rowData.stageTime], ...temp }
            }
        }
    }*/
}

function extractRowData(rowData)
{
    let children = rowData.children

    let cart = children[0].children[0].innerHTML
    let route = children[1].children[0].textContent
    let stageTime = children[2].children[0].innerHTML
    let loc = children[3].children[0].innerHTML
    let dwellTime = children[5].children[0].innerHTML
    let stager = children[6].children[0].innerHTML

    let status = children[4].children[0].textContent.trim()
    if (status.slice(0, 3) === "Not")
    {
        status = "Not Ready"
    }

    return { route, loc, stageTime, 'carts': { cart, status, dwellTime, stager, isAudited: false }}
}

if (window.location.hash === '#/pick')
{
    console.log("Content script for pick is loaded.")
    readTable()
}