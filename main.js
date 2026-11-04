const {app,BrowserWindow,session,systemPreferences,ipcMain,shell}=require('electron');
const path=require('path');
function createWindow(){const w=new BrowserWindow({width:1480,height:900,minWidth:1100,minHeight:720,titleBarStyle:'hiddenInset',trafficLightPosition:{x:20,y:24},backgroundColor:'#04060b',webPreferences:{contextIsolation:true,preload:path.join(__dirname,'preload.js')}});w.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'}});w.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('file:')){e.preventDefault();shell.openExternal(url)}});w.loadFile('index.html')}
const mac=process.platform==='darwin';
ipcMain.handle('mic-status',()=>mac?systemPreferences.getMediaAccessStatus('microphone'):'granted');
ipcMain.handle('mic-ask',()=>mac?systemPreferences.askForMediaAccess('microphone'):true);
ipcMain.handle('mic-settings',()=>shell.openExternal('x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone'));
app.whenReady().then(async()=>{
  const ses=session.defaultSession;
  ses.setPermissionRequestHandler((_w,p,cb)=>cb(p==='media'));
  ses.setPermissionCheckHandler((_w,p)=>p==='media');
  if(mac){try{await systemPreferences.askForMediaAccess('microphone')}catch(e){}}
  createWindow();
  app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)createWindow()});
});
app.on('window-all-closed',()=>{if(!mac)app.quit()});
