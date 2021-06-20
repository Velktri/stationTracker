function getTableData(tab)
{
    browser.tabs.sendMessage(tab.id, { command: "ST_getPickData" }).then(response => {
        console.log(response.data)
        //storeCartData(response.data)
    })
}

function handleBrowserActionClick() {
    /* Create station command tab */
    browser.tabs.query({
        url: ["*://logistics.amazon.com/station/dashboard/pick",
              "https://velktri.github.io/sallyOps-/testing/*"
        ]
    }).then(tabs => {

        if (tabs.length === 0)
        {
            browser.tabs.create({ url: 'https://logistics.amazon.com/station/dashboard/pick' }) //https://velktri.github.io/sallyOps-/testing/new-routes.html' })
        }
        else
        {
            getTableData(tabs[0])
        }
    })

    /* Create sally dashboard tab */
    /*browser.storage.local.get('SO_UI').then(res => {
        if (res.SO_UI === undefined || res.SO_UI === browser.tabs.TAB_ID_NONE)
        {
            browser.tabs.create({ url: 'build/index.html' }).then((tab) => {
                browser.storage.local.set({ SO_UI: tab.id })
            })
        }
        else
        {
            browser.storage.local.get("SO_UI").then((res2) => {
                browser.tabs.update(res2.SO_UI, { active: true })
            })
        }
    })*/
}

browser.browserAction.onClicked.addListener(handleBrowserActionClick)