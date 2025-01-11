import { CHROME_STORAGE_KEYS } from "./constant";

export async function isVpnOn() {
    console.log("Checking VPN")
    const storageRes = await chrome.storage.local.get(CHROME_STORAGE_KEYS.VPN_TEST_URL)
    console.log(storageRes)

    if(storageRes[CHROME_STORAGE_KEYS.VPN_TEST_URL]) {
        try {
            const res = await fetch(storageRes[CHROME_STORAGE_KEYS.VPN_TEST_URL]);
            // not 200-299
            return (res.status >= 200 || res.status <= 299)
        } catch {
            return false;
        }
    } else {
        throw new Error("VPN test url not provided!")
    }

}