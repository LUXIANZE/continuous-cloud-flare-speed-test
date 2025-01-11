import { isVpnOn } from "./vpn";
import { CHROME_STORAGE_KEYS } from "./constant"
import { continuouslyRunSpeedTest } from "./speed-test";

async function main() {
    console.log("Executing main")

    // No option to disable extension by default
    await chrome.storage.local.set({
        [CHROME_STORAGE_KEYS.EXTENSION_ENABLED]: true
    })

    // hardcode vpn test url
    await chrome.storage.local.set({
        [CHROME_STORAGE_KEYS.VPN_TEST_URL]: "https://invalidasdjljwqwnlkqljlkcmalknciojwjeqdlas.com"
    })

    /**
     * Testing code
     * 
        await chrome.storage.local.set({
            [CHROME_STORAGE_KEYS.EXTENSION_ENABLED]: false
        })
        await chrome.storage.local.remove(CHROME_STORAGE_KEYS.EXTENSION_ENABLED)
     */

    await onLocalStorageChanged({}, "local")
}

async function onLocalStorageChanged(changes: {
    [key: string]: chrome.storage.StorageChange;
}, areaName: chrome.storage.AreaName) {
    console.log("Storage item changed >>:", changes)
    console.log("Area Name >>:", areaName)
    const res = await chrome.storage.local.get(CHROME_STORAGE_KEYS.EXTENSION_ENABLED)
    console.log(res)

    if (res[CHROME_STORAGE_KEYS.EXTENSION_ENABLED]) {
        try {
            const vpnOn = await isVpnOn()

            if (vpnOn) {
                alert("Please turn off VPN")
            } else {
                continuouslyRunSpeedTest()
            }
        } catch (error) {
            console.error(error)
        }
    }
}

console.log("log from content")
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        main().catch(console.error)
    }
}

// chrome.storage.onChanged.addListener(onLocalStorageChanged)