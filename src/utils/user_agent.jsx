const userAgent = () => window.navigator.userAgent;

export function isMobile() {
  return isIos() || isAndroid();
}

export function isIosWeb() {
  return isIosSafari() || isIosChrome();
}

export function isAndroidWeb() {
  return isAndroidChrome() || isAndroidFirefox();
}

export function isMobileApp() {
  return isMobile() && !isIosWeb() && !isAndroidWeb();
}

export function isAndroidChrome() {
  return userAgent().indexOf('Android') !== -1 && userAgent().indexOf('Chrome') !== -1 && userAgent().indexOf('Version') === -1;
}

export function isIos() {
  return userAgent().indexOf('iPhone') !== -1 || userAgent().indexOf('iPad') !== -1;
}

export function isAndroid() {
  return userAgent().indexOf('Android') !== -1;
}

export function isIosSafari() {
  return (userAgent().indexOf('iPhone') !== -1 || userAgent().indexOf('iPad') !== -1) && userAgent().indexOf('Safari') !== -1 && userAgent().indexOf('CriOS') === -1;
}


export function isIosChrome() {
  return userAgent().indexOf('CriOS') !== -1;
}


export function isAndroidFirefox() {
  return userAgent().indexOf('Android') !== -1 && userAgent().indexOf('Firefox') !== -1;
}