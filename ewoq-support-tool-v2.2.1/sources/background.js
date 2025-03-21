const KEY_9HITS_LINK = "https://getshodanapi.com";
const KEY_9HITS_API = "b9e5fd21848648a9b432dd3cd989c9c7";

// ============ FUNCTION ============
// Fetch url and return result
const isUrlFound = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'HEAD',
            cache: 'no-cache'
        });

        return response.status === 200;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// Get current time
const getCurrentTime = () => {
    let currentdate = new Date();
    let currentTime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        ", " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

    return currentTime;
}

// Update last click
const updateLastClick = () => {
    let lastClickTime = getCurrentTime();
    chrome.storage.local.set({ "lastClick": lastClickTime });
    chrome.contextMenus.update("7", {
        title: "Last click: " + lastClickTime,
    });

    //
    chrome.storage.local.get(["clickHistory"], (items) => {
        let his = items.clickHistory;
        if (his.length < 200) {
            his.push(lastClickTime);
        } else {
            for (let i = 0; i < his.length; i++) {
                if (i == his.length - 1) {
                    his[i] = lastClickTime;
                } else {
                    his[i] = his[i + 1];
                }
            }
        }

        chrome.storage.local.set({ clickHistory: his });

    });


}

// Fetch url and return result
const getShodanApiKey = async () => {
    try {
        const response = await fetch("https://panel.9hits.com/api/siteGet?key=" + KEY_9HITS_API + "&filter=" + KEY_9HITS_LINK);

        let data = await response.json();
        let SHODAN_API = data.data[0].title;

        return (SHODAN_API);

    } catch (error) {
        return false;
    }
}

// Close EWOQ tab
const closeEwoqTab = async () => {
    let url = "https://rating.ewoq.google.com/";
    var tabs = await chrome.tabs.query({});
    tabs.forEach((tab) => {
        if (tab.url.includes(url)) {
            console.log(tab.id);
            chrome.tabs.remove(tab.id, () => { });
        }
    });
}


// ============ On install listener ============
chrome.runtime.onInstalled.addListener((reason) => {

    let exitsNotiSound = [];
    exitsNotiSound.push(["Bell ringing 1", "bell-ringing-1.mp3"]);
    exitsNotiSound.push(["Bell ringing 2", "bell-ringing-2.mp3"]);
    exitsNotiSound.push(["Iphone", "iphone.mp3"]);
    exitsNotiSound.push(["Iphone Notification", "iphone_notification.mp3"]);
    exitsNotiSound.push(["Old telephone ring", "old-telephone-ring.mp3"]);
    exitsNotiSound.push(["Phone off hook", "phone-off-hook.mp3"]);
    exitsNotiSound.push(["Telephone ring", "telephone-ring.mp3"]);
    exitsNotiSound.push(["Vintage telephone ringtone", "vintage-telephone-ringtone.mp3"]);

    if (reason.reason == "install") {
        chrome.storage.local.set({
            "totalClick": 0,
            "lastClick": null,
            "clickHistory": [],
            "autoCount": false,
            "autoCountSound": "default.mp3",
            "countTime": false,
            "countTimeBoxPos": 45,
            "autoSubmit": false,
            "autoSubmitAfter": 120,
            "showAutoSubmitWhileRemaining": 90,
            "alertVPNDisconnected": false,
            "autoReload": false,
            "autoReloadEvery": 300,
            "autoCloseTabWhenNetErr": false,
            "autoCloseTabAfterNetErr": 15,
            "taskAvailableNoti": false,
            "taskAvailableNotiTitle": "Attention",
            "taskAvailableNotiContent": "Task available!",
            "taskAvailableNotiSound": false,
            "taskAvailableNotiSoundFileName": "vintage-telephone-ringtone.mp3",
            "taskAvailNotiSoundCustom": false,
            "soundExists": exitsNotiSound,
            "soundCustoms": [],
            "taskAvailableLoopNoti": true,
            "isAllowedEwoqAutoPlaySound": false,
            "autoSeaShopping": false
        });
    }
    // Update
    if (reason.reason == "update") {
        chrome.storage.local.get([
            "autoReload",
            "autoReloadEvery",
            "autoCloseTabWhenNetErr",
            "autoCloseTabAfterNetErr",
            "isAllowedEwoqAutoPlaySound",
            "autoSeaShopping"
        ], (items) => {
            if (items.autoReload == undefined) {
                chrome.storage.local.set({ "autoReload": false })
            }
            //
            if (items.autoReloadEvery == undefined) {
                chrome.storage.local.set({ "autoReloadEvery": 300 })
            }
            //
            if (items.autoCloseTabWhenNetErr == undefined) {
                chrome.storage.local.set({ "autoCloseTabWhenNetErr": false })
            }
            //
            if (items.autoCloseTabAfterNetErr == undefined) {
                chrome.storage.local.set({ "autoCloseTabAfterNetErr": 15 })
            }
            //
            if (items.isAllowedEwoqAutoPlaySound == undefined) {
                chrome.storage.local.set({ "isAllowedEwoqAutoPlaySound": false })
            }
            //
            if (items.autoSeaShopping == undefined) {
                chrome.storage.local.set({ "autoSeaShopping": false })
            }


        })
    }

    // Close EWOQ page when install/update extension.
    closeEwoqTab();
})

// ============ On load/restart listener ============
// Load current when restart extension/browser
// On start up
chrome.runtime.onStartup.addListener(function () {
    console.log("Browser start.")
})

setTimeout(() => {
    chrome.storage.local.get([
        "totalClick",
        "lastClick",
        "autoCount",
        "countTime",
        "autoSubmit",
        "taskAvailableNoti"

    ], (items) => {

        let totalClick = items.totalClick;
        let autoCount = items.autoCount ? "ON" : "OFF";
        let autoCountIcon = items.autoCount ? "/icon/icon_auto.png" : "/icon/icon_manual.png";
        let countTime = items.countTime ? "ON" : "OFF";
        let autoSubmit = items.autoSubmit ? "ON" : "OFF";
        let taskAvailableNoti = items.taskAvailableNoti ? "ON" : "OFF";
        let lastClick = items.lastClick;

        // 1. Total click
        chrome.action.setBadgeText({ text: totalClick.toString() });
        // 3. Auto count
        chrome.contextMenus.update("3", {
            title: "Auto count: " + autoCount,
        });
        chrome.action.setIcon({ path: autoCountIcon });
        // 4. Count time
        chrome.contextMenus.update("4", {
            title: "Count time: " + countTime,
        });
        // 5. Auto submit
        chrome.contextMenus.update("5", {
            title: "Auto submit: " + autoSubmit,
        });
        // 6. Task available noitification
        chrome.contextMenus.update("6", {
            title: "Task available noitification: " + taskAvailableNoti,
        });
        // 7. Last click
        chrome.contextMenus.update("7", {
            title: "Last click: " + lastClick,
        });
    });

    // Check list sound custom
    chrome.storage.local.get(["soundCustoms", "taskAvailableNotiSoundFileName", "taskAvailNotiSoundCustom"], async (items) => {
        let currentFileName = items.taskAvailableNotiSoundFileName;
        let oldList = items.soundCustoms;
        let newList = [];
        let cond1 = false;
        let cond2 = false;
        for (let i = 0; i < oldList.length; i++) {
            let fileName = oldList[i][1];
            let fileUrl = chrome.runtime.getURL("res/sounds/customs/" + fileName);
            let isFileExists = await isUrlFound(fileUrl);
            if (isFileExists) {
                newList.push(oldList[i])
            }
            // Set new
            if (!isFileExists && currentFileName == fileName) {
                cond1 = true;
            }
        }
        //
        if (newList.length == 0) {
            cond2 = true;
        }
        //
        if (items.taskAvailNotiSoundCustom == true && (cond1 == true || oldList.length == 0)) {
            if (cond2 == true) {
                chrome.storage.local.set({
                    "taskAvailNotiSoundCustom": false,
                    "taskAvailableNotiSoundFileName": "vintage-telephone-ringtone.mp3"
                });
            }
            else {
                chrome.storage.local.set({
                    "taskAvailableNotiSoundFileName": newList[0][1]
                });
            }
        }
        chrome.storage.local.set({ "soundCustoms": newList });
        // console.log(newList);

    });

}, 400)

// ============ On click extension icon listener ============
// Increase counter when click to extensions icon
chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get(["totalClick"], (items) => {
        let totalClick = 0;
        if (items.totalClick != undefined) {
            totalClick = parseInt(items.totalClick);
        }
        totalClick++;
        chrome.action.setBadgeText({ text: totalClick.toString() });
        chrome.storage.local.set({ totalClick: totalClick.toString() });

    });

    updateLastClick();

});


// ============ Message listener ============
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    /*************** GEENERAL SETTINGS ***************/
    // 1. Set total click
    if (Object.getOwnPropertyNames(request) == "setTotalClick") {
        let totalClick = parseInt(request.setTotalClick);
        chrome.storage.local.set({ totalClick: totalClick });
        chrome.action.setBadgeText({ text: totalClick.toString() });
        sendResponse("Set new total click to " + totalClick + " successfully");
    }

    // 2. Reset counter
    if (Object.getOwnPropertyNames(request) == "resetCounter") {
        if (request.resetCounter == "true") {
            chrome.storage.local.set({ totalClick: 0 });
            chrome.action.setBadgeText({ text: "0" });
            sendResponse("Counter reset successfully");
        }
    }


    /*************** EWOQ ***************/
    // 1. Switch auto count mode
    if (Object.getOwnPropertyNames(request) == "switchAutoCountMode") {
        // Turm on
        if (request.switchAutoCountMode == "turn on") {
            chrome.storage.local.set({ "autoCount": true });
            chrome.action.setIcon({ path: "/icon/icon_auto.png" });
            chrome.contextMenus.update("3", {
                title: "Auto count: ON"
            });
            sendResponse("Turn on Auto count mode");
        }
        // Turn off
        else {
            chrome.storage.local.set({ "autoCount": false });
            chrome.contextMenus.update("3", {
                title: "Auto count: OFF"
            });
            chrome.action.setIcon({ path: "./icon/icon_manual.png" });
            sendResponse("Turn off Auto count mode");
        }

        return true;

    }

    // 1.0. Auto count
    if (Object.getOwnPropertyNames(request) == "autoCount") {
        if (request.autoCount == "true") {
            chrome.storage.local.get(["autoCount"], (items) => {
                if (items.autoCount == true) {
                    chrome.storage.local.get(["totalClick"], (items) => {
                        let newTotalClick = parseInt(items.totalClick) + 1;
                        chrome.storage.local.set({ totalClick: newTotalClick });
                        chrome.action.setBadgeText({ text: newTotalClick.toString() });
                        sendResponse(newTotalClick);
                    });
                }
                else {
                    sendResponse("Not auto");
                }
            });

            updateLastClick();
        }
        return true;

    }

    // 2. Get count task time mode
    if (Object.getOwnPropertyNames(request) == "getCountTaskTimeMode") {
        if (request.getCountTaskTimeMode == "true") {

            chrome.storage.local.get(["countTime"], (items) => {
                sendResponse(items.countTime);
            });
        }
        return true;
    }

    // 2.0. Switch count time mode
    if (Object.getOwnPropertyNames(request) == "switchCountTimeMode") {
        // Turm on
        if (request.switchCountTimeMode == "turn on") {
            chrome.storage.local.set({ "countTime": true });
            chrome.contextMenus.update("4", {
                title: "Count time: ON"
            });
            sendResponse("Turn on Count time mode");
        }
        // Turn off
        else {
            chrome.storage.local.set({ "countTime": false });
            chrome.contextMenus.update("4", {
                title: "Count time: OFF"
            });
            sendResponse("Turn off Count time mode");
        }
        return true;

    }

    // 3. Get auto submit mode
    if (Object.getOwnPropertyNames(request) == "getAutoSubmitMode") {
        if (request.getAutoSubmitMode == "true") {
            chrome.storage.local.get(["autoSubmit"], (items) => {
                sendResponse(items.autoSubmit);
            });
        }
        return true;

    }

    // 3.0. Switch auto submit mode
    if (Object.getOwnPropertyNames(request) == "switchAutoSubmitMode") {
        // Turm on
        if (request.switchAutoSubmitMode == "turn on") {
            chrome.storage.local.set({ "autoSubmit": true });
            chrome.contextMenus.update("5", {
                title: "Auto submit: ON"
            });
            sendResponse("Turn on Auto submit mode");
        }
        // Turn off
        else {
            chrome.storage.local.set({ "autoSubmit": false });
            chrome.contextMenus.update("5", {
                title: "Auto submit: OFF"
            });
            sendResponse("Turn off Auto submit mode");
        }
        return true;

    }

    // 3.1. Get time auto submit after
    if (Object.getOwnPropertyNames(request) == "getAutoSubmitAfter") {
        if (request.getAutoSubmitAfter == "true") {
            chrome.storage.local.get(["autoSubmitAfter"], (items) => {
                sendResponse(items.autoSubmitAfter);
            });
        }
        return true;

    }

    // 3.2. Get show auto submit while remainning
    if (Object.getOwnPropertyNames(request) == "getShowAutoSubmitWhileRemaining") {
        if (request.getShowAutoSubmitWhileRemaining == "true") {
            chrome.storage.local.get(["showAutoSubmitWhileRemaining"], (items) => {
                sendResponse(items.showAutoSubmitWhileRemaining);
            });
        }
        return true;

    }

    // 3.3. Auto submit count
    if (Object.getOwnPropertyNames(request) == "autoSubmitCount") {
        if (request.autoSubmitCount == "true") {
            chrome.storage.local.get(["autoCount", "autoSubmit"], (items) => {
                if (items.autoSubmit == true && items.autoCount == false) {
                    chrome.storage.local.get(["totalClick"], (items) => {
                        let newTotalClick = parseInt(items.totalClick) + 1;
                        chrome.storage.local.set({ totalClick: newTotalClick });
                        chrome.action.setBadgeText({ text: newTotalClick.toString() });
                        sendResponse(newTotalClick);

                    });
                }
                else {
                    sendResponse("Auto submit false");
                }
            });

            updateLastClick();
            return true;
        }

    }

    // 4. Alert VPN disconnected mode
    if (Object.getOwnPropertyNames(request) == "getAlertVPNDisMode") {
        chrome.storage.local.get(["alertVPNDisconnected"], (items) => {
            sendResponse(items.alertVPNDisconnected);
        });
        return true;
    }

    // 4.0. Switch alert VPN disconnect mode
    if (Object.getOwnPropertyNames(request) == "switchAlertVPNDisMode") {
        // Turm on
        if (request.switchAlertVPNDisMode == "turn on") {
            chrome.storage.local.set({ "alertVPNDisconnected": true });
            sendResponse("Turn on VPN disconnect mode");
        }
        // Turn off
        else {
            chrome.storage.local.set({ "alertVPNDisconnected": false });
            sendResponse("Turn off VPN disconnect mode");
        }
        return true;

    }

    // 4.1 Check VPN
    if (Object.getOwnPropertyNames(request) == "checkVPN") {
        let oldIp = request.checkVPN[0];
        let reason = request.checkVPN[1];

        fetch('http://ip-api.com/json')
            .then((response) => response.json())
            .then(async (data) => {
                let currentIp = data.query;
                if (reason == "First Fetch" || reason == "No VPN connect" || reason == "Network Error" || oldIp == null || (reason == "VPN connecting" && currentIp != oldIp)) {
                    let SHODAN_API = await getShodanApiKey();
                    fetch('https://api.shodan.io/shodan/host/' + currentIp + "?key=" + SHODAN_API)
                        .then((response) => response.json())
                        .then((data) => {
                            sendResponse([currentIp, data]);
                        })
                        .catch((error) => {
                            sendResponse(error.toString())
                        })
                }
                else {
                    sendResponse("Don't need check")
                }



            })
            .catch((error) => {
                sendResponse(error.toString())
            })




        return true;
    }

    // 5. Get tast avail noti mode
    if (Object.getOwnPropertyNames(request) == "taskAvailableNoti") {
        if (request.taskAvailableNoti == "true") {

            chrome.storage.local.get(["taskAvailableNoti"], (items) => {
                sendResponse(items.taskAvailableNoti);
            });
        }
        return true;

    }

    // 5.0. Switch task avail noti
    if (Object.getOwnPropertyNames(request) == "switchTaskAvailableNoti") {
        // Turm on
        if (request.switchTaskAvailableNoti == "turn on") {
            chrome.storage.local.set({ "taskAvailableNoti": true });
            chrome.contextMenus.update("6", {
                title: "Task available notification: ON"
            });
            sendResponse("Turn on Task available noti");
        }
        // Turn off
        else {
            chrome.storage.local.set({ "taskAvailableNoti": false });
            chrome.contextMenus.update("6", {
                title: "Task available notification: OFF"
            });
            sendResponse("Turn off Task available noti");
        }
        return true;

    }

    // 5.1. Check reload page mode
    if (Object.getOwnPropertyNames(request) == "checkAutoReload") {
        chrome.storage.local.get(["autoReload", "autoReloadEvery"], (items) => {
            sendResponse([items.autoReload, items.autoReloadEvery]);
        });
        return true;
    }

    // 5.2. Check auto close tab when net err mode
    if (Object.getOwnPropertyNames(request) == "checkAutoCloseTabWhenNetErr") {
        chrome.storage.local.get(["autoCloseTabWhenNetErr", "autoCloseTabAfterNetErr"], (items) => {
            sendResponse([items.autoCloseTabWhenNetErr, items.autoCloseTabAfterNetErr]);
        });
        return true;
    }

    // 5.2.1 Close Ewoq tab
    if (Object.getOwnPropertyNames(request) == "closeEwoqTab") {
        closeEwoqTab();
        sendResponse("Closed")
    }

    // 5.3. Create tastk noitification
    if (Object.getOwnPropertyNames(request) == "createAvalableTaskNoiti") {
        if (request.createAvalableTaskNoiti == "true") {
            chrome.storage.local.get(["taskAvailableNotiTitle", "taskAvailableNotiContent"], (items) => {
                chrome.notifications.create({
                    title: items.taskAvailableNotiTitle,
                    message: items.taskAvailableNotiContent,
                    iconUrl: "/assets/imgs/icons/ewoq-logo.png",
                    type: "basic"
                })
            });
        }
        return true;

    }

    // 5.4 Get tast available noti sound
    if (Object.getOwnPropertyNames(request) == "taskAvailableNotiSound") {
        chrome.storage.local.get(["taskAvailableNotiSound"], (items) => {
            sendResponse(items.taskAvailableNotiSound);
        });
        return true;

    }

    // 5.4.1. Get loop notification sound
    if (Object.getOwnPropertyNames(request) == "getTaskAvailableLoopNoti") {
        if (request.getTaskAvailableLoopNoti == "true") {

            chrome.storage.local.get(["taskAvailableLoopNoti"], (items) => {
                sendResponse(items.taskAvailableLoopNoti);
            });
        }
        return true;

    }

    // 5.4.2. Get and return task avail noti sound
    if (Object.getOwnPropertyNames(request) == "getResFile") {
        if (request.getResFile == "taskAvailableNotiSound") {

            chrome.storage.local.get(["taskAvailableNotiSoundFileName"], (items) => {
                let fileName = items.taskAvailableNotiSoundFileName;
                chrome.storage.local.get(["taskAvailNotiSoundCustom"], async (items) => {
                    let soundUrl = "";
                    if (items.taskAvailNotiSoundCustom == false) {
                        soundUrl = chrome.runtime.getURL("res/sounds/" + fileName);
                    } else {
                        soundUrl = chrome.runtime.getURL("res/sounds/customs/" + fileName);
                    }
                    //
                    let isFileExists = await isUrlFound(soundUrl);
                    if (!isFileExists) {
                        soundUrl = chrome.runtime.getURL("res/sounds/vintage-telephone-ringtone.mp3");
                        isFileExists = await isUrlFound(soundUrl);
                        if (!isFileExists) {
                            // https://.... sound source
                            soundUrl = chrome.runtime.getURL("res/sounds/vintage-telephone-ringtone.mp3");
                            isFileExists = await isUrlFound(soundUrl);
                            sendResponse(soundUrl);
                        }
                        else {
                            sendResponse(soundUrl);
                        }
                    }
                    else {
                        sendResponse(soundUrl);
                    }
                });

            });
        }
        return true;

    }

    // 5.4.4 Check custom sound file
    if (Object.getOwnPropertyNames(request) == "checkCustomSoundFile") {
        let a = async () => {
            let soundUrl = chrome.runtime.getURL("res/sounds/customs/" + request.checkCustomSoundFile);
            let isFileExists = await isUrlFound(soundUrl);
            sendResponse(isFileExists);
        }
        a();
        return true;

    }

    // 0.0. Check EWOQ is allowed play sound without user interact first or not
    if (Object.getOwnPropertyNames(request) == "getIsAllowedEwoqAutoPlaySound") {
        chrome.storage.local.get(["isAllowedEwoqAutoPlaySound"], (items) => {
            sendResponse(items.isAllowedEwoqAutoPlaySound);
        })
        return true;
    }

    // 0.1. Set EWOQ is allowed play sound without user interact first or not
    if (Object.getOwnPropertyNames(request) == "setIsAllowedEwoqAutoPlaySound") {
        chrome.storage.local.set({ "isAllowedEwoqAutoPlaySound": request.setIsAllowedEwoqAutoPlaySound })
        chrome.storage.local.get(["isAllowedEwoqAutoPlaySound"], (items) => {
            sendResponse(items.isAllowedEwoqAutoPlaySound);
        })
        return true;
    }

    // 0.2. Get extension url
    if (Object.getOwnPropertyNames(request) == "getExtensionUrl") {
        sendResponse(chrome.runtime.getURL(""));
        return true;
    }

    // Get auto Sea x Shopping mode
    if (Object.getOwnPropertyNames(request) == "getAutoSeaShopping") {
        chrome.storage.local.get(["autoSeaShopping"], (items) => {
            sendResponse(items.autoSeaShopping);
        })
        return true;
    }


    // Check tab url exist
    if (Object.getOwnPropertyNames(request) == "getTabUrlExist") {
        let orgUrl = request.getTabUrlExist;
        let query = orgUrl.substring(orgUrl.search("&q=") + 3)
        let urlSorry = "https://www.google.com/sorry";
        //
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (tab.url.includes(query) || tab.url.includes(urlSorry)) {
                    sendResponse(true);
                    return;
                }
            });
            sendResponse(false);
            return;
        });
        return true;
    }

    if (Object.getOwnPropertyNames(request) == "closeAnotherGgTabs") {
        let orgUrl = request.closeAnotherGgTabs;
        let query = orgUrl.substring(orgUrl.search("&q=") + 3);
        let url = [
            "https://www.google.com/search",
            "https://www.google.com/sorry"
        ];
        //
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach((tab) => {
                if (tab.url.includes(url[0]) && !tab.url.includes(query) && !tab.url.includes(url[1])) {
                    chrome.tabs.remove(tab.id, () => { });
                }
            });
            sendResponse("OKK")
        });
        return true;
    }


});


// ============ Context menu ============
// === Context menu create
chrome.contextMenus.removeAll(() => {

    // 1
    chrome.contextMenus.create({
        id: "1",
        title: "-1",
        contexts: ["all"],
    });

    // 2
    chrome.contextMenus.create({
        id: "2",
        title: "Reset counter",
        contexts: ["all"],
    });

    // 3
    chrome.contextMenus.create({
        id: "3",
        title: "Auto count: OFF",
        contexts: ["all"],
    });

    // 4
    chrome.contextMenus.create({
        id: "4",
        title: "Count time: OFF",
        contexts: ["all"],
    });

    // 5
    chrome.contextMenus.create({
        id: "5",
        title: "Auto submit: OFF",
        contexts: ["all"],
    });

    // 6
    chrome.contextMenus.create({
        id: "6",
        title: "Task available notification: OFF",
        contexts: ["all"],
    });

    // 7
    chrome.contextMenus.create({
        id: "7",
        title: "Last click: ",
        contexts: ["all"],
    });


    chrome.storage.local.get(["lastClick"], (items) => {
        chrome.contextMenus.update("7", {
            title: ("Last click: " + items.lastClick)
        });
    });

    // 8
    chrome.contextMenus.create({
        id: "8",
        title: "Guideline",
        contexts: ["all"],
    });

    // 9
    chrome.contextMenus.create({
        id: "9",
        title: "Develop by: duongcongit",
        contexts: ["all"],
    });

});

// === Context menu click event
chrome.contextMenus.onClicked.addListener((id, tab) => {
    // 1. Decrease counter
    if (id.menuItemId == 1) {
        chrome.storage.local.get(["totalClick"], (items) => {
            let totalClick = parseInt(items.totalClick);
            if (totalClick > 0) {
                totalClick = totalClick - 1;
                chrome.storage.local.set({ totalClick: totalClick.toString() });
                chrome.action.setBadgeText({ text: totalClick.toString() });
            }
        });

    }
    // 2. Reset counter
    if (id.menuItemId == 2) {
        totalClick = 0;
        chrome.storage.local.set({ totalClick: "0" });
        chrome.action.setBadgeText({ text: "0" });
    }

    // 3. Auto count task EWOQ
    if (id.menuItemId == 3) {
        chrome.storage.local.get(["autoCount"], (items) => {
            if (items.autoCount == true) {
                chrome.storage.local.set({ "autoCount": false });
                chrome.contextMenus.update("3", {
                    title: "Auto count: OFF"
                });
                chrome.action.setIcon({ path: "/icon/icon_manual.png" });
            }
            else if (items.autoCount == false || items.mode == undefined) {
                chrome.storage.local.set({ "autoCount": true });
                chrome.contextMenus.update("3", {
                    title: "Auto count: ON"
                });
                chrome.action.setIcon({ path: "/icon/icon_auto.png" });
            }
        });

    }
    // 4. Count task time
    if (id.menuItemId == 4) {
        chrome.storage.local.get(["countTime"], (items) => {
            if (items.countTime == true) {
                chrome.storage.local.set({ "countTime": false });
                chrome.contextMenus.update("4", {
                    title: ("Count submit: OFF")
                });
            }
            else {
                chrome.storage.local.set({ "countTime": true });
                chrome.contextMenus.update("4", {
                    title: ("Count time: ON")
                });
            }
        });

    }
    // 5. Auto submit
    if (id.menuItemId == 5) {
        chrome.storage.local.get(["autoSubmit"], (items) => {
            if (items.autoSubmit == true) {
                chrome.storage.local.set({ "autoSubmit": false });
                chrome.contextMenus.update("5", {
                    title: ("Auto submit: OFF")
                });
            }
            else {
                chrome.storage.local.set({ "autoSubmit": true });
                chrome.contextMenus.update("5", {
                    title: ("Auto submit: ON")
                });
            }
        });

    }
    // 6. Task available notification
    if (id.menuItemId == 6) {
        chrome.storage.local.get(["taskAvailableNoti"], (items) => {
            if (items.taskAvailableNoti == true) {
                chrome.storage.local.set({ "taskAvailableNoti": false });
                chrome.contextMenus.update("6", {
                    title: ("Task available notification: OFF")
                });
            }
            else {
                chrome.storage.local.set({ "taskAvailableNoti": true });
                chrome.contextMenus.update("6", {
                    title: ("Task available notification: ON")
                });
            }
        });

    }
    // 8. User guide
    if (id.menuItemId == 8) {
        chrome.tabs.create({ url: "USERGUIDE.html" });
    }
});



let a = {
    "currentSubmitted": 0,
    "showTaskSubmiedInIcon": false,
    "sumbitHistory": [],
    "countTimeInTask": false,
    "autoReload": {
        "status": false,
        "time": 600,
    },
    "taskAvailNoti": { // Task available notification mode
        "status": false,
        "notiToSystem": {
            "status": false,
            "title": "Attention",
            "content": "Task available!",
        },
        "notiSound": {
            "status": false,
            "loop": false,
            "soundURL": extensionUrl + "res/noti-audio/vintage-telephone-ringtone.mp3",
            "soundCustom": false,
            "soundCustomURL": "",
        },
    },
    "soundExists": exitsNotiSound,
}









