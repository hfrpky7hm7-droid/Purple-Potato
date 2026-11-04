const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('pp',{micStatus:()=>ipcRenderer.invoke('mic-status'),askMic:()=>ipcRenderer.invoke('mic-ask'),openMicSettings:()=>ipcRenderer.invoke('mic-settings')});
