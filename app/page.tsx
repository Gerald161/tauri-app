"use client"

import styles from "./page.module.css";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { useEffect, useState } from "react";

export default function Home() {
  const [notificationPermissionGrantedState, setNotificationState] = useState(false);

  async function checkNotificationPermission(){
    var permissionGranted = await isPermissionGranted();

    if (!permissionGranted) {
      const permission = await requestPermission();

      permissionGranted = permission === 'granted';

      setNotificationState(true)
    }else{
      setNotificationState(true)
    }
  }

  useEffect(()=>{
    checkNotificationPermission()
  }, [])

  return (
    <main>
      <button onClick={()=>{
          console.log(notificationPermissionGrantedState)

          if(notificationPermissionGrantedState == true){
            sendNotification({ 
              title: 'TAURI', 
              body: 'Tauri is awesome!',
              sound: "Default" 
            });
          }
        }}>
          Send Notification
        </button>
        
        <button>
          System Tray Stuff
        </button>
    </main>
  );
}
