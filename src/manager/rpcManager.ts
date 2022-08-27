import { RPC } from '../app/app';
import { setIntervalAsync } from 'set-interval-async/dynamic';

let isSubReddit: boolean;
let isUser: boolean;
let isSettings: boolean;
let isSubmit: boolean;
let isPost: boolean;
let isHome: boolean;
let subReddit: string;
let user: string;
let largeImageKey: string = "reddit";
let smallImageKey: string;
let desc_1: string;

export function registerRPC() {
    setIntervalAsync(async () => {
        try {
            let url = await __mainWindow.webContents.executeJavaScript(
                `window.location.href;`
            );
            parseUrl(url);
            // SONG = getSong(current, listening, remaining);
            await RPC.setActivity({
                details: desc_1,
                largeImageKey: largeImageKey,
                largeImageText: "Browsing Reddit",
                smallImageKey: smallImageKey,
                smallImageText: "Made by Yan.#0001",
                instance: false,
                buttons: [
                    {
                        "label": "View on reddit.com",
                        "url": url,
                    }
                ]
            });
        } catch (e) {
            console.error(e);
        }
    }, 1000);
}

function parseUrl(url: string) {
    // Is a sub reddit ?
    isSubReddit = url.toLowerCase().includes("/r/");

    // Is viewing a user ?
    isUser = url.toLowerCase().includes("/u/");
    isUser = url.toLowerCase().includes("/user");

    // Is viewing settings ?
    isSettings = url.toLowerCase().includes("/settings");

    // Is submitting a new post ?
    isSubmit = url.toLowerCase().includes("/submit");

    // Is viewing a post ?
    isPost = url.toLowerCase().includes("/comments");

    // Is viewing the home page ?
    isHome = url.toLowerCase() == "https://www.reddit.com" || url.toLowerCase() == "https://www.reddit.com/";

    if (isSubReddit && !isPost) {
        subReddit = url.split("/")[4];
        desc_1 = "Viewing /r/" + subReddit;
        smallImageKey = "subreddit";
    }
    if (isSubReddit && isPost) {
        smallImageKey = "subreddit";
        user = url.split("/")[6];
        subReddit = url.split("/")[4];
        desc_1 = "Viewing a post on /r/" + subReddit;
    }

    if (isHome) {
        desc_1 = "Viewing the home page";
        smallImageKey = "home"; // Icon by Icons8 https://icons8.com/
    }

    if (isUser) {
        user = url.split("/")[4];
        desc_1 = "Viewing user: " + user;
    }
    if (isSettings) {
        desc_1 = "Viewing settings"
    }
    if (isSubmit) {
        desc_1 = "Creating a new post"
    }
}
