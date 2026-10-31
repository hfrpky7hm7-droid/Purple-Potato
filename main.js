const {app,BrowserWindow,session,systemPreferences}=require('electron');
function createWindow(){const w=new BrowserWindow({width:1480,height:900,minWidth:1100,minHeight:720,titleBarStyle:'hiddenInset',trafficLightPosition:{x:20,y:24},backgroundColor:'#04060b',webPreferences:{contextIsolation:true}});w.loadFile('index.html')}
app.whenReady().then(()=>{
  session.defaultSession.setPermissionRequestHandler((_w,p,cb)=>cb(p==='media'));
  if(process.platform==='darwin')systemPreferences.askForMediaAccess('microphone');
  createWindow();
  app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)createWindow()});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
