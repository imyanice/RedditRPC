import { APP, RPC } from './app/app';
import * as Player from './player/rpc';
import * as Window from './manager/window';
import { app, dialog } from 'electron';

// Entry
function main() {
    createMainWindow();
}

function createMainWindow() {
    // SplashWindow

    // Create MainWindow
    global.__mainWindow = Window.createWindow(
        false, {
        }
    );

    // Load URL
    __mainWindow.loadURL(APP.settings.redditUrl, { userAgent: Window.userAgent() });

    // Events
    __mainWindow.webContents.once('did-finish-load', () => {
        __mainWindow.show();

        // Initialize RPC
        initializeRPC();
    });


}

function initializeRPC() {
    RPC.login({ clientId: APP.settings.discordClientID }).then(() => {
        setTimeout(Player.registerRPC, 3000);
    }).catch(() => {
        dialog.showErrorBox("Rich Presence Login Failed", "Please, verify if your discord app is opened/working and relaunch this application.");
    });
}

// App
app.on('ready', main);
