import SpeedTest from '@cloudflare/speedtest';

export async function continuouslyRunSpeedTest() {
    if (window.location.toString() === "https://speed.cloudflare.com/") {
        if(!performanceAPIAvailable()) {
            alert("no performance API")
        } else {
            console.log("performance api ready")
        }
        
        console.log("Starting speed test")

        const test = new SpeedTest();
        (window as any).speedTest = test

        // test.onResultsChange = (c: any) => {
        //     console.log("Results Changed")
        //     console.log(c)
        // }

        
        test.onFinish = (res) => {
            console.log("test finished")
            console.log(res)
            console.log(res.getSummary())
            console.log(res.getScores())
        }

    } else {
        console.warn("Only run in google search tab for now")
    }
}

function performanceAPIAvailable() {
    return window.performance && window.performance.getEntriesByType  
}
