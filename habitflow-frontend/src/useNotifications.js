    import { useState, useEffect } from 'react';

function useNotifications() {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  const requestPermission = () => {
    if (typeof Notification === 'undefined') return;
    Notification.requestPermission().then(setPermission);
  };

  const notify = (title, options) => {
    if (permission === 'granted') {
      new Notification(title, options);
    }
  };

  return { permission, requestPermission, notify };
}

export default useNotifications;