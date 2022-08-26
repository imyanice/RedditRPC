import { Client } from 'discord-rpc';
import { BrowserWindow } from 'electron';
import ElectronStore from 'electron-store';

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
    packageUrl: 'https://raw.githubusercontent.com/Braasileiro/DeezerRPC/master/package.json',
    appId: 'me.yanjobs.redditrpc',
    settings: {
        windowWidth: 1280,
        windowHeight: 720,
        redditUrl: 'https://www.reddit.com/login/',
        discordClientID: '1012732683018842242'
    },
    preferences: {
        closeToTray: 'closeToTray',
        minimizeToTray: 'minimizeToTray',
        checkUpdates: 'checkUpdates'
    },
};

export const APP_CONFIG = new ElectronStore({
    defaults: {
        closeToTray: false,
        minimizeToTray: false,
        checkUpdates: true
    }
});

// RPC
export const RPC = new Client({
    transport: 'ipc'
});
