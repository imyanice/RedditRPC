import { Client } from 'discord-rpc';
import { BrowserWindow } from 'electron';

const PACKAGE = require('../../package.json');

// Global
declare global {
    var __mainWindow: BrowserWindow;
}

// App
export const APP = {
    name: 'RedditRPC',
    version: PACKAGE.version,
    homepage: PACKAGE.homepage,
    appId: 'me.yanjobs.redditrpc',
    settings: {
        windowWidth: 1280,
        windowHeight: 720,
        redditUrl: 'https://www.reddit.com/login/',
        discordClientID: '1012732683018842242'
    },
};

// RPC
export const RPC = new Client({
    transport: 'ipc'
});
