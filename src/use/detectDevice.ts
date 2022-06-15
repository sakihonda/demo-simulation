export const isSmartPhone = function():boolean{
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      return true;
    } else {
      return false;
    }
  }

export const isDesktop = function():boolean{
    const windowWidth = window.innerWidth
    if (windowWidth >= 1400){
      return true
    } else {
      return false
    }
  }